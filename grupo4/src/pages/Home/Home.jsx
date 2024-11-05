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
          <h2 className="textoVerm">
            Até 30% <br />
            off em <br />
            compras acima de <span className="valor">R$300,00</span>
          </h2>
          <img className="informatica notebook" src={pcImg} alt="notebook" />
          <a href="#" class="apply-coupon-link note" onclick="applyCoupon()">COMPRAR</a>
        </div>

        <div className="produtos2">
          <h2 className="textoVerm">
          Use o CUPOM: <br /><span className="valor">TECH30  </span><br />Ganhe Desconto Extra! 
          </h2>
          <img className="informatica" src={perifericosImg} alt="perifericos" />
          <a href="#" className="apply-coupon-link" onclick="applyCoupon()">COMPRAR</a>
        </div>
        
        <div className="info">

        </div>
      </div>

      <Footer />
    </>
  );
}
