import { Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import { handlingGraphqlErrors } from '@/utils';


// File size limit (100MB in bytes)
const MAX_FILE_SIZE = 100 * 1024 * 1024;

interface UploadModuleProps {
    onUploadSuccess: (fileUrl: string) => void;
    fileType: 'task' | 'video';
}

function UploadModule({ onUploadSuccess, fileType }: UploadModuleProps) {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const token = localStorage.getItem('access_token');

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const beforeUpload = (file: RcFile) => {
        const isSb3 = file.name.endsWith('.sb3');
        const isMp4 = file.type === 'video/mp4';

        if (file.size > MAX_FILE_SIZE) {
            message.error('File size must be less than 100MB!');
            return Upload.LIST_IGNORE;
        }

        if (fileType === 'task' && !isSb3) {
            message.error('You can only upload SB3 files for task!');
            return Upload.LIST_IGNORE;
        } else if (fileType === 'video' && !isMp4) {
            message.error('You can only upload MP4 files for video!');
            return Upload.LIST_IGNORE;
        }

        return true;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            const response = info.file.response;
            if (response && response.file_link) {
                setFileName(info.file.name);
                onUploadSuccess(response.file_link);
            } else {
                message.error('Failed to get file URL from the response');
            }
        }
        if (info.file.status === 'error') {
            setLoading(false);
            message.error('File upload failed due to a token being expired. Please refresh the page and try again.');
        }
    };

    return (
        <>
            <Upload
                name="file"
                showUploadList={false}
                action="http://localhost:8080/solution/"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                headers={{
                    Authorization: `Bearer ${token}`,
                }}
            >
                {fileName ? (
                    <div style={{ width: '100%' }}>{fileName}</div>
                ) : (
                    uploadButton
                )}
            </Upload>
        </>
    );
}

export default UploadModule;