import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function CartProductsCard(props) {
  const { id, nome, preco, imgurl, quantity } = props;
  const [newQty, setNewQty] = useState(quantity);
  const [newTotalPrice, setNewTotalPrice] = useState(0);

  //   const setNewQtyToLocalStorage = (qty) => {
  //     const products = JSON.parse(localStorage.getItem("products"));
  //     const newProducts = products.map((product) => {
  //       if (product.id === id && product.size === size) {
  //         return { ...product, quantity: qty };
  //       }
  //       return product;
  //     });
  //     localStorage.setItem("products", JSON.stringify(newProducts));
  //   };

  const changeQuantity = (e) => {
    const { value } = e.target;
    const numberValue = Number(value);
    // setNewQtyToLocalStorage(numberValue);
    setNewQty(numberValue);
  };

  //   const calculateTotalPrice = () => {
  //     setNewTotalPrice(preco * newQty);
  //   };

  //   useEffect(() => {
  //     calculateTotalPrice();
  //     calculateTotalTotalPrice();
  //   }, [newQty]);

  return (
    <div className="cart-card">
      <div className="cart-img">
        <a href={`/productview/${id}`} title="">
          <img src={imgurl} alt={nome} />
        </a>
      </div>
      <div className="nome-div">
        <h3>{nome}</h3>
      </div>
      {/* <div className="size-div">
        <p>Tamanho: {size}</p>
      </div> */}
      <div className="qty-div">
        <form>
          <input
            type="number"
            name="qty"
            id="qty"
            onChange={changeQuantity}
            defaultValue={quantity}
            min="0"
          />
        </form>
      </div>
      <div className="preco-div">
        <p>Preço: R${preco}</p>
      </div>
      <div className="total-div">
        <p>Total: R$ {newTotalPrice}</p>
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
  //   calculateTotalTotalPrice: PropTypes.func.isRequired,
};
