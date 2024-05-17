

import { useState,useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
// import Tabledata from "./tabledisplay";
// import loader from "./assets/images/loader1.gif"

const FunctionComp = () => {
    const[loader, setLoader] = useState(false)
    const[data, setData ] = useState()
    // const[formData, setFormData ] = useState({
    //         "userId": "",
    //         "title": "",
    //         "body": ""
    //     })
    // const[erformData, seterFormData ] = useState({
            // "userId": "",
            // "title": "",
            // "body": ""
        // })
    
    const formik  = useFormik({
        initialValues : {
            "userId": "",
            "title": "",
            "body": ""
        },
        validate: (values) => {
            let error = {}
            if(!values.userId){
                error.userId = 'Please Enter UserId'
            }
            if(!values.title){
                error.title = 'Please Enter title'
            }
            if(!values.body){
                error.body = 'Please Enter body'
            }
            return error
        },
        onSubmit: async(values) => {
            
        }
    })    

    useEffect(() => {
        getdata()
    }, [])
    
   
    
    const getdata = async() => {
        setLoader(true)
        let apidata = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setLoader(false)
        if(apidata?.data){
            setData(apidata?.data)
        }
    }
    
    const handleDelete = async(id) =>{
        let res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:'DELETE'
        })
        if(res){
            let uidx = data.findIndex((u) => u.id === id)
            if(uidx > -1){
                data.splice(uidx, 1)
                console.log(data);
                setData([...data])  
            }
        }
    }

   
    return(
        <> 
            
            <form method="post" onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="userId" placeholder="Enter userID" value={formik.values.userId} onChange={formik.handleChange} /> <br />
                    {formik.errors.userId && <p className='er'>{formik.errors.userId}</p>} <br />    
                </div>
                <div>
                    <input type="text" name="title" placeholder="Enter title" value={formik.values.title} onChange={formik.handleChange} /> <br />
                    {formik.errors.title && <p className='er'>{formik.errors.title}</p>} <br />     
                </div>
                <div>
                    <input type="text" name="body" placeholder="Enter body" value={formik.values.body} onChange={formik.handleChange} /> <br />
                    {formik.errors.body && <p className='er'>{formik.errors.body}</p>} <br /> 
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
                            <tr key ={idx}>
                                <td>{user?.id}</td>
                                <td>{user?.userId}</td>
                                <td>{user?.title}</td>
                                <td>{user?.body}</td>
                                <td>
                                    <button onClick={() => handleDelete(user?.id)}>Delete</button>
                                    {/* <button onClick={() => handleEdit(user?.id)}>Edit</button> */}
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