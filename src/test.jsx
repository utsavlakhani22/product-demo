import React from 'react';
import loading from './assets/images/loader1.gif'

class Test extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            state1: [],
            status : false,
            formdata : {
                "name": "",
                "username": "",
                "email": "",
                "address": {
                  "street": "",
                  "suite": "",
                  "city": "",
                  "zipcode": "",
                  "geo": {
                    "lat": "",
                    "lng": ""
                  }
                },
                "phone": "",
                "website": "",
                "company": {
                  "name": "",
                  "catchPhrase": "",
                  "bs": ""
                }
              },
            errFormdata : {
                "name": "",
                "username": "",
                "email": "",
                "address": {
                  "street": "",
                  "suite": "",
                  "city": "",
                  "zipcode": "",
                  "geo": {
                    "lat": "",
                    "lng": ""
                  }
                },
                "phone": "",
                "website": "",
                "company": {
                  "name": "",
                  "catchPhrase": "",
                  "bs": ""
                }
              }
        }
    }

    componentDidMount() {
        this.getdata()
    }
    getdata = async () => {
        this.setState({
            loading: true
        })
        let response = await fetch('https://jsonplaceholder.typicode.com/users')
        let data = await response.json()

        if(data &&  data?.length > 0){
            this.setState({
               state1: data,
               loading: false
            })
        } else{
            this.setState({
                loading: false,
                state1: []
            })
        }
    }
    handleDelete = async (id) => {
        let apidata = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'delete'
        })
        let res = await apidata.json()
        console.log(res);
        if(res){
            let uidx = this.state.state1?.findIndex((u) => u.id === id)
            let newdata =this.state.state1.splice(uidx, 1)
            this.setState({
                res : newdata
            })
        }
    }
    handlesort = async (d) => {
        console.log(d.target.value);
        let newstate = this.state.state1
        newstate.sort((a, b) => {
            if(d.target.value === "Asc"){
                return a.id - b.id
            } else {
                return b.id - a.id
            }
        })
        console.log(newstate);
        this.setState({
            state1: newstate  
        })
    }           
    handlechange = (e) => {
        let obj = this.state.formdata
        let newobj = this.state.formdata.address
        let newobj1 = this.state.formdata.address.geo
        let newobjcmp = this.state.formdata.company
        obj[e.target.name] = e.target.value
        newobj[e.target.name] = e.target.value
        newobj1[e.target.name] = e.target.value
        newobjcmp[e.target.name] = e.target.value
        // console.log(this.state.formdata, obj);  
        this.setState({
            formdata : obj,newobj,newobj1,newobjcmp
        })
    }
    handlesubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.formdata);

        const { formdata , errFormdata } =  this.state
        const newErr = errFormdata

        let isSuccess = true
    
        if(!formdata?.name){
            newErr.name = 'please enter name'
            isSuccess = false
        } else{
            newErr.name = ''
            isSuccess = true
        }
        if(!formdata?.username){
            newErr.username = 'please enter UserId'
            isSuccess = false
        } else{
            newErr.username = ''
            isSuccess = true
        }
        if(!formdata?.email){
            newErr.email = 'please enter email'
            isSuccess = false
        } else{
            newErr.email = ''
            isSuccess = true
        }
        if(!formdata?.address.street){
            newErr.address.street = 'please enter sreete'
            isSuccess = false
        } else{
            newErr.address.street = ''
            isSuccess = true
        }
        if(!formdata?.address.suite){
            newErr.address.suite = 'please enter suite'
            isSuccess = false
        } else{
            newErr.address.suite = ''
            isSuccess = true
        }
        if(!formdata?.address.city){
            newErr.address.city = 'please enter city'
            isSuccess = false
        } else{
            newErr.address.city = ''
            isSuccess = true
        }
        if(!formdata?.address.zipcode){
            newErr.address.zipcode = 'please enter zipcode'
            isSuccess = false
        } else{
            newErr.address.zipcode = ''
            isSuccess = true
        }
        if(!formdata?.address.geo.lat){
            newErr.address.geo.lat = 'please enter geo lat'
            isSuccess = false
        } else{
            newErr.address.geo.lat = ''
            isSuccess = true
        }
        if(!formdata?.address.geo.lng){
            newErr.address.geo.lng = 'please enter geo lng'
            isSuccess = false
        } else{
            newErr.address.geo.lng = ''
            isSuccess = true
        }
        if(!formdata?.phone){
            newErr.phone = 'please enter phone'
            isSuccess = false
        } else{
            newErr.phone = ''
            isSuccess = true
        }
        if(!formdata?.website){
            newErr.website = 'please enter website'
            isSuccess = false
        } else{
            newErr.website = ''
            isSuccess = true
        }
        if(!formdata?.company.c_name){
            newErr.company.name = 'please enter company name'
            isSuccess = false
        } else{
            newErr.company.name = ''
            isSuccess = true
        }
        if(!formdata?.company.catchPhrase){
            newErr.company.catchPhrase = 'please enter company catchPhrase'
            isSuccess = false
        } else{
            newErr.company.catchPhrase = ''
            isSuccess = true
        }
        if(!formdata?.company.bs){
            newErr.company.bs = 'please enter company bs'
            isSuccess = false
        } else{
            newErr.company.bs = ''
            isSuccess = true
        }
    
        this.setState({
            errFormdata : newErr
        })

        if(isSuccess){
            let newdata = this.state.state1
            if(formdata?.id){
                let response =  await fetch(`https://jsonplaceholder.typicode.com/users/${formdata.id}` , {
                    method: 'put',
                    body: JSON.stringify(formdata)
                })
                let res = await response.json()
                if(res){
                   let uidx = newdata?.findIndex((user) => user?.id === formdata.id)
                   if(uidx > -1){
                    newdata[uidx] = formdata
                   }
                }
            } else{
                let response =  await fetch('https://jsonplaceholder.typicode.com/users' , {
                    method: 'post',
                    body: JSON.stringify(formdata)
                })
                let res = await response.json()
                if(res){
                    // console.log(res, 'here');
                    let obj = formdata
                    obj.id = newdata.length + 1
                    newdata.push(obj)
                }
            }    
            this.setState({
                res : newdata,
                formdata : {
                        "name": "",
                        "username": "",
                        "email": "",
                        "address": {
                        "street": "",
                        "suite": "",
                        "city": "",
                        "zipcode": "",
                        "geo": {
                            "lat": "",
                            "lng": ""
                        }
                        },
                        "phone": "",
                        "website": "",
                        "company": {
                            "name": "",
                            "catchPhrase": "",
                            "bs": ""
                        }
                }
            })
        }    
    }
    handleEdit = async (id) => {
        let response =  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        let res = await response.json()  
        if(res){    
            this.setState({
                    formdata: res
                })  
        }    
    }

    render() {
        const { state1, formdata, errFormdata } = this.state
        // console.log(formdata);
        return (
            <>
               <select className='submit' onChange={this.handlesort}>
                    <option value="">==sort==</option>
                    <option value="Asc">Asc</option>
                    <option value="Dec">Dec</option>
               </select>

                <form method="post" onSubmit={this.handlesubmit} className='dCenter'>
                    <div>
                        <input type="text" name='name' onChange={this.handlechange} value={formdata?.name} placeholder='Enter name' />
                        {errFormdata?.name && <p className='er'>{errFormdata?.name}</p>} 
                    </div>
                    <div>
                        <input type="text" name='username' onChange={this.handlechange} value={formdata?.username} placeholder='Enter username' />
                        {errFormdata?.username && <p className='er'>{errFormdata?.username}</p>} 
                    </div>
                    <div>
                        <input type="email" name='email' onChange={this.handlechange} value={formdata?.email} placeholder='Enter email' />
                        {errFormdata?.email && <p className='er'>{errFormdata?.email}</p>} 
                     </div>
                    <div>
                        <input type="text" name='street' onChange={this.handlechange} value={formdata?.address.street} placeholder='Enter street' />
                        {errFormdata?.address.street && <p className='er'>{errFormdata?.address.street}</p>} 
                    </div>
                    <div>
                        <input type="text" name='suite' onChange={this.handlechange} value={formdata?.address.suite} placeholder='Enter suite' />
                        {errFormdata?.address.suite && <p className='er'>{errFormdata?.address.suite}</p>} 
                    </div>
                    <div>
                        <input type="text" name='city' onChange={this.handlechange} value={formdata?.address.city} placeholder='Enter city' />
                        {errFormdata?.address.city && <p className='er'>{errFormdata?.address.city}</p>} 
                    </div>
                    <div>
                        <input type="text" name='zipcode' onChange={this.handlechange} value={formdata?.address.zipcode} placeholder='Enter zipcode' />
                        {errFormdata?.address.zipcode && <p className='er'>{errFormdata?.address.zipcode}</p>} 
                    </div>
                    <div>
                        <input type="text" name='lat' onChange={this.handlechange} value={formdata?.address.geo.lat} placeholder='Enter lat' />
                        {errFormdata?.address.geo.lat && <p className='er'>{errFormdata?.address.geo.lat}</p>} 
                    </div>
                    <div>
                        <input type="text" name='lng' onChange={this.handlechange} value={formdata?.address.geo.lng} placeholder='Enter lng' />
                        {errFormdata?.address.geo.lng && <p className='er'>{errFormdata?.address.geo.lng}</p>} 
                    </div>
                    <div>
                        <input type='text' name='phone' onChange={this.handlechange} value={formdata?.phone} placeholder='Enter phone' />
                        {errFormdata?.phone && <p className='er'>{errFormdata?.phone}</p>} 
                    </div>
                    <div>
                        <input type="text" name='website' onChange={this.handlechange} value={formdata?.website} placeholder='Enter website' />
                        {errFormdata?.website && <p className='er'>{errFormdata?.website}</p>} 
                    </div>
                    <div>
                        <input type="text" name='c_name' onChange={this.handlechange} value={formdata?.company.c_name} placeholder='Enter company name' />
                        {errFormdata?.company.c_name && <p className='er'>{errFormdata?.company.name}</p>} 
                    </div>
                    <div>
                        <input type="text" name='catchPhrase' onChange={this.handlechange} value={formdata?.company.catchPhrase} placeholder='Enter catchPhrase' />
                        {errFormdata?.company.catchPhrase && <p className='er'>{errFormdata?.company.catchPhrase}</p>} 
                    </div>
                    <div>
                        <input type="text" name='bs' onChange={this.handlechange} value={formdata?.company.bs} placeholder='Enter company bs' />
                        {errFormdata?.company.bs && <p className='er'>{errFormdata?.company.bs}</p>} 
                    </div>
                    <div>
                        <button className='submit' type='submit'>Submit</button>
                    </div>
                </form>
                <div>  
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>userName</th>
                                <th>Email</th>
                                <th>street</th>
                                <th>suite</th>
                                <th>city</th>
                                <th>zipcode</th>
                                <th>lat</th>
                                <th>lng</th>
                                <th>phone</th>
                                <th>website</th>
                                <th>Company Name</th>
                                <th>catchPhrase</th>
                                <th>bs</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        {this.state.loading ? <img src={loading}/>
                            : state1 ? 
                                state1.map((post, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{post?.id}</td>
                                            <td>{post?.name}</td>
                                            <td>{post?.username}</td>
                                            <td>{post?.email}</td>
                                            <td>{post?.address.street}</td>
                                            <td>{post?.address.suite}</td>
                                            <td>{post?.address.city}</td>
                                            <td>{post?.address.zipcode}</td>
                                            <td>{post?.address.geo.lat}</td>
                                            <td>{post?.address.geo.lng}</td>
                                            <td>{post?.phone}</td>
                                            <td>{post?.website}</td>
                                            <td>{post?.company.name}</td>
                                            <td>{post?.company.catchPhrase}</td>
                                            <td>{post?.company.bs}</td>
                                            <td>
                                                <button onClick={() => this.handleEdit(post?.id)}>Edit</button>
                                                <button onClick={() => this.handleDelete(post?.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ) 
                                })
                            : <tr>No data found</tr>
                        }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default Test