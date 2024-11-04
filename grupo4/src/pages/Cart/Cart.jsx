import { CartContext } from "../../context/CartContext";
import CartProductsCard from "../../components/CartProductsCard/CartProductsCard";
import { useState, useContext, useEffect } from "react";
import { getProductById } from "../../api/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// import Loading from "./Loading";
// import { AuthContext } from "../../context/AuthContext";

export default function CartProducts() {
  // const [loading, setLoading] = useState(true);
  // const { authenticated } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  // const navigate = useNavigate();

  // const getProductsFromLocalStorage = () => {
  //   const productsFromCart = JSON.parse(localStorage.getItem("products"));
  //   setProducts(productsFromCart);
  //   setLoading(false);
  // };

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
      const { id, nome, preco, imgurl, quantity } = product;
      return (
        <div key={id} className="cart-div">
          <CartProductsCard
            id={id}
            nome={nome}
            preco={preco}
            imgurl={imgurl}
            quantity={quantity}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    handleProducts();
  }, []);

  // const purchase = () => {
  //   return authenticated ? history.push("/checkout") : history.push("/login");
  // };

  // useEffect(() => {
  //   getProductsFromLocalStorage();
  // }, []);

  return (
    <>
      <Header />
      <h2 className="titulo">Carrinho</h2>
      <div className="cart">
        {renderCartProducts()}
        <div className="total-price-div">
          <p className="total-price-p">Total: R$ {totalPrice}</p>
          <button type="button" className="ir-pagamento" onClick={() => {}}>
            Ir para pagamento
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
