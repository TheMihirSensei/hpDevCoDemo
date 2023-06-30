import { useEffect, useState } from "react"
import { deleteDesireApi, getAllDesireApi } from "../apis";
import { message, Table, Button, Space } from "antd";
import "./Home.css"
import AddDesire from "../components/Home/AddDesire";
import EditDesire from "../components/Home/EditDesire";

export default () => {
    const [desires, setDesires] = useState([]);
    const [messageApi, contextHolder] = message.useMessage()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [desireEditObj, setDesireEditObj] = useState(null);


    const getDesires = async () => {
        try {
            const { data: desireResponse } = await getAllDesireApi()
            setDesires(desireResponse.data)
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: err?.response?.data?.message || 'Something went wrong please try again later',
            });
        }
    }
    const handleDelete = async (deleteIndex) => {
        try {
            await deleteDesireApi(deleteIndex)
            await getDesires()
            messageApi.open({
                type: "success",
                content: "Deleted Successfully!"
            })
        } catch (err) {
            messageApi.open({
                type: "error",
                content: err?.response?.data?.message || 'Something went wrong please try again later',

            })
        }
    }
    const handleEdit = async (desireObj) => {
        setDesireEditObj(desireObj)
        setIsEditModalOpen(true)
    }
    useEffect(() => {
        getDesires()
    }, [])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'desire',
            dataIndex: 'desire',
            key: 'desire',
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => <Space size="middle">
                <a onClick={() => handleEdit(record)}>Edit</a>
                <a onClick={() => handleDelete(record.id)}>Delete</a>
            </Space>
        }
    ];


    return <div>
        {contextHolder}
        <Button className="desire-add-button" onClick={() => setIsAddModalOpen(true)} >Add</Button>
        <AddDesire onSuccess={getDesires} isModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        {desires && <Table dataSource={desires} columns={columns} />}
        <EditDesire onSuccess={getDesires} desireObj={desireEditObj} isModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
    </div>
}