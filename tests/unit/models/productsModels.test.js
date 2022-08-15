/* const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');
const productsMock = require('../helps/productsMock');

describe('Teste de endpoint getAll e getById', () => {
  beforeEach(sinon.restore);
  describe('testa getAll', () => {
    it('quando retorna null', async () => {
      sinon.stub(connection, 'query').resolves([]);
      const response = await ProductsModel.getAll();
      expect(response).to.equal(undefined);
    });

    it('quando retorna a lista de produtos com sucesso', async () => {
      sinon.stub(connection, 'query').resolves([fakeProducts]);
      const response = await ProductsModel.getAll();
      expect(response).not.to.be.empty;
      expect(response).to.equal(fakeProducts);
    });
  });
  describe('testa getById', () => {
    it('quando não existe um produto com o ID informado', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      const response = await ProductsModel.getById(999);
      expect(response).to.equal(null);
    });

    it('quando existe um produto com o ID informado', async () => {
      sinon.stub(ProductsModel, 'getById').resolves({ id: 1, name: "Martelo de Thor" });
      const response = await ProductsModel.getById(1);
      expect(response).to.be.an('object');
      expect(response).not.to.be.empty;
      expect(response).to.include.keys('id', 'name');
    });
  });
});

describe('Testa método create de Model', () => {
  beforeEach(sinon.restore);
  it('quando produto é inserido com sucesso', async () => {
    sinon.stub(connection, 'query').resolves([{ id: 1, name: "productName" }]);
    const createdProduct = await ProductsModel.create("productName");
    expect(createdProduct).to.be.an('object');
    expect(createdProduct).to.include.keys('id', 'name');
  })
})
 */
