import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import {
  getProductById,
  postInvoice,
  updateProductQuantityById,
} from "../../api/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router-dom";
import "./Payment.css";


export default function Payment() {
  const { cart, totalPrice, cleanCart } = useContext(CartContext);
  const { id } = useContext(AuthContext);
  const history = useHistory();
  const [rating, setRating] = useState(0)
  const [showRatingModal, setShowRatingModal] = useState(false)

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    cardNumber: "",
    cardName: "",
    cardDate: "",
    cardCVV: "",
    installments: 1,
  });
  const [invoice, setInvoice] = useState({
    idUser: "",
    valorTotal: "",
    itens: [],
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const updateState = {
      ...form,
      [name]: value,
    };
    setForm(updateState);
  };

  const renderCartProducts = () => {
    return products.map((product) => {
      const { id, nome, preco, quantity } = product;
      return (
        <div key={id} className="cart-sec">
          <p>{nome}</p>
          <div>
            <p>Quantidade {quantity}</p>
            <p>R$ {(preco * 0.8).toFixed(2)}</p>
          </div>
        </div>
      );
    });
  };



  const onPaymentClick = async () => {
    try{
    const response = await postInvoice(invoice);
    console.log(response);

    if (response) {
      alert("Compra realizada com sucesso!");
      await Promise.all(
        cart.map((item) =>
          updateProductQuantityById(item.id, Number(item.quantity))
        )
      );
      cleanCart();
      setShowRatingModal(true);
    } else{
      alert("Erro ao realizar pagamento");
    }
  } catch(error){
    console.error('Erro ao finalizar compra', error)
    alert("Erro ao finalizar compra.  Tente novamente");
  }
  }

  const submitRating = () => {
    if (rating > 0) {
      alert(`Avaliação envida:${rating} estrelas`)
      setShowRatingModal(false);
      history.push(`/user/${id}`);
    } else {
      alert("Por favor, selecione uma nota")
    }
  }


  useEffect(() => {
    const formValidation = () => {      
      if (form.cardNumber.length !== 16) {
        return setButtonDisabled(true);
      }
      if (form.cardName.length < 3) {
        return setButtonDisabled(true);
      }
      if (form.cardDate < new Date()) {
        return setButtonDisabled(true);
      }
      // data n funciona
      const currentDate = new Date();
      const cardExpiryDate = new Date(form.cardDate);
      if(isNaN(cardExpiryDate) || cardExpiryDate < currentDate) {
        return setButtonDisabled(true);
      }
      if (form.cardCVV.length !== 3) {
        return  setButtonDisabled(true);
      }
      setButtonDisabled(false);

      };
      formValidation();
    }, [form]);

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
    const handleCartItens = () => {
      const itens = cart.map((product) => {
        return { idProduto: product.id, quantidade: product.quantity };
      });
      setInvoice(() => ({
        idUser: id,
        valorTotal: (totalPrice * 0.8).toFixed(2),
        itens: itens,
      }));
    };
    handleCartItens();
  }, []);

  return (
    <>
      <Header />
      <section className="payment-section">
        <form className="card-form">
          <input
            type="text"
            placeholder="Número do cartão"
            name="cardNumber"
            value={form.cardNumber}
            onChange={(e) => onInputChange(e)}
          />
          <input
            type="text"
            placeholder="Nome do titular"
            name="cardName"
            value={form.cardName}
            onChange={(e) => onInputChange(e)}
          />
          <input
            type="date"
            placeholder="Data de validade"
            name="cardDate"
            value={form.cardDate}
            onChange={(e) => onInputChange(e)}
          />
          <input
            type="text"
            placeholder="CVV"
            name="cardCVV"
            value={form.cardCVV}
            onChange={(e) => onInputChange(e)}
          />
          <select>
            <option value="1">1x de R$ {(totalPrice * 0.8).toFixed(2)}</option>
            <option value="2">
              2x de R$ {((totalPrice * 0.8) / 2).toFixed(2)}
            </option>
            <option value="3">
              3x de R$ {((totalPrice * 0.8) / 3).toFixed(2)}
            </option>
            <option value="4">
              4x de R$ {((totalPrice * 0.8) / 4).toFixed(2)}
            </option>
            <option value="5">
              5x de R$ {((totalPrice * 0.8) / 5).toFixed(2)}
            </option>
            <option value="6">
              6x de R$ {((totalPrice * 0.8) / 6).toFixed(2)}
            </option>
          </select>
          <button
            type="button"
            disabled={buttonDisabled}
            onClick={onPaymentClick}
          >
            Finalizar compra
          </button>
        </form>
        <div className="cart-confirmation">
          <h2>Confirmação de compra</h2>
          {renderCartProducts()}
          <p>Valor total: R$ {(totalPrice * 0.8).toFixed(2)}</p>
          {/* <p>Endereço de entrega:</p> */}
        </div>
      </section>
      {showRatingModal && (
        <div className="rating-modal">
          <h2>Avalie o produto</h2>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="0">Selecione uma avaliação</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Estrela{star > 1 && 's'}</option>
            ))}
          </select>
          <button onClick={submitRating} className="button_modal">Enviar Avaliação</button>
        </div>
      )}
      <Footer />
    </>
  );
}
