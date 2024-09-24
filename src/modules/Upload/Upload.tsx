import { Upload, UploadProps, message } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

function UploadModule() {
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string>();

    const token = localStorage.getItem('access_token');

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const getBase64 = (file: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(file);
    };

    const beforeUpload = (file: RcFile) => {
        const isMp4 = file.type === 'video/mp4';

        if (!isMp4) {
            message.error('You can only upload MP4 files!');
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
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setVideoUrl(url);
            });
        }
    };

    return (
        <>
            <Upload
                name="file"
                listType="picture-circle"
                className="video-uploader"
                showUploadList={false}
                action="http://localhost:8080/solution/" 
                beforeUpload={beforeUpload}
                onChange={handleChange}
                headers={{
                    Authorization: `Bearer ${token}`, 
                }}
            >
                {videoUrl ? <video src={videoUrl} controls style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    );
}

export default UploadModule;