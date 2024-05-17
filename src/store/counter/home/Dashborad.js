import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    let navigate = useNavigate()
    return (
        <>
            <h1>Dashborad</h1>
            <button onClick={() => {
                localStorage.clear()
                navigate('/login')
            }}> Logout </button>
        </>
    )
}