import { useNavigate } from 'react-router-dom';
import { EventHttp, EventHttpList, EventDetailsHttp } from "@/__generated__/graphql";
import EventsList from "@/components/EventsList";
import { GET_ALL_EVENTS, GET_EVENT_BY_ID } from "@/graphql/query";
import { withPaginationUrl } from "@/hocs";
import { handlingGraphqlErrors } from "@/utils";
import { useMutation, useQuery } from "@apollo/client";
import { Button, notification } from "antd";
import { QueryOptions } from "apollo-client";
import { useAppSelector } from '@/store';  
import { Role } from '@/__generated__/graphql';
import CreateEventModal from "@/components/CreateEventModal";
import { useState } from 'react';

function EventsModule() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const { userRole } = useAppSelector(state => state.authReducer);

    const { loading, data, refetch } = useQuery<{ GetAllEvents: EventHttpList }, { page?: number, pageSize?: number }>(
        GET_ALL_EVENTS,
        {
            onError: (error) => {
                handlingGraphqlErrors(error)
            },
        }
    );

    const handleCreateSuccess = () => {
        setModalVisible(false);
        refetch();
    };

    const EventList = withPaginationUrl(EventsList, 8);

    return (
        <>
            {userRole === 'SuperAdmin' && (
                <Button
                    onClick={() => setModalVisible(true)}
                    type='primary'
                    style={{ marginBottom: '0.5rem' }}
                >
                    {'New event'}
                </Button>
            )}

            <CreateEventModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSuccess={handleCreateSuccess}
                refetchQueries={[{
                    query: GET_ALL_EVENTS
                }]}
            />

            <EventList
                data={data?.GetAllEvents}
                loading={loading}
                removal
            />
        </>
    );
}

export default EventsModule;