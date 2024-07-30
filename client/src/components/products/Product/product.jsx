import { useState } from "react";
import "./product.scss"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Product({ info, triggerUpdateProducts }) {
    const [isUserEditing, setIsUserEditing] = useState(false)

    const [productData, setProductData] = useState({ ...info })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const onEdit = () => {
        setIsUserEditing(false)


        console.log(productData)

        axios.patch(
            `api/products/${info.id}`,
            productData)
            .then((response) => {
                console.log(response.data)

                triggerUpdateProducts()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const onDelete = () => {
        console.log("Delete product");

        axios.delete(
            `api/products/${info.id}`
        )
            .then((response) => {
                console.log(response.data)

                triggerUpdateProducts()
            })
            .catch((error) => {
                console.log(error)
            });


    }

    return (

        <div className="product-container">
            <div className="all-data-product">
                <img src={info.image} alt={info.name} />


                <div className="info-container">
                    <Link to={`detailed/${info.id}`}>
                        <h2>{info.name}</h2>

                    </Link>

                    <p>{info.description}</p>
                    <p className="money">{info.price} $</p>

                </div>

                <div className="actions-product">
                    <p className="edit" onClick={() => setIsUserEditing(true)}>edit</p>
                    <p className="delete" onClick={onDelete}>delete</p>
                </div>

            </div>

            {isUserEditing ? (
                <div className="patch-container">
                    <input placeholder="название" name="name" value={productData.name} onChange={handleChange}></input>
                    <input placeholder="описание" name="description" value={productData.description} onChange={handleChange}></input>
                    <input placeholder="цена" name="price" type="number" value={productData.price} onChange={handleChange}></input>


                    <button onClick={onEdit}>Изменить</button>
                </div>
            ) : null}


        </div>

    )
}