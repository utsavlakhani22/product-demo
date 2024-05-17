import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../home/productcss.css"

const ProductDetail = () => {
    const { productId } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        if (productId) {
            getProductDetail(productId)
        }
    }, [productId])

    const getProductDetail = async (id) => {
        let res = await axios.get(`https://dummyjson.com/products/${id}`)
        // console.log(res.data);
        if (res.data && res.status === 200) {
            setData(res.data)
        }
    }

    return (
        <>
            {console.log(data)}
                <div id="wrap">
                    <div>
                        <figure>
                            <img  src={data?.thumbnail} />
                            <h2>{data?.title}</h2>
                            <figcaption>{data?.description}</figcaption>
                            <div> <b> Brand : </b> {data?.brand}</div>
                            <div> <b> Category : </b> {data?.category}</div>
                            <div> <b> Rating : </b> {data?.rating}</div>
                            <div> <b> Stock : </b> {data?.stock}</div>
                            <span>
                            <del>${data?.price}</del><a>${(data?.price - (data?.price * data?.discountPercentage) / 100).toFixed(2)}</a>
                            </span>
                            <a className="button" href="#">Buy Now</a>
                        </figure>
                    </div>
                </div>    
        </>
    )
}

export default ProductDetail