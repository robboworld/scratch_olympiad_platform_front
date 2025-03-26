import { List, Typography, notification, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

import ListItem from "@/components/ListItem";
import { EventHttp, EventHttpList } from "@/__generated__/graphql";
import { WithPaginationProps } from "@/hocs";
import { useMutation } from "@apollo/client";
import { GET_ALL_APPLICATIONS } from "@/graphql/query";
import { handlingGraphqlErrors } from "@/utils";
import styles from './EventList.module.scss';
import logo from '@/assets/ScratchOlympiad-2024_logo_1440x643.png';
import EventCard from "@/components/EventCard/EventCard";

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
    
    return (
        <List
            loading={loading}
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 3,
                lg: 3,
                xl: 4,
                xxl: 4,
            }}
            dataSource={data?.events}
            pagination={{
                onChange: onChangePage,
                total: data?.countRows,
                current: +page,
                defaultCurrent: 1,
                defaultPageSize: pageSize,
                responsive: true,
                position: "bottom"
            }}
            renderItem={(event) => (
                <List.Item>
                    <EventCard event={event} />
                </List.Item>
            )}
        />
    );
}

export default EventsList;