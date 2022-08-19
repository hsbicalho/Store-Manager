const express = require('express');
const bodyParser = require('body-parser');
const ProductsRouter = require('./routes/productsRoutes');
const SalesRouter = require('./routes/salesRoutes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
