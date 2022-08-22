const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModels');
const ProductsService = require('../../../services/productsService');
const { expect } = chai;

describe('Testes de product: GetAll e GetById', () => {
const productsExemple = [
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
  beforeEach(sinon.restore);

  describe('testa getAll', () => {
    it('quando retorna null', async () => {
      sinon.stub(connection, 'query').resolves([]);
      const response = await ProductsService.getAll();
      expect(response).to.equal(undefined);
    });

    it('quando retorna a lista de produtos com sucesso', async () => {
      sinon.stub(connection, 'query').resolves([productsExemple]);
      const response = await ProductsService.getAll();
      expect(response).not.to.be.empty;
      expect(response).to.equal(productsExemple);
    });
  });

  describe('testa getById', () => {
    it('quando não existe um produto com o ID informado', async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await ProductsModel.getById(999);
      expect(response).to.equal(null);
    });

    it('quando existe um produto com o ID informado', async () => {
      sinon.stub(ProductsModel, 'getById').resolves({ id: 1, name: "Martelo de Thor" });
      const response = await ProductsService.getById(1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
      expect(response).to.include.keys('id', 'name');
    })
  })
})
