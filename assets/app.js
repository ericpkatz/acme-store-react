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


  console.log('hello');
  return React.createElement(
    'ul',
    null,
    products.map( product => {
      return React.createElement(
        'li',
        { key: product.id },
        product.name
      )
    })
    
  );
};


root.render(React.createElement(App));

