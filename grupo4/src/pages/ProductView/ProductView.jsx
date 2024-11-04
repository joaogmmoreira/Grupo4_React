import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/Api";
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import "./ProductView.css"
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
      <Header/>
      <div className="Style.container">
        <h1>{product.nome}</h1>
        <h1>{product.descrição}</h1>
        <img src={product.imgurl}></img>
        <button>Adicionar ao carrinho</button>
      </div>
       
      <Footer/>
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
