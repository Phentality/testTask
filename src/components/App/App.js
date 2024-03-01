import React from 'react';
import './App.css';
import Main from '../Main/Main';
import * as api from '../../utils/Api';
import Pagination from '../Pagination/Pagination';
import Preloader from '../Preloader/Preloader'

function App() {
  const [products, setProducts] = React.useState([]);
  const [showcase, setShowcase] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage] = React.useState(50);
  const [preloaderVisibility, setPreloaderVisibility] = React.useState(false);

  React.useEffect(() => {
    setPreloaderVisibility(true);
    const getProducts = async () => {
      try {
        await api.getAllCards("get_ids", { "offset": 1, "limit": 8500 })
          .then((data) => {
            setProducts(data.result);
          })
      }
      catch {
        console.log("Что-то пошло не так");
      }
      finally {
        setPreloaderVisibility(false);
      }
    }
    getProducts();
  }, []);

  async function getShowcase() {
    setPreloaderVisibility(true);
    setCurrentPage(1);
    try {
      await api.getAllCards("get_items", { "ids": products })
        .then((data) => {
          setShowcase(data.result);
        })
    }
    catch {
      console.log("Что-то пошло не так");
    }
    finally {
      setPreloaderVisibility(false);
    }
  }


  async function filterShowcase(value) {
    setPreloaderVisibility(true);
    setCurrentPage(1);
    try {
      await api.getAllCards("get_items", { "ids": value })
        .then((data) => {
          setShowcase(data.result);
        })
    }
    catch {
      console.log("Что-то пошло не так");
    }
    finally {
      setPreloaderVisibility(false);
    }
  }

  async function priceFilter(value) {
    setCurrentPage(1);
    let price = JSON.parse(value);
    try {
      await api.getAllCards("filter", { "price": price })
        .then((data) => {
          filterShowcase(data.result);
        })
    }
    catch {
      console.log("Что-то пошло не так");
    }
  }

  async function productFilter(value) {
    setCurrentPage(1);
    try {
      await api.getAllCards("filter", { "product": value })
        .then((data) => {
          filterShowcase(data.result);
        })
    }
    catch {
      console.log("Что-то пошло не так");
    }
  }

  async function brandFilter(value) {
    setCurrentPage(1);
    try {
      await api.getAllCards("filter", { "brand": value })
        .then((data) => {
          filterShowcase(data.result);
        })
    }
    catch {
      console.log("Что-то пошло не так");
    }
  }

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  let dublicates = showcase, unique = dublicates.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
  const currentProduct = unique.slice(firstProductIndex, lastProductIndex);

  const nextPage = () => setCurrentPage(prev => {
    if (prev * productsPerPage < unique.length) {
      return prev + 1;
    }
    else { return prev }
  });
  const prevPage = () => setCurrentPage(prev => {
    if (prev === 1) {
      return prev;
    }
    else { return prev - 1 }
  });

  return (<>
    <Main click={getShowcase} priceFilter={priceFilter} productFilter={productFilter} brandFilter={brandFilter} products={currentProduct}></Main>
    <Preloader visibility={preloaderVisibility} />
    <Pagination currentPage={currentPage} nextPage={nextPage} prevPage={prevPage} />
  </>
  );
}

export default App;
