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

  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: create,
        disabled: products.length >= 10
      },
      'Create A New Product'
    ),
    React.createElement(
      'ul',
      null,
      products.map( product => {
        return React.createElement(
          'li',
          { key: product.id },
          product.name,
          React.createElement(
            'button',
            {
              onClick: ()=> {
                destroy(product)
              }
            },
            'x'
          )
        )
      })
    ),
    React.createElement('h2', null, `You are ${products.length} products`)
  );
};


root.render(React.createElement(App));

