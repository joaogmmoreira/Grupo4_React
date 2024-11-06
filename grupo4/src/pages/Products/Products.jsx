import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/Api";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getProductsByCategory } from "../../api/Api";
import ProductsCard from "../../components/ProductsCard/ProductsCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Products.css";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("nome");
  const [renderBool, setRenderBool] = useState(false);

  const history = useHistory();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("categoria");

  const forceRender = () => {
    setRenderBool(!renderBool);
  };

  const fetchProducts = async () => {
    if (category) {
      const productsByCategory = await getProductsByCategory(category);
      setProducts(productsByCategory);

      return setFilteredProducts(productsByCategory);
    }
    const allProducts = await getAllProducts();
    setProducts(allProducts);
    setAllProducts(allProducts);
    return setFilteredProducts(allProducts);
  };

  const handleCategory = () => {
    const categories = allProducts.map((product) => product.categoria);
    const uniqueCategories = [...new Set(categories)];
    setCategorias(uniqueCategories);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const RenderSearch = () => {
    if (filter === "nome") {
      return (
        <>
          <label htmlFor="search">Buscar produto </label>
          <input className="name-input" onChange={(e) => handleSearch(e)} />
          <button
            className="filter-button"
            type="button"
            onClick={() => filterProducts(filter)}
          >
            Filtrar
          </button>
        </>
      );
    }
    return (
      <>
        <label htmlFor="categoria">Selecione uma categoria </label>
        <select
          name="categoria"
          id="categoria"
          className="name-input"
          onChange={(e) => handleSearch(e)}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <button
          className="filter-button"
          type="button"
          onClick={() => {
            history.push(`/products?categoria=${search}`);
            forceRender();
          }}
        >
          Filtrar
        </button>
        <button
          className="filter-button"
          type="button"
          onClick={() => {
            history.push(`/products`);
            forceRender();
          }}
        >
          Retirar filtro
        </button>
      </>
    );
  };

  const filterProducts = (filter) => {
    const filtered = products.filter((product) => {
      return product[filter].toLowerCase().includes(search.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const renderProducts = () => {
    return filteredProducts.map((product) => {
      if (product.quantidade === 0) return null;
      return <ProductsCard key={product.id} product={product} />;
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [renderBool]);

  useEffect(() => {
    handleCategory();
  }, [products]);

  return (
    <>
      <Header />
      <section className="products">
        <div className="filter-search-container">
          <label htmlFor="filtro">Filtrar por: </label>
          <select
            name="filtro"
            className="name-input"
            onChange={(e) => handleFilter(e)}
          >
            <option value="nome">Nome</option>
            <option value="categoria">Categoria</option>
          </select>
          <RenderSearch />
          {/* {renderSearch()} */}
        </div>
        <div className="products-container">{renderProducts()}</div>
      </section>
      <Footer />
    </>
  );
}
