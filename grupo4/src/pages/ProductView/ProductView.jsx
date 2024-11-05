import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/Api";
import { CartContext } from "../../context/CartContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import cardImage from "../../assets/cartao-de-credito.png";
import cdBarraImg from "../../assets/leitor-de-codigos-de-barra.png";
import starImg from "../../assets/estrela.png";

import "./ProductView.css";

export default function ProductView() {
  const [product, setProduct] = useState(null);
  const endPoint = useParams().id;

  const { addProductToCart } = useContext(CartContext);

  const fetchProductById = async () => {
    const newProduct = await getProductById(endPoint);
    console.log(newProduct);
    setProduct(newProduct);
  };

  const handleButtonClick = (id) => {
    addProductToCart(id);
  };

  const renderProductView = () => {
    return product ? (
      <>
        <div className="container">
          <img className="productImg" src={product.imgurl}></img>
          <div className="productCard">
            <h2 style={{ fontWeight: "bold" }}>{product.descrição}</h2>
            <div>
              <span> Avaliação: {product.avaliacao}</span>
              <img
                style={{ width: "20px", marginLeft: "10px" }}
                src={starImg}
                alt=""
              />
            </div>

            <div>
              <img
                style={{ width: "30px", marginRight: "10px" }}
                src={cdBarraImg}
                alt=""
              />
              <span>Codigo do produto: {product.id}</span>
            </div>

            <div>
              <img
                style={{ width: "30px", marginRight: "10px" }}
                src={cardImage}
                alt=""
              />
              <span style={{ color: "#34c934" }}>R$ {product.preco},00</span>
            </div>

            <button
              onClick={() => {
                handleButtonClick(endPoint);
              }}
              className="productBtn"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </>
    ) : (
      <h1>Carregando...</h1>
    );
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  return (
    <>
      <Header />
      {renderProductView()}
      <Footer />
    </>
  );
}
