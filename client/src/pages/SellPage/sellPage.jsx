import axios from "axios"
import "./sellPage.scss"
import { toast } from "react-toastify"
import { ProductsService } from "../../services/products.service"

export default function SellPage() {

    const handleSellProduct = async (e) => {
        e.preventDefault()
        let prodData = new FormData(e.target)

        try {
            const data = await ProductsService.sellProduct(prodData)
            if (data) {
                toast.success('Product sold successfully')
            }

        } catch (err) {
            toast.error('error creating product')
        }
    }



    return (

        <>
            <h1>Sell Page</h1>

            <form onSubmit={(e) => handleSellProduct(e)} encType="multipart/form-data">

                <input placeholder="название" name="name" required></input>
                <input placeholder="описание" name="description" required></input>
                <input placeholder="цена" name="price" type="number" required></input>
                <input type="file" name="image" accept="image/*" required></input>


                <button>Выставить на продажу</button>
            </form>




        </>
    )
}