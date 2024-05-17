import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'

const User = () => {
    const [data, setData] = useState()

    useEffect(() => {
        getdata()
    }, [])

    const getdata = async () => {
        let apidata = await fetch('https://jsonplaceholder.typicode.com/posts')
        let res = await apidata.json()
        if (res) {
            setData(res)
        }
    }

    console.log(data);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>userId</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody>

                    {data?.map((user, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{user?.id}</td>
                                <td>{user?.userId}</td>
                                <td>{user?.title}</td>
                                <td>{user?.body}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default User

