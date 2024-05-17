import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllData } from "./homeSlice"
import { Link } from "react-router-dom"
import '../../counter/home/displayData.css'

const Home = () => {

    const dispatch = useDispatch()
    const loader = useSelector((state) => state.product.loader)
    const data = useSelector((state) => state.product.data)
    console.log({ loader, data });
    useEffect(() => {
        dispatch(getAllData())
    },[])

    return (
        <>
            <Link to={'/Login'}>
                <button>Login</button>
            </Link>
            <div className="gallery">
                {loader ? <h1>Loading...</h1>
                    : data?.products?.length > 0 ?
                        data?.products?.map((product, idx) => (
                            <div className="" key={idx}>
                                <Link to={`/product/${product.id}`}>
                                    <div className="content ">
                                        <img src={product.thumbnail} alt="smartwatch" />
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                        <del>${product.price}</del><h6>${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</h6>
                                    </div>
                                </Link>
                            </div>
                        ))
                            : <div><center>No data found</center></div>
                }               
            </div>
        </>

    )
}

export default Home