
import { Button, Form, Input, notification, Select } from 'antd';
import { useMutation, useQuery } from '@apollo/client'
import { GET_NOMINATIONS } from '@/graphql/query';
import { CREATE_APPLICATION } from '@/graphql/mutations';
import { handlingGraphqlErrors } from '@/utils';
import { ApplicationCreationFormInputs } from './ApplicationCreationForm.types';
import { NewApplication } from '@/__generated__/graphql';

const { Option } = Select;

function ApplicationCreationModule() {
    const [form] = Form.useForm();
    const { data } = useQuery(GET_NOMINATIONS);

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
                }
            }
        })
    };

    return (
        <>
            New Application
            <Form
            onFinish={onFinish}
            form={form}
            >
                <Form.Item
                    name="nomination"
                    rules={[{ required: true, message: 'Please select your nomination!' }]}
>
                    <Select placeholder="Select your nomination" size="middle" loading={!data}>
                        {data?.GetAllNominations?.nominations?.length ? (
                            data.GetAllNominations.nominations.map((nomination: { name: string }) => (
                                <Option key={nomination.name} value={nomination.name}>
                                    {nomination.name}
                                </Option>
                            ))
                        ) : (
                        <Option disabled>No nominations available</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item shouldUpdate>
                {
                    () => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            loading={loading}
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Apply
                        </Button>
                        )
                    }
                </Form.Item>
            </Form>
        </>

    );
}

export default ApplicationCreationModule;