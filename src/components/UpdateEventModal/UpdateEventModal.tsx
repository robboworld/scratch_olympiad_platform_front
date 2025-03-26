import { Button, Form, Input, DatePicker, Modal, notification } from 'antd';
import { useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { UpdateEventModalFormInputs } from './UpdateEventModal.types';
import { UpdateEvent, Role, EventDetailsHttp } from '@/__generated__/graphql';
import { UPDATE_EVENT, CREATE_EVENT_TRANSLATION } from '@/graphql/mutations';
import { handlingGraphqlErrors } from '@/utils';
import { useState } from 'react';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface UpdateEventModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    refetchQueries: any[];
    eventId: string;
}

function UpdateEventModal({ 
    visible,
    onCancel,
    onSuccess,
    refetchQueries,
    eventId
}: UpdateEventModalProps) {
    const [actionType, setActionType] = useState<'update' | 'translation'>('update');
    const [form] = Form.useForm<UpdateEventModalFormInputs>();

    const [updateEvent, { loading: updateLoading }] = useMutation<{ updateEvent: EventDetailsHttp }, { input: UpdateEvent }>(
        UPDATE_EVENT,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Event updated successfully.',
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

    const [createTranslation, { loading: translationLoading }] = useMutation(
        CREATE_EVENT_TRANSLATION,
        {
            onCompleted: () => {
                notification.success({
                    message: 'Success!',
                    description: 'Translation created successfully.',
                });
                form.resetFields();
                onSuccess();
            },
            onError: handlingGraphqlErrors,
            refetchQueries: refetchQueries
        }
    );

    const onFinish = (inputs: UpdateEventModalFormInputs) => {

        const baseData = {
            name: inputs.name,
            description: inputs.description,
        };
    
        if (actionType === 'update') {
            updateEvent({
                variables: {
                    input: {
                        id: eventId,
                        startDate: dayjs(inputs.startDate).format('YYYY-MM-DD'),
                        endDate: dayjs(inputs.endDate).format('YYYY-MM-DD'),
                        ...baseData
                    }
                }
            });
        } else {
            createTranslation({
                variables: {
                    input: {
                        eventId: eventId,
                        ...baseData
                    }
                }
            });
        }
    };

    return (
        <Modal
            title="Update Event"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button 
                key="update" 
                type="primary" 
                loading={updateLoading}
                onClick={() => {
                    setActionType('update');
                    form.submit();
                }}
                >
                    Update
                </Button>,
                <Button 
                key="translation"
                type="default"
                loading={translationLoading}
                onClick={() => {
                    setActionType('translation');
                    form.submit();
                }}
                >
                    New Translation
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

export default UpdateEventModal;