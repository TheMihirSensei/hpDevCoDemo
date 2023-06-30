import { Modal, Form, Input, Button, message } from "antd"
import { addDesireApi } from "../../apis"
import { useState } from "react";

export default ({
    setIsAddModalOpen,
    onSuccess,
    isModalOpen = false,
}) => {
    const [desire, setDesire] = useState('');
    const [messageApi, contextHolder] = message.useMessage()

    const handleAdd = async () => {
        await addDesireApi(desire)
        messageApi.open({
            type: "success",
            content: "Added Successfully!"
        })
        console.log("onSuccess", onSuccess)
        setIsAddModalOpen(false)
        await onSuccess()
    }
    const handleCancel = () => {
        setIsAddModalOpen(false)
    }

    return <Modal okText="Add Desire" title="ADD Desire" open={isModalOpen} onOk={handleAdd} onCancel={handleCancel}>
        {contextHolder}
        <Form>
            <Form.Item name="desire">
                <Input value={desire} onChange={(e) => setDesire(e.target.value)} />
            </Form.Item>
        </Form>
    </Modal>
}