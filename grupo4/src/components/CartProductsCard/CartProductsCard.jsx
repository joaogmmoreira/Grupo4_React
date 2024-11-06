import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartProductsCard.css";

export default function CartProductsCard(props) {
  const { id, nome, preco, imgurl, quantity, descrição } = props;
  const [newQty, setNewQty] = useState(quantity);
  const [newTotalPrice, setNewTotalPrice] = useState(0);

  const { addProductQuantity, contextTotalPrice, removeProductFromCart } =
    useContext(CartContext);

  const changeQuantity = (e) => {
    const { value } = e.target;
    const numberValue = Number(value);
    if (numberValue === 0) {
      removeProductFromCart(id);
    }
    return setNewQty(numberValue);
  };

  const calculateTotalPrice = () => {
    setNewTotalPrice(preco * newQty);
  };

  const deleteProductFromCart = () => {
    removeProductFromCart(id);
  };

  useEffect(() => {
    calculateTotalPrice();
    contextTotalPrice();
    addProductQuantity(id, newQty);
  }, [newQty]);

  return (
    <div className="cart-card">
      <div className="cart-description">
        <div className="cart-img">
          <Link to={`/products/${id}`}>
            <img src={imgurl} alt={nome} />
          </Link>
        </div>
        <div className="nome-div">
          <h3>{nome}</h3>
          <h3>{descrição}</h3>
        </div>
        <button
            type="button"
            className="delete-product-button"
            onClick={() => {
              deleteProductFromCart();
            }}
            >X</button>
      </div>
      <div className="separate-div" />
      <div className="price-div">
        <div className="qty-div">
          <form>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={changeQuantity}
              defaultValue={quantity}
              min="0"
              // max={quantity} // // // //
            />
          </form>
        </div>
        <div className="total-div">
          <p className="discount">
            <span>De: R$ {newTotalPrice.toFixed(2)}</span> por:
          </p>
          <p>Total: R$ {(newTotalPrice * 0.8).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

CartProductsCard.propTypes = {
  id: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
  imgurl: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  descrição: PropTypes.string.isRequired,
  //   calculateTotalTotalPrice: PropTypes.func.isRequired,
};
