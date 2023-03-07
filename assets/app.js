const root = ReactDOM.createRoot(document.querySelector('#root'));


const App = ()=> {
  const [products, setProducts] = React.useState([]);

  React.useEffect(()=> {
    const fetchProducts = async()=> {
      const response = await fetch('/api/products');
      setProducts(await response.json());
    };
    fetchProducts();
  }, []);

  const create = async()=> {
    const response = await axios.post(
      '/api/products',
      {
        name: Math.random()
      }
    );
    setProducts([...products, response.data]);
  };

  const destroy = async(product)=> {
    await axios.delete(`/api/products/${product.id}`);
    setProducts(products.filter(p => p.id !== product.id));
  };

  return (
    <div>
      <button disabled={ products.length >= 10} onClick={ create } >Create A New Product</button>
      <ul>
        {
          products.map( product => {
            return (
              <li>
                { product.name }
                <button onClick={ ()=> destroy(product)}>x</button>
              </li>
            );
          })
        }
      </ul>
      <h2>You have { products.length } Products</h2>
    </div>
  );

};


root.render(<App />);

