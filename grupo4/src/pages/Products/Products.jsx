import { useState, useEffect } from "react";
import { getAllProducts } from "../../api/Api";
import ProductsCard from "../../components/ProductsCard/ProductsCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("nome");

  const fetchAllProducts = async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  };

  const handleCategory = () => {
    const categories = products.map((product) => product.categoria);
    const uniqueCategories = [...new Set(categories)];
    setCategorias(uniqueCategories);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const renderSearch = () => {
    if (filter === "nome") {
      return (
        <>
          <label htmlFor="search">Buscar produto </label>
          <input onChange={(e) => handleSearch(e)} />
        </>
      );
    }
    return (
      <>
        <label htmlFor="categoria">Selecione uma categoria </label>
        <select
          name="categoria"
          id="categoria"
          onChange={(e) => handleSearch(e)}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
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
    fetchAllProducts();
  }, []);

  useEffect(() => {
    handleCategory();
  }, [products]);

  useEffect(() => {
    filterProducts(filter);
  }, [search]);

  return (
    <>
      <Header />
      <section className="products">
        <div className="filter-search-container">
          <div>
            <label htmlFor="filtro">Filtrar por: </label>
            <select name="filtro" id="filtro" onChange={(e) => handleFilter(e)}>
              <option value="nome">Nome</option>
              <option value="categoria">Categoria</option>
            </select>
          </div>
          <div>{renderSearch()}</div>
        </div>
        <div className="products-container">{renderProducts()}</div>
      </section>
      <Footer />
    </>
  );
}
