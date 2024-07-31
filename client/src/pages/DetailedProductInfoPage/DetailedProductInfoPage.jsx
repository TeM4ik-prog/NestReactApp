import axios from "axios";
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { ProductsService } from "../../services/products.service";
import { toast } from "react-toastify";

import "./DetailedProductInfoPage.scss"


export default function DetailedProductInfoPage() {
    const [searchParams] = useSearchParams();
    const { productId } = useParams()


    const [productData, setProductData] = useState('')


    useEffect(async () => {

        try {
            const data = await ProductsService.getDetailedProduct(productId)
            if (data) {
                toast.success('Product details got successfully')
                console.log(data)
                setProductData(data)
            }

        } catch (err) {
            toast.error(err.response.data.message)
        }


    }, [productId])


    return (
        <>
            <h1>Детальная информация о продукте</h1>


            {productData ? (
                <div className="detailed-product-container">
                    <img src={productData.image} />
                    <h2>{productData.name}</h2>
                    <p>{productData.description}</p>
                    <p>Цена: {productData.price} $</p>
                </div>


            ) : <h2>Загрузка...</h2>}
        </>
    )
}