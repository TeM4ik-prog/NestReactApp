import { useEffect, useState } from "react"
import ProductsList from "../../components/products/ProductsList/productsList"
import axios from "axios";

export default function ProductsPage() {
    const [products, setProducts] = useState([])

    const [triggerUpdate, setTriggerUpdate] = useState(false)

    const triggerUpdateProducts = () => {
        setTriggerUpdate(!triggerUpdate)
    }


    useEffect(() => {
        axios.get(
            `/api/products`, {})
            .then((response) => {
                console.log(response.data)
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, [triggerUpdate])


    return (
        <>
            <h1>Products Page</h1>

            <ProductsList products={products} triggerUpdateProducts={triggerUpdateProducts} />
        </>
    )
}