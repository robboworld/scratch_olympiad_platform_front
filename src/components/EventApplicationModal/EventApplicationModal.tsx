import { Button, Modal, notification, Typography } from 'antd';
import { GET_EVENT_BY_ID } from '@/graphql/query';
import { useQuery } from '@apollo/client';
import { EventDetailsHttp } from '@/__generated__/graphql';
import { handlingGraphqlErrors } from '@/utils';

const { Text } = Typography;

interface EventApplicationModalProps {
    visible: boolean;
    onCancel: () => void;
    eventId: string;
}

function EventApplicationModal({ 
    visible,
    onCancel,
    eventId
}: EventApplicationModalProps) {
    
    const { data, loading, error } = useQuery<{ GetEventById: EventDetailsHttp }>(
        GET_EVENT_BY_ID,
        {
          variables: { id: eventId},
          onError: handlingGraphqlErrors,
        }
    );

    const eventDetailsContent = () => {
        if (loading) return <Text type="secondary">Loading description...</Text>;
        if (error) return <Text type="danger">Error loading description</Text>;
        return <>
                <Text strong>Title:</Text> {data?.GetEventById.name}
                <br />
                <Text strong>Description:</Text> {data?.GetEventById.description}
                <br />
                <Text strong>Starts:</Text> {data?.GetEventById.startDate}
                <br />
                <Text strong>Ends:</Text> {data?.GetEventById.endDate}
            </>;
    };

    return (
        <Modal
            title="Event details"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button type="primary" onClick={()=>console.log('Apply')}>
                    Apply
                </Button>
            ]}
        >
        <>
            <Text strong>Event ID:</Text> {eventId}<br />
            {eventDetailsContent()}
        </>
        </Modal>
    );
}

export default EventApplicationModal;