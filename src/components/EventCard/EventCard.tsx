import { useQuery } from '@apollo/client';
import { Card, Button, Typography, Skeleton } from 'antd';
import { handlingGraphqlErrors } from '@/utils';
import { EventHttp, EventDetailsHttp } from '@/__generated__/graphql';
import { GET_EVENT_BY_ID } from '@/graphql/query';
import { UPDATE_EVENT } from '@/graphql/mutations';
import logo from '@/assets/ScratchOlympiad-2024_logo_1440x643.png';
import { useAppSelector } from '@/store';
import { useState } from 'react';
import UpdateEventModal from '../UpdateEventModal';
import { GET_ALL_EVENTS } from "@/graphql/query";

const { Text } = Typography;

interface EventCardProps {
  event: EventHttp;
}

function EventCard({ event }: EventCardProps) {

    const { userRole } = useAppSelector(state => state.authReducer);
    const [modalVisible, setModalVisible] = useState(false);

  const { data, loading, error, refetch } = useQuery<{ GetEventById: EventDetailsHttp }>(
    GET_EVENT_BY_ID,
    {
      variables: { id: event.id },
      onError: handlingGraphqlErrors,
    }
  );

  const descriptionContent = () => {
    if (loading) return <Text type="secondary">Loading description...</Text>;
    if (error) return <Text type="danger">Error loading description</Text>;
    return <>{data?.GetEventById.description}</>;
  };

  const handleUpdateSuccess = () => {
    setModalVisible(false);
    refetch();
    };

  return (
    <>
    <Card
      hoverable
      cover={
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ 
            flex: 1,
            display: 'grid',
            placeItems: 'center',
            height: '8rem',
            overflow: 'hidden'
          }}>
            <img
              alt="Logo"
              src={logo}
              style={{ 
                maxWidth: '90%',
                maxHeight: '100%',
                objectFit: 'scale-down',
                aspectRatio: '3/2'
              }}
            />
          </div>
          <div style={{
            display: 'grid',
            placeItems: 'center',
            height: '5rem',
            overflow: 'hidden'
          }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Russia.png"
              style={{
                maxWidth: '30%',
                maxHeight: '100%',
                objectFit: 'scale-down',
              }}
            />
          </div>
        </div>
      }
      actions={[
        <div>
            {userRole === 'SuperAdmin' && (
                <Button
                    type="link"
                    onClick={() => setModalVisible(true)}
                >
                    {'Edit'}
                </Button>
            )}
        </div>,
        <Button danger type="link" onClick={() => console.log('Delete')}>
          Delete
        </Button>,
      ]}
    >
      <Card.Meta
        title={event.name}
        description={
          <>
            <Text strong>Event ID:</Text> {event.id}<br />
            <Text strong>Description:</Text> {descriptionContent()}
          </>
        }
      />
    </Card>

    <UpdateEventModal
                eventId={event.id}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSuccess={handleUpdateSuccess}
                refetchQueries={[{
                    query: GET_ALL_EVENTS
                }]}
            />
    </>
  );
}

export default EventCard;