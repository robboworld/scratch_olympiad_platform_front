import { List, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";

import ListItem from "@/components/ListItem";
import { EventHttp, EventHttpList } from "@/__generated__/graphql";
import { WithPaginationProps } from "@/hocs";
import { useMutation } from "@apollo/client";
import { GET_ALL_APPLICATIONS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";

const { Text, Title } = Typography;

type EventsListProps = WithPaginationProps & {
    loading: boolean;
    data?: EventHttpList;
    removal: boolean;
}

function EventsList({
    onChangePage,
    page,
    pageSize,
    loading,
    data,
    removal,
}: EventsListProps) {

    const eventLabel = (event: EventHttp) => {
        return (
            <>
                <Title level={5}>Application ID:</Title>{event.id}
                <Title level={5}>Author ID:</Title>{event.name}
            </>
        )
    }
    return (
        <List
            className='events'
            loading={loading}
            bordered
            size='large'
            dataSource={data?.events}
            pagination={{
                onChange: onChangePage,
                total: data?.countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
            }}
            itemLayout='vertical'
            renderItem={(event, index) => (
                <ListItem
                    index={index}
                    renderLabel={() => eventLabel(event)}
                    handleClick={() => (console.log())}
                    handleDelete={() => (console.log())}
                />
            )}
        />
    );
}

export default EventsList;