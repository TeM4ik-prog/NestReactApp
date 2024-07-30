import axios from "axios"
import "./sellPage.scss"

export default function SellPage() {

    const handleSellProduct = async (e) => {
        e.preventDefault()

        let prodData = new FormData(e.target)


        // const response = await fetch('http://localhost:3000/products', {
        //     method: 'POST',
        //     body: prodData,
        // });



        axios.post(
            `api/products`,
            // { name: 'testProduct', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente assumenda suscipit beatae tempora nemo. Inventore enim omnis cum. Enim eaque numquam error explicabo quis quae consectetur porro culpa odit commodi?', price: 1000, image: 'https://www.shutterstock.com/image-photo/boat-tree-sunset-600nw-1770893537.jpg' })
            prodData)
            .then((response) => {
                console.log(response.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (

        <>
            <h1>Sell Page</h1>

            <form onSubmit={(e) => handleSellProduct(e)} enctype="multipart/form-data">

                <input placeholder="название" name="name" required></input>
                <input placeholder="описание" name="description" required></input>
                <input placeholder="цена" name="price" type="number" required></input>
                <input type="file" name="image" accept="image/*" required></input>


                <button >Выставить на продажу</button>
            </form>




        </>
    )
}