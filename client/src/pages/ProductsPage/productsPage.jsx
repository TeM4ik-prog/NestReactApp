import { useEffect, useState } from "react"
import ProductsList from "../../components/products/ProductsList/productsList"
import axios from "axios";
import { ProductsService } from "../../services/products.service";
import { toast } from "react-toastify";

export default function ProductsPage() {
    const [products, setProducts] = useState([])

    const [triggerUpdate, setTriggerUpdate] = useState(false)

    const triggerUpdateProducts = () => {
        setTriggerUpdate(!triggerUpdate)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductsService.getProducts();
                if (data) {
                    toast.success('Products got successfully');
                    setProducts(data);
                }
            } catch (err) {
                toast.error('Error getting products');
            }
        };

        fetchProducts();
    }, [triggerUpdate]);



    return (
        <>
            <h1>Products Page</h1>

            <ProductsList products={products} triggerUpdateProducts={triggerUpdateProducts} />
        </>
    )
}