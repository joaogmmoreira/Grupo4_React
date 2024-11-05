import { useState, useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CartProductsCard from "../../components/CartProductsCard/CartProductsCard";
import { getProductById } from "../../api/Api";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Cart.css";
// import Loading from "./Loading";

export default function CartProducts() {
  const [products, setProducts] = useState([]);

  const { cart, totalPrice, cleanCart } = useContext(CartContext);
  const { authenticated } = useContext(AuthContext);

  const history = useHistory();

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

  const goToPayment = () => {
    return authenticated ? history.push("/payment") : history.push("/login");
  };

  const deleteAllProductsFromCart = () => {
    cleanCart();
  };

  useEffect(() => {
    const handleProducts = async () => {
      const cartProducts = await Promise.all(
        cart.map(async (product) => {
          const productData = await getProductById(product.id);
          return { ...productData, quantity: product.quantity };
        })
      );
      return setProducts(cartProducts);
    };
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
          <button
            type="button"
            className="go-to-payment"
            onClick={() => goToPayment()}
          >
            Ir para pagamento
          </button>
        </div>
        <button
          type="button"
          className="delete-allProducts-button"
          onClick={() => {
            deleteAllProductsFromCart();
          }}
        >
          Apagar Carrinho
        </button>
      </div>
      <Footer />
    </>
  );
}
