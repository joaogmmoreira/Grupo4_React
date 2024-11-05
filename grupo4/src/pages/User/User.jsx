import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProductById, getUserById } from "../../api/Api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getInvoiceByUserId } from "../../api/Api";
import "./User.css";

export default function User() {
  const { id } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [nav, setNav] = useState("perfil");
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState({});

  const handleNav = (e) => {
    const value = e.target.value;
    setNav(value);
  };

  const renderPage = () => {
    if (nav === "perfil") {
      return (
        <div className="profile">
          <div className="avatar">
            <img src={user.foto} alt="User Avatar" />
            <h1>{user.nome}</h1>
          </div>
          <div className="profile-info">
            <h3>{user.email}</h3>
            <h3>{user.endereco}</h3>
            <h3>{user.telefone}</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="invoices">
          <h1>Pedidos</h1>
          {invoices.map((invoice) => (
            <div key={invoice.id} className="invoice">
              <h2>Pedido Nº: {invoice.id}</h2>
              {invoice.itens.map((item) => {
                const productInfo = products[item.idProduto];
                return (
                  <div key={item.idProduto} className="invoice-description">
                    {productInfo ? (
                      <div className="cart-card">
                        <div className="cart-description">
                          <div className="cart-img">
                            <a href={`/productview/${id}`} title="">
                              <img
                                src={productInfo.imgurl}
                                alt={productInfo.nome}
                              />
                            </a>
                          </div>
                          <div className="nome-div">
                            <h3>{productInfo.nome}</h3>
                            <h3>{productInfo.descrição}</h3>
                          </div>
                        </div>
                        <div className="separate-div" />
                        <div className="price-div">
                          <div className="qty-div">
                            <h3>{item.quantidade}</h3>
                          </div>
                          <div className="total-div">
                            <p>
                              Total: R$ {(productInfo.preco * 0.8).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                );
              })}
              <p>Total: R$ {invoice.valorTotal}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchProductInfo = async () => {
      const productInfo = {};
      for (const invoice of invoices) {
        for (const item of invoice.itens) {
          const product = await getProductById(item.idProduto);
          productInfo[item.idProduto] = product;
        }
      }
      setProducts(productInfo);
    };

    if (invoices.length > 0) {
      fetchProductInfo();
    }
  }, [invoices]);

  useEffect(() => {
    const handleUser = async () => {
      const response = await getUserById(id);
      setUser(response);
    };
    handleUser();
  }, [id]);

  useEffect(() => {
    const getInvoices = async (id) => {
      return setInvoices(await getInvoiceByUserId(id));
    };
    getInvoices(id);
  }, [id, nav]);

  return (
    <>
      <Header />
      <nav className="nav-user">
        <ul>
          <li>
            <button
              value="perfil"
              className="nav-btn"
              onClick={(e) => handleNav(e)}
            >
              Perfil
            </button>
          </li>
          <li>
            <button
              value="pedidos"
              className="nav-btn"
              onClick={(e) => handleNav(e)}
            >
              Pedidos
            </button>
          </li>
        </ul>
      </nav>
      {renderPage()}
      <Footer />
    </>
  );
}
