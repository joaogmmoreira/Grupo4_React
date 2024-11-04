import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import celularImg from "./img/celular-removebg-preview.png";

export default function Home() {
  return (
    <>
      <Header />
      <div class="black">
    <span class="blackText">🔥BLACK NOVEMBER 11.11🔥</span>
</div>

    <div class="cards">

    <div class="produtos">
      <h2 class="textoVerm">Até 30% <br />off em <br/>compras acima de <span class="valor">R$300,00</span></h2>
      <img class="celular"src={celularImg} alt="Celular" />
    </div>

    <div class="produtos2">
      <h2 class="textoVerm">Até 30% <br />off em <br/>compras acima de <span class="valor">R$300,00</span></h2>
      <img class="celular"src={celularImg} alt="Celular" />
    </div>
    </div>

    

      <Footer />
    </>
  );
}
