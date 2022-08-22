const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModels');
const SalesService = require('../../../services/salesService');

describe('SALES SERVICE Testes de vendas: GetAll e GetById', () => {
 const getAllExemple = [
	{
		"saleId": 2,
		"date": "2022-08-12T19:14:18.000Z",
		"productId": 3,
		"quantity": 15
	}
]

const getByIdExemple = [
	{
		"date": "2022-08-12T19:14:18.000Z",
		"productId": 3,
		"quantity": 15
	}
]

  beforeEach(sinon.restore);

  describe('testa getAll', () => {
    it('quando retorna null', async () => {
      sinon.stub(connection, 'query').resolves([]);
      const response = await SalesService.getAllSales();
      expect(response).to.equal(undefined);
    });

    it('quando retorna a lista de produtos com sucesso', async () => {
      sinon.stub(connection, 'query').resolves([getAllExemple]);
      const response = await SalesService.getAllSales();
      expect(response).not.to.be.empty;
      expect(response).to.equal(getAllExemple);
    });
  });

  describe('SALES SERVICE testa getSalesById', () => {
    it('quando não existe um produto com o ID informado', async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await SalesModel.getSalesById(999);
      expect(response).to.equal(null);
    });

    it('quando existe um produto com o ID informado', async () => {
      sinon.stub(SalesModel, 'getSalesById').resolves(getByIdExemple);
      const response = await SalesService.getSalesById(1);
      expect(response).not.to.be.empty;
      expect(response).to.equal(getByIdExemple);
    })
  })
});
