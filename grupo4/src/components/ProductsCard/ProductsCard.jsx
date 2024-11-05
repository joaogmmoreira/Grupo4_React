import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./ProductsCard.css";

export default function ProductsCard({ product }) {
  const { id, nome, imgurl, preco } = product;
  const { addProductToCart } = useContext(CartContext);

  const handleButtonClick = (id) => {
    addProductToCart(id);
  };

  return (
    <div className="product-card">
      <div className="black-november">
        <p>20% OFF</p>
        <h1>Black November</h1>
      </div>
      <Link className="link" to={`/products/${id}`}>
        <img className="product-img" src={imgurl} alt={nome} />
        <div className="product-description">
          <h2>{nome}</h2>
          <br />
          <p>
            <span>De: {preco}</span> por:
          </p>
          <p className="price">{`R$ ${(preco * 0.8).toFixed(2)}`}</p>
        </div>
      </Link>
      <button
        className="addToCart-button"
        type="button"
        onClick={() => handleButtonClick(id)}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

ProductsCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    imgurl: PropTypes.string.isRequired,
    descrição: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
  }).isRequired,
};
