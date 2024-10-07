import { useNavigate } from 'react-router-dom';

import { ApplicationHttp, ApplicationHttpList } from "@/__generated__/graphql";
import ApplicationsList from "@/components/ApplicationsList";
import { GET_ALL_APPLICATIONS } from "@/graphql/query";
import { withPaginationUrl } from "@/hocs";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Button, notification } from "antd";
import { QueryOptions } from "apollo-client";

function ApplicationsModule() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/application/new');
    };

    const { loading, data } = useQuery<{ GetAllApplications: ApplicationHttpList }, { page?: number, pageSize?: number }>(
        GET_ALL_APPLICATIONS,
        {
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );

    const ApplicationList = withPaginationUrl(ApplicationsList, 10);

    return (
        <>
            <Button
                onClick={handleClick}
                type='primary'
                style={{ marginBottom: '0.5rem' }}
            >
                {'New Application'}
            </Button>
            <ApplicationList
                data={data?.GetAllApplications}
                loading={loading}
                removal
            />
        </>
    );
}

export default ApplicationsModule;