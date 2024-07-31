import { useEffect, useState } from "react";
import ProductsList from "../../../../components/products/ProductsList/productsList";
import { ProductsService } from "../../../../services/products.service";
import { toast } from "react-toastify";

export default function UserProducts() {
    const [userProducts, setUserProducts] = useState(null)


    useEffect(() => {
        const fetchUserProducts = async () => {
          try {
            const data = await ProductsService.getUserProducts();
            if (data) {
              toast.success('User Products got successfully');
              setUserProducts(data);
            }
          } catch (err) {
            toast.error(err.response?.data?.message || 'Error getting user products');
          }
        };
    
        fetchUserProducts();
      }, [])

    return (


        <ProductsList products={userProducts} />
    )


}