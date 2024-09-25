
import { Button, Form, Input, notification, Select, Upload, Typography } from 'antd';
import { useMutation, useQuery } from '@apollo/client'
import { GET_NOMINATIONS } from '@/graphql/query';
import { CREATE_APPLICATION } from '@/graphql/mutations';
import { handlingGraphqlErrors } from '@/utils';
import { ApplicationCreationFormInputs } from './ApplicationCreationForm.types';
import { NewApplication } from '@/__generated__/graphql';
import { useState } from 'react';
import UploadModule from '../Upload';

const { Option } = Select;
const { Title } = Typography;

function ApplicationCreationModule() {
    const [form] = Form.useForm();
    const { data } = useQuery(GET_NOMINATIONS);

    const [selectedType, setSelectedType] = useState<string | null>(null);

    const ScratchNominations = ['ScratchKid', 'ScratchChild','ScratchTween',
        'ScratchTeen','ScratchYouth','ScratchMaster',
    ];
    const RobboScratchNominations = ['RobboChild', 'RobboTeen', 'RobboYouth', 'RobboMaster'];

    const [createApplication, { loading }] = useMutation<{ CreateApplication: Response }, { input: NewApplication }>(
        CREATE_APPLICATION,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Application created successfully.',
                })
            },
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );
    const onFinish = (inputs: ApplicationCreationFormInputs) => {
        createApplication({
            variables: {
                input: {
                    nomination: inputs.nomination,
                    note: inputs.note,
                    algorithmicTaskFile: inputs.algorithmicTaskFile,
                    algorithmicTaskLink: inputs.algorithmicTaskLink,
                    engineeringTaskFile: inputs.engineeringTaskFile,
                    engineeringTaskCloudLink: inputs.engineeringTaskCloudLink,
                    creativeTaskFile: inputs.creativeTaskFile,
                    creativeTaskLink: inputs.creativeTaskLink,
                    engineeringTaskVideo: inputs.engineeringTaskVideo,
                    engineeringTaskVideoCloudLink: inputs.engineeringTaskVideoCloudLink,
                }
            }
        })
    };

    const handleTypeChange = (value: string) => {
        setSelectedType(value);

        form.setFieldsValue({ nomination: undefined });
    };

    const filteredNominations = data?.GetAllNominations?.nominations.filter(
        (nomination: { name: string }) =>
            selectedType === 'Scratch'
                ? ScratchNominations.includes(nomination.name)
                : selectedType === 'RobboScratch'
                ? RobboScratchNominations.includes(nomination.name)
                : false
    );

    const isNominationInvalid = () => {
        const nominationField = form.getFieldInstance('nomination');
        const errors = form.getFieldsError().find(({ name }) => name.includes('nomination'));
        return !!(errors && errors.errors.length);
    };

    const isFormValid = () => {
        const fieldsTouched = form.getFieldsValue();
        return form.isFieldsTouched(['nomination']) && !isNominationInvalid() && !!fieldsTouched.nomination;
    };

    const handleUploadSuccess = (fileUrl: string, fileType: string) => {
        switch (fileType) {
            case 'algorithmicTaskFile':
                form.setFieldsValue({ algorithmicTaskFile: fileUrl });
                break;
            case 'creativeTaskFile':
                form.setFieldsValue({ creativeTaskFile: fileUrl });
                break;
            case 'engineeringTaskFile':
                form.setFieldsValue({ engineeringTaskFile: fileUrl });
                break;
            case 'engineeringTaskVideo':
                form.setFieldsValue({ engineeringTaskVideo: fileUrl });
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Form onFinish={onFinish} form={form}>
                <Form.Item name="applicationType" rules={[{ required: true, message: 'Please select an application type!' }]}>
                    <Select placeholder="Select application type" size="middle" onChange={handleTypeChange}>
                        <Option value="Scratch">Scratch</Option>
                        <Option value="RobboScratch">RobboScratch</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="nomination" rules={[{ required: true, message: 'Please select your nomination!' }]}>
                    <Select placeholder="Select your nomination" size="middle" loading={!data} disabled={!selectedType}>
                        {filteredNominations?.length ? (
                            filteredNominations.map((nomination: { name: string }) => (
                                <Option key={nomination.name} value={nomination.name}>
                                    {nomination.name}
                                </Option>
                            ))
                        ) : (
                            <Option disabled>No nominations available</Option>
                        )}
                    </Select>
                </Form.Item>
                {selectedType === 'Scratch' && (
                    <>
                        <Form.Item
                            name='algorithmicTaskLink'
                        >
                            <Input
                                placeholder='Algorithmic Task Link'
                                size='middle'
                            />
                        </Form.Item>
                        <Form.Item
                            name='algorithmicTaskFile'
                        >
                            <Title level={4}>Upload Algorithmic Task File</Title>
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'algorithmicTaskFile')} fileType="task" />
                        </Form.Item>
                        <Form.Item
                            name='creativeTaskLink'
                        >
                            <Input
                                placeholder='Creative Task Link'
                                size='middle'
                            />
                        </Form.Item>
                        <Form.Item
                            name='creativeTaskFile'
                        >
                            <Title level={4}>Upload Creative Task File</Title>
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'creativeTaskFile')} fileType="task" />
                        </Form.Item>
                    </>
                )}

                {selectedType === 'RobboScratch' && (
                    <>
                        <Form.Item
                            name='engineeringTaskCloudLink'
                        >
                            <Input
                                placeholder='Engineering Task Link'
                                size='middle'
                            />
                        </Form.Item>
                        <Form.Item
                            name='engineeringTaskFile'
                        >
                            <Title level={4}>Upload Engineering Task File</Title>
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'engineeringTaskFile')} fileType="task" />
                        </Form.Item>
                        <Form.Item
                            name='engineeringTaskVideoCloudLink'
                        >
                            <Input
                                placeholder='Engineering Task Video Link'
                                size='middle'
                            />
                        </Form.Item>
                        <Form.Item
                            name='engineeringTaskVideo'
                        >
                            <Title level={4}>Upload Engineering Task Video File</Title>
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'engineeringTaskVideo')} fileType="video" />
                        </Form.Item>
                    </>
                )}
                <Form.Item name='note'>
                    <Input.TextArea
                        size='large'
                        rows={4}
                        placeholder='Notes'
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            disabled={!isFormValid()}
                        >
                            Apply
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </>
    );
}

export default ApplicationCreationModule;