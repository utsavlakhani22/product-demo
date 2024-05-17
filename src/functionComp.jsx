import { useState, useEffect } from "react";
// import Tabledata from "./tabledisplay";
// import loader from "./assets/images/loader1.gif"

const FunctionComp = () => {
    const [loader, setLoader] = useState(false)
    const [state, setState] = useState(0)
    const [data, setData] = useState()
    const [formData, setFormData] = useState({
        "userId": "",
        "title": "",
        "body": ""
    })
    const [erformData, seterFormData] = useState({
        "userId": "",
        "title": "",
        "body": ""
    })

    useEffect(() => {
        getdata()
    }, [])

    const handleplus = () => {
        setState(state + 1)
    }
    const handleminus = () => {
        setState(state > 0 ? state - 1 : state)
    }

    const getdata = async () => {
        setLoader(true)
        let apidata = await fetch('https://jsonplaceholder.typicode.com/posts')
        let res = await apidata.json()
        setLoader(false)
        if (res) {
            // console.log(res);
            setData(res)
        }
    }

    const handlechange = (e) => {
        let obj = formData
        obj[e.target.name] = e.target.value
        setFormData({ ...obj })
    }

    const handleDelete = async (id) => {
        let apidata = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
        let res = await apidata.json()
        if (res) {
            // console.log(data);
            let uidx = data.findIndex((u) => u.id === id)
            if (uidx > -1) {
                data.splice(uidx, 1)
                console.log(data);
                setData([...data])
            }
        }
    }



    const handleEdit = async (id) => {
        let apidata = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        let res = await apidata.json()
        console.log(res);
        if (res) {
            setFormData({ ...res })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData);

        const newErr = erformData
        let isSuccess = true

        if (!formData?.userId) {
            newErr.userId = 'please enter userId'
            isSuccess = false
        } else {
            newErr.userId = ''
            isSuccess = true
        }
        if (!formData?.title) {
            newErr.title = 'please enter title'
            isSuccess = false
        } else {
            newErr.title = ''
            isSuccess = true
        }
        if (!formData?.body) {
            newErr.body = 'please enter body'
            isSuccess = false
        } else {
            newErr.body = ''
            isSuccess = true
        }
        seterFormData({ ...newErr })

        if (isSuccess) {
            let newdata = data
            // console.log(newdata);
            if (formData?.id) {
                let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${formData.id}`, {
                    method: 'put',
                    body: JSON.stringify(formData)
                })
                let res = await response.json()
                if (res) {
                    let uidx = newdata?.findIndex((user) => user?.id === formData?.id)
                    if (uidx > -1) {
                        newdata[uidx] = formData
                    }
                }
            } else {
                let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'post',
                    body: JSON.stringify(formData)
                })
                let res = await response.json()
                if (res) {
                    let obj = formData
                    obj.id = newdata.length + 1
                    newdata.push(obj)
                    console.log(newdata);
                }
            }
            setData([...newdata])
            setFormData({
                "userId": "",
                "title": "",
                "body": ""
            })
        }
    }

    // const a = 10

    return (
        <>
            <div className="btn">
                <button onClick={handleminus}>Minus (-)</button>
                <h1>{state} </h1>
                <button onClick={handleplus}>Plus (+)</button>
            </div>
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="userId" placeholder="Enter userID" value={formData?.userId} onChange={handlechange} /> <br />
                    {erformData?.userId && <p className='er'>{erformData?.userId}</p>} <br />
                </div>
                <div>
                    <input type="text" name="title" placeholder="Enter title" value={formData?.title} onChange={handlechange} /> <br />
                    {erformData?.title && <p className='er'>{erformData?.title}</p>} <br />
                </div>
                <div>
                    <input type="text" name="body" placeholder="Enter body" value={formData?.body} onChange={handlechange} /> <br />
                    {erformData?.body && <p className='er'>{erformData?.body}</p>} <br />
                </div>
                <button type="submit">Submit</button>
            </form>

            {/* <Tabledata data = {data} edit = {handleEdit} delete = {handleDelete} loader={loader} /> */}

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>UserId</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {loader ? <img src={require("./assets/images/loader1.gif")} alt="" /> :
                        data ? data.map((user, idx) => {
                            return (
                                <tr key={idx}>
                                    <td>{user?.id}</td>
                                    <td>{user?.userId}</td>
                                    <td>{user?.title}</td>
                                    <td>{user?.body}</td>
                                    <td>
                                        <button onClick={() => handleDelete(user?.id)}>Delete</button>
                                        <button onClick={() => handleEdit(user?.id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }) : <td colSpan={4}>No Data found</td>}
                </tbody>
            </table>
        </>
    )
}
export default FunctionComp