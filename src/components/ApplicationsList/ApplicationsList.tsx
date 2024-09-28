import { List, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import ListItem from "@/components/ListItem";
import { ApplicationHttp, ApplicationHttpList } from "@/__generated__/graphql";
import { WithPaginationProps } from "@/hocs";
import { useMutation } from "@apollo/client";
import { GET_ALL_APPLICATIONS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";

type ApplicationsListProps = WithPaginationProps & {
    loading: boolean;
    data?: ApplicationHttpList;
    removal: boolean;
}

function ApplicationsList({
    onChangePage,
    page,
    pageSize,
    loading,
    data,
    removal,
}: ApplicationsListProps) {
    const applicationLabel = (application: ApplicationHttp) => {
        return (
            <>
                {application.nomination}
            </>
        )
    }
    return (
        <List
            className='applications'
            loading={loading}
            bordered
            size='large'
            dataSource={data?.applications}
            pagination={{
                onChange: onChangePage,
                total: data?.countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(application, index) => (
                <ListItem
                    index={index}
                    renderLabel={() => applicationLabel(application)}
                    handleClick={() => (console.log())}
                    handleDelete={() => (console.log())}
                />
            )}
        />
    );
}

export default ApplicationsList;