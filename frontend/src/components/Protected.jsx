import { useNavigate } from "react-router-dom"
import Layout from "./Layout"

export default ({ children }) => {
    const navigate = useNavigate()
    let userExistInLocal = localStorage.getItem("user")

    if (!userExistInLocal) navigate('/signin')

    return <Layout>
        {children}
    </Layout>
}