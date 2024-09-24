import { useMutation } from '@apollo/client';
import { ForgotPasswordInputs } from './ForgotPassword.types';
import { Response } from '@/__generated__/graphql';
import { FORGOT_PASSWORD } from '@/graphql/mutations';
import { Button, Form, Input, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';

function ForgotPasswordModal() {
    const [form] = Form.useForm();

    const [forgotPassword, { loading }] = useMutation<{ ForgotPassword: Response }, { email: string }>(
    FORGOT_PASSWORD,
    {
        onCompleted: () => {
            notification.success({
                message: 'Email Sent',
                description: 'Instructions to reset your password have been sent to your email.',
            });
        },
        onError: (error) => {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        },
    });

    const onFinish = (inputs: ForgotPasswordInputs) => {
        forgotPassword({
            variables: {
                email: inputs.email,
            },
        });
    };
    const [, forceUpdate] = useState({});
    useEffect(() => {
        forceUpdate({});
    }, []);

    return (
        <Form
            onFinish={onFinish}
            form={form}
        >
            <Typography.Text>
                Instructions to reset your password will be sent to the entered email.
            </Typography.Text>
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please, enter your email',
                    },
                    {
                        type: 'email',
                        message: 'The input is not a valid email',
                    },
                ]}
            >
                <Input
                    placeholder='Email'
                    size='middle'
                />
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
                            Send
                        </Button>
                    )
                }
            </Form.Item>
        </Form>
    );
}

export default ForgotPasswordModal;