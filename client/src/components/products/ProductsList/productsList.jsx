import Product from "../Product/product";
import "./productsList.scss"

export default function ProductsList({ products, triggerUpdateProducts }) {




    return (
        <div className="products-list-container">
            {products.map((data_prod, index) => (

                <Product key={index} info={data_prod} triggerUpdateProducts={triggerUpdateProducts} />
            ))}

        </div>
    )
}