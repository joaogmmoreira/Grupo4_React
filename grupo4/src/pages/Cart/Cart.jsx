import { CartContext } from "../../context/CartContext";
import CartProductsCard from "../../components/CartProductsCard/CartProductsCard";
import { useState, useContext, useEffect } from "react";
import { getProductById } from "../../api/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Cart.css";
// import Loading from "./Loading";
// import { AuthContext } from "../../context/AuthContext";

export default function CartProducts() {
  const [products, setProducts] = useState([]);

  const { cart, totalPrice } = useContext(CartContext);

  const handleProducts = async () => {
    const cartProducts = await Promise.all(
      cart.map(async (product) => {
        const productData = await getProductById(product.id);
        return { ...productData, quantity: product.quantity };
      })
    );
    return setProducts(cartProducts);
  };

  const renderCartProducts = () => {
    return products.map((product) => {
      const { id, nome, preco, imgurl, quantity, descrição } = product;
      return (
        <div key={id} className="cart-div">
          <CartProductsCard
            id={id}
            nome={nome}
            preco={preco}
            imgurl={imgurl}
            quantity={quantity}
            descrição={descrição}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    handleProducts();
  }, []);

  useEffect(() => {
    handleProducts();
  }, [cart]);

  return (
    <>
      <Header />
      <h2 className="titulo">Carrinho</h2>
      <div className="cart">
        {renderCartProducts()}
        <div className="total-price-div">
          <p className="total-price-p">
            Total: R$ {(totalPrice * 0.8).toFixed(2)}
          </p>
          <button type="button" className="go-to-payment" onClick={() => {}}>
            Ir para pagamento
          </button>
          {/* começar daqui */}
        </div>
      </div>
      <Footer />
    </>
  );
}
