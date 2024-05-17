
import { useFormik } from "formik"
import { useDispatch } from "react-redux";
import { loginUser } from "./loginSlice";

const Login = () => {
    const dispatch = useDispatch()
    
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onChange: (values) => {
            console.log(values);
        },
        validate: (values) => {
            let error = {}
            if (!values.username) {
                error.username = 'Please Enter Email Id'
            }
            if (!values.password) {
                error.password = 'Please Enter Password'
            }
            return error
        },
        onSubmit: async (values) => {
            console.log(values);
            dispatch(loginUser(values))      
        }
    })

    return (
        <>
            <h1>Login</h1>
            <form method="post" onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" name="username" onChange={formik.handleChange} value={formik.values.username} placeholder="email Id" />
                    {formik.errors.username ? <div style={{ color: "red" }}>{formik.errors.username}</div> : null}
                </div>
                <div>
                    <input type="text" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="password" />
                    {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default Login