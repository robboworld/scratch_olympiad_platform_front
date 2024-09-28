import { Response, Settings } from "@/__generated__/graphql";
import { SET_ACTIVATION_BY_LINK } from "@/graphql/mutations";
import { GET_SETTINGS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Switch, notification } from "antd";
import { QueryOptions } from 'apollo-client';

function SettingsModule() {
    const [form] = Form.useForm();
    const getSettings = useQuery<{ GetSettings: Settings }>(
        GET_SETTINGS,
        {
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );
    const [setActivationByLink, { loading }] = useMutation<{ ConfirmActivation: Response }, { activationByLink: boolean }>(
        SET_ACTIVATION_BY_LINK,
        {
            onError: error => {
                notification.error({
                    message: 'Error',
                    description: error?.message,
                })
            },
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Link activation was changed.',
                })
            },
            refetchQueries: [{
                query: GET_SETTINGS,
            } as QueryOptions<object>]
        }
    );
    return (
        <Form form={form}>
            <Form.Item name='active' label={'Code activation'}>
                <Switch
                    checked={getSettings.data?.GetSettings.activationByLink}
                    loading={loading}
                    onChange={(value: boolean) =>
                        setActivationByLink({
                            variables: {
                                activationByLink: value
                            },
                        })
                    }
                />
            </Form.Item>
        </Form>
    );
}

export default SettingsModule;