import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import pcImg from "./img/pc-removebg-preview.png";
import perifericosImg from "./img/perifericos.png";

export default function Home() {
  return (
    <>
      <Header />

      <div className="cards">
        <div className="produtos">
          <h2 className="texto">
            Até 30% <br />
            off em <br />
            compras acima de <span className="valor">R$300,00</span>
          </h2>
          <img className="informatica notebook" src={pcImg} alt="notebook" />
          <a
            href="/product"
            className="apply-coupon-link note"
            onClick="applyCoupon()"
          >
            COMPRAR
          </a>
        </div>

        <div className="produtos2">
          <h2 className="texto">
            Use o CUPOM: <br />
            <span className="valor">TECH30 </span>
            <br />
            Ganhe Desconto Extra!
          </h2>
          <img className="informatica" src={perifericosImg} alt="perifericos" />
          <a
            href="/product"
            className="apply-coupon-link"
            onClick="applyCoupon()"
          >
            COMPRAR
          </a>
        </div>

        <div className="info-sessao">
          <div className="info-item">
            <span className="info-icone">🏬</span>
            <div className="info-texto">Retirada disponível</div>
          </div>

          <div className="info-item">
            <span className="info-icone">📦</span>
            <div className="info-texto">Frete grátis acima de R$250,00</div>
          </div>

          <div className="info-item">
            <span className="info-icone">💲</span>
            <div className="info-texto">Garantia de preços baixos</div>
          </div>

          <div className="info-item">
            <span className="info-icone">⏰</span>
            <div className="info-texto">Disponível para você 24hrs</div>
          </div>
        </div>
      </div>

      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/WbhZiKZXXv8?autoplay=1&mute=1&loop=1&playlist=WbhZiKZXXv8"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <Footer />
    </>
  );
}
