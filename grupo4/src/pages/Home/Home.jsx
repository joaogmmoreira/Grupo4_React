import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import celularImg from "./img/celular-removebg-preview.png";

export default function Home() {
  return (
    <>
      <Header />
      <div className="cards">
        <div className="produtos">
          <h2 className="textoVerm">
            Até 30% <br />
            off em <br />
            compras acima de <span className="valor">R$300,00</span>
          </h2>
          <img className="celular" src={celularImg} alt="Celular" />
        </div>

        <div className="produtos2">
          <h2 className="textoVerm">
            Até 30% <br />
            off em <br />
            compras acima de <span className="valor">R$300,00</span>
          </h2>
          <img className="celular" src={celularImg} alt="Celular" />
        </div>
      </div>

      <Footer />
    </>
  );
}
