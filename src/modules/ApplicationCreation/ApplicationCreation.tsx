
import { Button, Form, Input, notification, Select, Upload, Typography } from 'antd';
import { useMutation, useQuery } from '@apollo/client'
import { GET_NOMINATIONS } from '@/graphql/query';
import { CREATE_APPLICATION } from '@/graphql/mutations';
import { handlingGraphqlErrors } from '@/utils';
import { ApplicationCreationFormInputs } from './ApplicationCreationForm.types';
import { NewApplication } from '@/__generated__/graphql';
import { useState } from 'react';
import UploadModule from '../Upload';
import { APPLICATIONS_PAGE_ROUTE } from '@/consts';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

function ApplicationCreationModule() {
    const [form] = Form.useForm();
    const { data } = useQuery(GET_NOMINATIONS);
    const navigate = useNavigate();

    const [selectedType, setSelectedType] = useState<string | null>(null);

    const ScratchNominations = ['ScratchKid, 7-8 year old', 'ScratchChild, 9-10 year old','ScratchTween, 11-12 year old',
        'ScratchTeen, 13-14 year old','ScratchYouth, 15-18 year old','ScratchMaster, 18 and older',
    ];
    const RobboScratchNominations = ['RobboChild, 7-10 year old', 'RobboTeen, 11-14 year old', 'RobboYouth, 15-18 year old', 'RobboMaster, 18 and older'];

    const [createApplication, { loading }] = useMutation<{ CreateApplication: Response }, { input: NewApplication }>(
        CREATE_APPLICATION,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Application created successfully.',
                });
                navigate(APPLICATIONS_PAGE_ROUTE);
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
                    <Select placeholder="Please choose a discipline" size="middle" onChange={handleTypeChange}>
                        <Option value="Scratch">Scratch</Option>
                        <Option value="RobboScratch">RobboScratch</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="nomination" rules={[{ required: true, message: 'Please select your nomination!' }]}>
                    <Select placeholder="Please choose your nomination" size="middle" loading={!data} disabled={!selectedType}>
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
                        <Title level={4}>Algorithmic task</Title>
                        <Title level={5}>Enter the link to your Algorithmic task project</Title>
                        <Form.Item
                            name='algorithmicTaskLink'
                        >
                            <Input
                                placeholder='Enter the link to your Algorithmic task project'
                                size='middle'
                            />
                        </Form.Item>
                        <Title level={5}>or upload your Algorithmic task project sb3 file</Title>
                        <Form.Item
                            name='algorithmicTaskFile'
                        >
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'algorithmicTaskFile')} fileType="task" />
                        </Form.Item>
                        <Title level={4}>Creative task</Title>
                        <Title level={5}>Enter the link to your Creative task project</Title>
                        <Form.Item
                            name='creativeTaskLink'
                        >
                            <Input
                                placeholder='Enter the link to your Creative task project'
                                size='middle'
                            />
                        </Form.Item>
                        <Title level={5}>or upload your Creative task project sb3 file</Title>
                        <Form.Item
                            name='creativeTaskFile'
                        >
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'creativeTaskFile')} fileType="task" />
                        </Form.Item>
                    </>
                )}

                {selectedType === 'RobboScratch' && (
                    <>
                        <Title level={4}>Algorithmic task</Title>
                        <Title level={5}>Enter the link to your Algorithmic task project</Title>
                        <Form.Item
                            name='algorithmicTaskLink'
                        >
                            <Input
                                placeholder='Algorithmic ask Link'
                                size='middle'
                            />
                        </Form.Item>
                        <Title level={5}>or upload your Algorithmic task project sb3 file</Title>
                        <Form.Item
                            name='algorithmicTaskFile'
                        >
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'algorithmicTaskFile')} fileType="task" />
                        </Form.Item>
                        <Title level={4}>Engineering task</Title>
                        <Title level={5}>Enter the link to your Engineering task project</Title>
                        <Form.Item
                            name='engineeringTaskCloudLink'
                        >
                            <Input
                                placeholder='Enter the link to your Engineering task project'
                                size='middle'
                            />
                        </Form.Item>
                        <Title level={5}>or upload your Engineering task project sb3 file</Title>
                        <Form.Item
                            name='engineeringTaskFile'
                        >
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'engineeringTaskFile')} fileType="task" />
                        </Form.Item>
                        <Title level={5}>Enter the link to your Engineering task project video</Title>
                        <Form.Item
                            name='engineeringTaskVideoCloudLink'
                        >
                            <Input
                                placeholder='Enter the link to your Engineering task project video'
                                size='middle'
                            />
                        </Form.Item>
                        <Title level={5}>or upload your Engineering task project video</Title>
                        <Form.Item
                            name='engineeringTaskVideo'
                        >
                            <UploadModule onUploadSuccess={(url) => handleUploadSuccess(url, 'engineeringTaskVideo')} fileType="video" />
                        </Form.Item>
                    </>
                )}
                <Form.Item name='note'>
                    <Input.TextArea
                        size='large'
                        rows={4}
                        placeholder='Notes, if necessary'
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