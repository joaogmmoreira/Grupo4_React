import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/Api";

export default function ProductView() {
  const [product, setProduct] = useState(null);
  const endPoint = useParams().id;

  const fetchProductById = async () => {
    const newProduct = await getProductById(endPoint);
    setProduct(newProduct);
  };

  const renderPage = () => {
    return product ? (
      <>
        <h1>{product.nome}</h1>
        <h1>{product.descrição}</h1>
        <img src={product.imgurl}></img>
      </>
    ) : (
      <h1>Carregando...</h1>
    );
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  return renderPage();
}
