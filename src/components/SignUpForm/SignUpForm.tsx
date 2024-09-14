import { Button, Form, Input, Checkbox, notification, Select, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
    ;
import { SignUpFormInputs } from './SignUpForm.types';

import { Response, SignUp } from '@/__generated__/graphql';
import { SIGN_UP } from '@/graphql/mutations';
import { GET_COUNTRIES } from '@/graphql/query';
import { handlingGraphqlErrors } from '@/utils';

import moment from 'moment'; // For formating of the date if needed
const { Option } = Select;

function SignUpForm() {
    const [form] = Form.useForm();

    const { data } = useQuery(GET_COUNTRIES);

    const [signUp, { loading }] = useMutation<{ SignIn: Response }, { input: SignUp }>(
        SIGN_UP,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Account activation instruction was sent to your email.',
                })
            },
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );
    const onFinish = (inputs: SignUpFormInputs) => {
        const formattedBirthDate = inputs.birthdate
            ? moment(inputs.birthdate).format('YYYY-MM-DD')
            : '';

        signUp({
            variables: {
                input: {
                    email: inputs.email,
                    password: inputs.password,
                    fullName: inputs.fullName,
                    fullNameNative: inputs.fullNameNative,
                    city: inputs.city,
                    country: inputs.country,
                    birthdate: formattedBirthDate,
                }
            }
        })
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
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your email!',
                    },
                ]}
            >
                <Input
                    placeholder='Email'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your password!',
                    },
                    {
                        min: 8,
                        message: 'Password needs to be at least 8 characters long!',
                    },
                ]}
            >
                <Input.Password
                    placeholder='Password'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='password_repeat'
                rules={[
                    {
                        required: true,
                        message: 'Please repeat your password',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords need to be the same!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder='Repeat password'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='fullName'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your full name in english!',
                    },
                ]}
            >
                <Input
                    placeholder='Full name in english'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='fullNameNative'
                rules={[
                    {
                        required: true,
                        message: 'Please enter your full name in your native language!',
                    },
                ]}
            >
                <Input
                    placeholder='Full name in your native language'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name='city'
                rules={[
                    {
                        required: true,
                        message: 'Please enter the name of the city!',
                    },
                ]}
            >
                <Input
                    placeholder='City'
                    size='middle'
                />
            </Form.Item>
            <Form.Item
                name="country"
                rules={[{ required: true, message: 'Please select your country!' }]}
            >
                <Select 
                    placeholder="Select your country"
                    size="middle"
                >
                    <Option value="United States">United States</Option>
                    <Option value="Canada">Canada</Option>
                    <Option value="United Kingdom">United Kingdom</Option>
                    <Option value="Australia">Australia</Option>
                    {data?.countries.map((country: { name: string }) => (
                        <Option key={country.name} value={country.name}>
                            {country.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="birthdate"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
            >
                <DatePicker
                    placeholder="Date of birth"
                    format="YYYY-MM-DD"
                    size="middle"
                />
            </Form.Item>
            <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Please read the terms of the user agreement!')),
                    },
                ]}
            >
                <Checkbox>
                    I have read the terms of <a href="">the user agreement</a>
                </Checkbox>
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
                            Sign Up
                        </Button>
                    )
                }

            </Form.Item>
        </Form>
    );
}

export default SignUpForm;