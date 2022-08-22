const sinon = require('sinon');
const { expect } = require('chai');
const ProductsService = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');
const products = [
	{
		"id": 1,
		"name": "Martelo de Thor"
	},
	{
		"id": 2,
		"name": "Traje de encolhimento"
	},
	{
		"id": 3,
		"name": "Escudo do Capitão América"
	}
]
describe('Testes de controller: GetAll e GetById', () => {
  beforeEach(sinon.restore);
  const response = {};
  const request = {};

  describe('testa getAll', () => {
    it('retorna a lista de produtos', async () => {
      sinon.stub(ProductsService, 'getAll').resolves(products);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await ProductsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });

  describe('testa getById', () => {
    it('quando não existe um produto com o ID informado', async () => {
      request.params = { id: 1 }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'getById').resolves(null);

      await ProductsController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });

    it('quando existe um produto com o ID informado', async () => {
      sinon.stub(ProductsService, 'getById').resolves({ id: 1, name: "Martelo de Thor" });
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await ProductsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(false);
    });
  });
});
