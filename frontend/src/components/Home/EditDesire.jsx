import { Modal, Form, Input, Button, message } from "antd"
import { editDesireApi } from "../../apis"
import { useEffect, useState } from "react";

export default ({
    setIsEditModalOpen,
    onSuccess,
    desireObj,
    isModalOpen = false,
}) => {
    const [desire, setDesire] = useState(null);
    useEffect(() => {
        console.log("editDesit", desireObj)
        if (desireObj) {
            setDesire(desireObj.desire)
        }
    }, [desireObj])
    const [messageApi, contextHolder] = message.useMessage()
    const handleEdit = async () => {
        await editDesireApi(desireObj.id, desire)
        messageApi.open({
            type: "success",
            content: "Edit Successfully!"
        })
        await onSuccess()
        setIsEditModalOpen(false)
    }
    //commit
    const handleCancel = () => {
        setIsEditModalOpen(false)
    }
    return <Modal okText="Edit Desire" title="Edit Desire" open={isModalOpen} onOk={handleEdit} onCancel={handleCancel}>
        {contextHolder}
        <Input value={desire} onChange={(e) => setDesire(e.target.value)} />
    </Modal>
}