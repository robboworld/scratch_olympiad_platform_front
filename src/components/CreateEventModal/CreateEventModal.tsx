import { Button, Form, Input, DatePicker, Modal, notification } from 'antd';
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { CreateEventModalFormInputs } from './CreateEventModal.types';
import { NewEvent, Role, EventDetailsHttp } from '@/__generated__/graphql';
import { CREATE_EVENT } from '@/graphql/mutations';
import { handlingGraphqlErrors } from '@/utils';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface CreateEventModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    refetchQueries: any[];
}

function CreateEventModal({ 
    visible,
    onCancel,
    onSuccess,
    refetchQueries 
}: CreateEventModalProps) {
    const [form] = Form.useForm<CreateEventModalFormInputs>();
    const [createEvent, { loading }] = useMutation<{ createEvent: EventDetailsHttp }, { input: NewEvent }>(
        CREATE_EVENT,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Event created successfully.',
                });
                form.resetFields();
                onSuccess();
            },
            onError: (error) => {
                handlingGraphqlErrors(error);
            },
            refetchQueries: refetchQueries
        }
    );

    const onFinish = (inputs: CreateEventModalFormInputs) => {
        const formattedEndDate = inputs.endDate
        ? dayjs(inputs.endDate).format('YYYY-MM-DD')
        : '';

        const formattedStartDate = inputs.startDate
        ? dayjs(inputs.startDate).format('YYYY-MM-DD')
        : '';

        createEvent({
            variables: {
                input: {
                    name: inputs.name,
                    description: inputs.description,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                }
            }
        });
    };

    return (
        <Modal
            title="Create New Event"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    loading={loading}
                    onClick={() => form.submit()}
                >
                    Create
                </Button>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Event Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the event name!' }]}
                >
                    <Input placeholder="Enter event name" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the event description!' }]}
                >
                    <TextArea rows={4} placeholder="Enter event description" />
                </Form.Item>

                <Form.Item
                    label="Event Dates"
                    rules={[{ 
                        required: true, 
                        message: 'Please select the event dates!',
                    }]}
                >
                    <Form.Item
                        name="startDate"
                        rules={[{ required: true }]}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="endDate"
                        rules={[{ required: true }]}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <RangePicker
                        showTime
                        format="YYYY-MM-DD"
                        disabledDate={(current) => current && current < dayjs().endOf('day')}
                        onChange={(dates) => {
                            if (dates && dates[0] && dates[1]) {
                                form.setFieldsValue({
                                    startDate: dates[0].toISOString(),
                                    endDate: dates[1].toISOString()
                                });
                            }
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateEventModal;