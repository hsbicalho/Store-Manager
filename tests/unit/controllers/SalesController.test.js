const sinon = require('sinon');
const { expect } = require('chai');
const SalesService = require('../../../services/salesService');
const SalesController = require('../../../controllers/salesController');

describe('MODEL Testes de controller: GetAll e GetById', () => {
  beforeEach(sinon.restore);
  const response = {};
  const request = {};

  describe('testa getAll', () => {
    const getAllExemple = [
	{
		"saleId": 2,
		"date": "2022-08-12T19:14:18.000Z",
		"productId": 3,
		"quantity": 15
	}
]
    it('retorna a lista de vendas', async () => {
      sinon.stub(SalesService, 'getAllSales').resolves(getAllExemple);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await SalesController.getAllSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(getAllExemple)).to.be.equal(true);
    });
  });

  describe('MODEL testa getSalesById', () => {
    const getByIdExemple = [
	{
		"date": "2022-08-12T19:14:18.000Z",
		"productId": 3,
		"quantity": 15
	}
]
    it('quando existe um produto com o ID informado', async () => {
      sinon.stub(SalesService, 'getSalesById').resolves(getByIdExemple);
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      await SalesController.getSalesById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
