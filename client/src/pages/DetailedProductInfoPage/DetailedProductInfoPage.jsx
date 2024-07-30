import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

export default function DetailedProductInfoPage() {
    const [searchParams] = useSearchParams();
    const { productId } = useParams()


    const [productData, setProductData] = useState('')




    useEffect(() => {
        axios.get(
            `/api/products/${productId}`, {})
            .then((response) => {
                console.log(response.data)
                setProductData(response.data)
            })
            .catch((error) => {
                console.log(error)
            });

    }, [productId])


    return (
        <>
            <h1>Детальная информация о продукте</h1>


            {productData ? (
                <div>
                    <img src={productData.image} />
                    <h2>{productData.name}</h2>
                    <p>{productData.description}</p>
                    <p>Цена: {productData.price} $</p>
                </div>


            ) : <h2>Загрузка...</h2>}
        </>
    )
}