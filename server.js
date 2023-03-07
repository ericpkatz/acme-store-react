const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_store_react_db');

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
  }
});

const express = require('express');
const app = express();
const path = require('path');

app.use('/assets', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await Product.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    await Promise.all(
      ['foo', 'bar', 'bazz', 'quq'].map( name => Product.create({ name }))
    );
    console.log('data seeded');
  }
  catch(ex){
    console.log(ex);
  }
});
