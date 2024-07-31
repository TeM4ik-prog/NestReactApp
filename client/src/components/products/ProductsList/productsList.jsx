import Product from "../Product/product";
import "./productsList.scss"

export default function ProductsList({ products, triggerUpdateProducts }) {




    return (
        <div className="products-list-container">
            {products && products.length && products.length > 0 ? (
                <>
                    {
                        products.map((data_prod, index) => (

                            <Product key={index} info={data_prod} triggerUpdateProducts={triggerUpdateProducts} />
                        ))
                    }
                </>
            ) : <h1>Products not found</h1>}

        </div>
    )
}