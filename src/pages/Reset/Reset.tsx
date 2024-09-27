import { SignInResponse } from "@/__generated__/graphql";
import { RESET_PASSWORD } from "@/graphql/mutations";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation } from "@apollo/client";
import { Spin, notification } from "antd";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const resetLink = query.get('resetLink');

    const [resetPassword, { loading }] = useMutation<{ ResetPassword: SignInResponse }, { resetLink: string }>(
        RESET_PASSWORD,
        {
            onError: (error) => {
                handlingGraphqlErrors(error);
            },
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Password Reset',
                });
                navigate('/login');
            }
        }
    );

    useEffect(() => {
        if (resetLink) {
            resetPassword({
                variables: {
                    resetLink: resetLink
                }
            });
        } else {
            notification.error({
                message: 'Error',
                description: 'Invalid or missing reset link.',
            });
            navigate('/login');
        }
    }, [resetLink, resetPassword, navigate]);

    return (
        <>
            {loading && <Spin size={'large'} />}
        </>
    );
}

export default ResetPage;