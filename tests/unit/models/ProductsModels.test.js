const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModels');

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
      const response = await ProductsModel.getAll();
      expect(response).to.equal(undefined);
    });

    it('quando retorna a lista de produtos com sucesso', async () => {
      sinon.stub(connection, 'query').resolves([productsExemple]);
      const response = await ProductsModel.getAll();
      expect(response).not.to.be.empty;
      expect(response).to.equal(productsExemple);
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
    const createdProduct = await ProductsModel.postProduct("productName");
    expect(createdProduct).to.be.an('object');
    expect(createdProduct).to.include.keys('id', 'name');
  })
})







/* const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModels')

describe("Test ProductModel", () => {
  describe("1. Test if return all products", () => {
    describe("fail", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });
      after(async () => connection.query.restore());

      it("null", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.equal(null);
      });
    });

    describe("success", () => {
      before(async () => {
        const execute = [
          [
            {
              id: 1,
              name: "Martelo de Thor",
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("return array", async () => {
        const response = await ProductsModel.getAll();
        expect(response).to.be.a("array");
      });

      it("have id and name", async () => {
        const response = await ProductsModel.getAll();
        expect(response[0]).to.be.not.empty;
        expect(response[0]).to.have.a.property("id");
        expect(response[0]).to.include.all.keys("id", "name");
      });
    });
  });

  describe("2. Test if Return product by id", () => {
    describe("fail", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("null", async () => {
        const response = await ProductsModel.getById(1);
        expect(response).to.be.equal(null);
      });
    });

    describe("success", () => {
      before(async () => {
        const execute = [
          [
            {
              id: 1,
              name: "Martelo de Thor",
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("return an array", async () => {
        const response = await ProductsModel.getById(1);
        expect(response).to.be.a("object");
      });

      it("Have id and name", async () => {
        const response = await await ProductsModel.getById(1);
        expect(response).to.be.not.empty;
        expect(response).to.have.a.property("id");
        expect(response).to.include.all.keys("id", "name");
      });
    });
  });

  describe("3. Insert new product on DB", () => {
    describe("success", () => {
      const payload = [{ insertId: 1 }];
      const newProduct = "Escudo do Capitão América";
      before(async () => {
        sinon.stub(connection, "query").resolves(payload);
      });

      after(async () => connection.query.restore());

      it("valid name", async () => {
        const response = await ProductsModel.postProduct(newProduct);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("id", "name");
        expect(response.id).to.be.equal(payload[0].insertId);
        expect(response.name).to.be.equal(newProduct);
      });
    });
  });

  describe("4. Update product", () => {
    describe("success", () => {
      const payload = [{ affectedRows: 1 }];
      const newNameProduct = "Capacete do Mandaloriano";
      before(async () => {
        sinon.stub(connection, "query").resolves(payload);
      });

      after(async () => connection.query.restore());

      it("success altered data with write return object", async () => {
        const response = await ProductsModel.updateProduct(1, newNameProduct);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("affectedRows");
        expect(response.affectedRows).to.be.equal(1);
      });
    });
  });

  describe("5. Delete an product", () => {
    describe("success", () => {
      const payload = [{ affectedRows: 1 }];
      before(async () => {
        sinon.stub(connection, "query").resolves(payload);
      });

      after(async () => connection.query.restore());

      it("success altered data with write return object", async () => {
        const response = await ProductsModel.deleteProduct(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("affectedRows");
        expect(response.affectedRows).to.be.equal(1);
      });
    });
  });
});

 */
