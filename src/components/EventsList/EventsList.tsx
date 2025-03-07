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
                    <Button type="link" onClick={() => console.log('View details')}>
                        Details
                    </Button>,
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
                            {/* Add other fields here */}
                        </>
                    }
                />
            </Card>
        )
    }
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
                    {eventLabel(event)}
                </List.Item>
            )}
        />
    );
}

export default EventsList;