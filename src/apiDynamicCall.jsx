// import { useParams } from "react-router-dom"
// import { useState, useEffect } from 'react'

// const Userdetail = () => {
//     const [data, setData] = useState()
//     const { userId } = useParams()
//     useEffect(() => {
//         if (userId) {
//             getdata()
//         }
//     }, [userId])
//     const getdata = async () => {
//         let apidata = await fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`)
//         let res = await apidata.json()
           
//         setData(res)
            
//         // console.log(data);
//     } 

//     return (
//         <>

//             {/* {console.log(data)} */}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Id</th>
//                         <th>UserId</th>
//                         <th>Title</th>
//                         <th>Body</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data && data?.map((user, idx) => {
//                         return (
//                             <tr key={idx}>
//                                 <td>{user?.id}</td>
//                                 <td>{user?.userId}</td>
//                                 <td>{user?.title}</td>
//                                 <td>{user?.body}</td>
                                
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>
//         </>  
//     )
// }

// export default Userdetail