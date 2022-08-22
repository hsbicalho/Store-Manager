const sinon = require("sinon");
const { expect } = require("chai");

const ProductsModel = require("../../../models/ProductsModels");
const SalesModel = require("../../../models/SalesModels");
const SalesService = require("../../../services/salesService");

describe("Testes no SalesService", () => {
  describe("1. Insere nova venda no Banco de Dados Sales", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(ProductsModel, "getById").resolves(null);
      });

      after(async () => ProductsModel.getById.restore());

      it("productId undefined => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.postSales([
          { quantity: 1 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"productId" is required');
      });

      it("quantity undefined => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.postSales([
          { productId: 1 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"quantity" is required');
      });

      it("quantity nulo => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.postSales([
          { productId: 1, quantity: 0 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(422);
        expect(response.message).to.be.equal(
          '"quantity" must be greater than or equal to 1'
        );
      });

      it("productId não criado => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.postSales([
          { productId: 5, quantity: 2 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Product not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = {
        code: 201,
        data: {
          id: 3,
          itemsSold: [
            {
              productId: 1,
              quantity: 1,
            },
          ],
        },
      };

      before(async () => {
        sinon.stub(ProductsModel, "getById").resolves(true);
        sinon.stub(SalesModel, "createSale").resolves(3);
        sinon
          .stub(SalesModel, "createSaleProduct")
          .resolves({ message: "Insert into Sales_product was a sucess" });
      });

      after(async () => {
        ProductsModel.getById.restore();
        SalesModel.postSalesProducts.restore();
        SalesModel.postSales.restore();
      });

      it("venda realizada com sucesso => codigo 201", async () => {
        const response = await SalesService.postSales(
          payload.data.itemsSold
        );
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(payload.code);
        expect(response.data).to.include.all.keys("id", "itemsSold");
        expect(response.data.id).to.be.equal(3);
        expect(response.data.itemsSold).to.be.a("array");
        expect(response.data.itemsSold).to.be.equal(payload.data.itemsSold);
      });
    });
  });

  describe("2. Retorna todos as vendas", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesModel, "getAllSales").resolves(null);
      });

      after(async () => SalesModel.getAllSales.restore());

      it("retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.getAllSales();
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
      ];

      before(async () => {
        sinon.stub(SalesModel, "getAllSales").resolves(payload);
      });

      after(async () => SalesModel.getAllSales.restore());

      it("retorna o array das sales", async () => {
        const response = await SalesService.getAllSales();
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(200);
        expect(response.data).to.be.equal(payload);
      });
    });
  });

  describe("3. Retorna todos as vendas especificando o id", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(null);
      });

      after(async () => SalesModel.getSalesById.restore());

      it("retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.getSalesById(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
      ];

      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(payload);
      });

      after(async () => SalesModel.getSalesById.restore());

      it("retorna o array das sales", async () => {
        const response = await SalesService.getSalesById(1);
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(200);
        expect(response.data).to.be.equal(payload);
      });
    });
  });

  describe("4. Deleta uma venda", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(null);
      });

      after(async () => SalesModel.getSalesById.restore());

      it("produto não existe => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.deleteSales(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });
    });

    describe("caso de sucesso", () => {
      const payload = {
        code: 204,
        data: { id: 1 },
      };
      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(true);
        sinon.stub(SalesModel, "deleteSales").resolves({});
      });

      after(async () => {
        SalesModel.getSalesById.restore();
        SalesModel.deleteSales.restore();
      });

      it("o produto é deletado", async () => {
        const response = await SalesService.deleteSales(1);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(payload.code);
        expect(response.data.id).to.be.equal(1);
      });
    });
  });

  describe("5. Atualiza uma venda", () => {
    describe("caso de falha", () => {
      before(async () => {
        sinon.stub(SalesModel, "getSalesById")
          .onFirstCall().resolves(null)
          .onCall().resolves(true);
      });

      after(async () => SalesModel.getSalesById.restore());

      it("produto não existe => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.updateSales(999, [{ productId: 1, quantity: 2 }]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(404);
        expect(response.message).to.be.equal("Sale not found");
      });

      it("quantidade invalida => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.updateSales(2, [{ productId: 1 }]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"quantity" is required');
      });

      it("productId invalida => retorna um objeto com as chaves code e message", async () => {
        const response = await SalesService.updateSales(2, [{ quantity: 1 }]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "message");
        expect(response.code).to.be.equal(400);
        expect(response.message).to.be.equal('"productId" is required');
      });
    });

    describe("caso de sucesso", () => {
      const payload = {
        code: 200,
        data: {
          saleId: 5,
          itemsUpdated: [
            {
              productId: 1,
              quantity: 28,
            },
          ],
        },
      };
      before(async () => {
        sinon.stub(SalesModel, "getSalesById").resolves(true);
        sinon.stub(SalesModel, "updateSales").resolves({});
      });

      after(async () => {
        SalesModel.getSalesById.restore();
        SalesModel.updateSales.restore();
      });

      it("o produto é atualizado", async () => {
        const response = await SalesService.updateSales(5, [
          { productId: 1, quantity: 28 },
        ]);
        expect(response).to.be.a("object");
        expect(response).to.include.all.keys("code", "data");
        expect(response.code).to.be.equal(payload.code);
        expect(response.data.saleId).to.be.equal(5);
      });
    });
  });
});
