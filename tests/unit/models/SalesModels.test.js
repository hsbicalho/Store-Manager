const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModels');

describe('SALES - Testes de vendas: getAllSales e getSalesById', () => {
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
      const response = await SalesModel.getAllSales();
      expect(response).to.equal(undefined);
    });

    it('quando retorna a lista de vendas com sucesso', async () => {
      sinon.stub(connection, 'query').resolves([getAllExemple]);
      const response = await SalesModel.getAllSales();
      expect(response).not.to.be.empty;
      expect(response).to.equal(getAllExemple);
    });
  });

  describe('testa getById', () => {
    it('quando não existe uma venda com o ID informado', async () => {
      sinon.stub(connection, 'query').resolves([[]]);
      const response = await SalesModel.getSalesById(999);
      expect(response).to.equal(null);
    });

    it('quando existe uma venda com o ID informado', async () => {
      sinon.stub(SalesModel, 'getSalesById').resolves(getByIdExemple);
      const response = await SalesModel.getSalesById(1);
      console.log('response ---->', response)
      expect(response).not.to.be.empty;
      expect(response).to.equal(getByIdExemple);
    });
  });
});

describe('Testa método create de Model', () => {
  beforeEach(sinon.restore);
  it('quando a venda é inserida com sucesso', async () => {
    sinon.stub(connection, 'query').resolves({ productId: 3, quantity: 15 });
    const saleProduct = { saleId: 1, productId: 3, quantity: 15 };
    const createdProduct = await SalesModel.postSalesProducts(saleProduct);
    expect(createdProduct).to.be.an('object');
    expect(createdProduct).to.include.keys('productId', 'quantity');
  });

  it('testa método createSale de salesModel', async () => {
    sinon.stub(connection, 'query').resolves([{ id: 1 }]);
    const createSale = await SalesModel.postSales();
    expect(createSale).not.to.be.empty;
    expect(createSale).to.include.keys('id');
  })
})













/* const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../models/connection");
const SalesModel = require("../../../models/SalesModels");

describe("Tests SalesModel", () => {
  describe("1. Insert new sale", () => {

    describe("success", () => {
      const execute = [{ insertId: 1 }];
      before(async () => {
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("number id", async () => {
        const response = await SalesModel.postSales();
        expect(response).to.be.a("number");
        expect(response).to.be.equal(execute[0].insertId);
      });
    });
  });

  describe("2. Insert new Sale_Product", () => {
    const payload = { productId: 1, quantity: 12 };
    describe("success", () => {
      before(async () => {
        const execute = [];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("success", async () => {
        const response = await SalesModel.postSalesProducts(1, payload);
        expect(response).to.be.a("object");
        expect(response.message).to.be.equal(
          "Insert into Sales_product was a sucess"
        );
      });
    });
  });

  describe("3. Return new Sales", () => {
    describe("caso de falha", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("retorna null", async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.equal(null);
      });
    });

    describe("success", () => {
      before(async () => {
        const execute = [
          [
            {
              saleId: 1,
              date: "2021-09-09T04:54:29.000Z",
              productId: 1,
              quantity: 2,
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("return array", async () => {
        const response = await SalesModel.getAllSales();
        expect(response).to.be.a("array");
      });

      it("Have the element on DB", async () => {
        const response = await SalesModel.getAllSales();
        expect(response[0]).to.be.not.empty;;
        expect(response[0]).to.include.all.keys(
          "saleId",
          "date",
          "productId",
          "quantity"
        );
      });
    });
  });

  describe("4. Return all Sales elements", () => {
    describe("caso de falha", () => {
      before(async () => {
        const execute = [[]];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("return null", async () => {
        const response = await SalesModel.getSalesById(1);
        expect(response).to.be.equal(null);
      });
    });

    describe("success", () => {
      before(async () => {
        const execute = [
          [
            {
              saleId: 1,
              date: "2021-09-09T04:54:29.000Z",
              productId: 1,
              quantity: 2,
            },
          ],
        ];
        sinon.stub(connection, "query").resolves(execute);
      });

      after(async () => connection.query.restore());

      it("return an array", async () => {
        const response = await SalesModel.getSalesById(1);
        expect(response).to.be.a("array");
      });

      it("Have the element on the DB", async () => {
        const response = await SalesModel.getSalesById(1);
        expect(response[0]).to.be.not.empty;
        expect(response[0]).to.include.all.keys(
          "saleId",
          "date",
          "productId",
          "quantity"
        );
      });
    });
  });

  describe("5. Delete an sale", () => {
    describe("caso de sucesso", () => {
      const payload = [{ affectedRows: 1 }];
      before(async () => {
        sinon.stub(connection, "query").resolves(payload);
      });

      after(async () => connection.query.restore());

      it("delete dada returning right element", async () => {
        const response = await SalesModel.deleteSale(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("affectedRows");
        expect(response.affectedRows).to.be.equal(1);
      });
    });
  });

  describe("6. Update a sale", () => {
    describe("caso de sucesso", () => {
      const payload = [{ affectedRows: 1 }];
      before(async () => {
        sinon.stub(connection, "query").resolves(payload);
      });

      after(async () => connection.query.restore());

      it("Update DB", async () => {
        const response = await SalesModel.updateSale(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("affectedRows");
        expect(response.affectedRows).to.be.equal(1);
      });
    });
  });

});

 */
