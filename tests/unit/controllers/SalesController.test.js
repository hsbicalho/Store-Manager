const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesController = require("../../../controllers/salesController");

describe("Tests on SalesController", () => {
  describe("1. Return sale", () => {
    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 400, message: '"productId" is required' };

      before(async () => {
        request.body = [{ quantity: 1 }];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "postSales").resolves(payload);
      });

      after(async () => SalesService.postSales.restore());

      it("code and message", async () => {
        await SalesController.postSales(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });

    });

    describe("success", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 201,
        data: {
          id: 3,
          itemsSold: [{
            productId: 1,
            quantity: 1,
          }],
        },
      };

      before(async () => {
        request.body = [{ productId: 1, quantity: 1 }];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "postSales").resolves(payload);
      });

      after(async () => SalesService.postSales.restore());

      it("status 201", async () => {
        await SalesController.postSales(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("sale object", async () => {
        await SalesController.postSales(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("2. sale data", () => {
    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Sale not found" };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getAllSales").resolves(payload);
      });

      after(async () => SalesService.getAllSales.restore());

      it("code and message", async () => {
        await SalesController.getAllSales(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("success", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 200,
        data: [
          {
            saleId: 1,
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
        ],
      };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getAllSales").resolves(payload);
      });

      after(async () => SalesService.getAllSales.restore());

      it("status 200", async () => {
        await SalesController.getAllSales(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("sale array", async () => {
        await SalesController.getAllSales(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });

  });

  describe("3. Return sale by id", () => {
    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Sale not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getSalesById").resolves(payload);
      });

      after(async () => SalesService.getSalesById.restore());

      it("code and message", async () => {
        await SalesController.getSalesById(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("success", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 200,
        data: [
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2,
          },
        ],
      };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "getSalesById").resolves(payload);
      });

      after(async () => SalesService.getSalesById.restore());

      it("status 200", async () => {
        await SalesController.getSalesById(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("é retornado um array de produtos", async () => {
        await SalesController.getSalesById(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("5. Delete a sale", () => {
    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Sale not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "deleteSale").resolves(payload);
      });

      after(async () => SalesService.deleteSale.restore());

      it("code and message", async () => {
        await SalesController.deleteSales(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("success", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 204,
        data: { id: 1 },
      };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "deleteSale").resolves(payload);
      });

      after(async () => SalesService.deleteSale.restore());

      it("status 204", async () => {
        await SalesController.deleteSale(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });
    });
  });

   describe("6. Update a sale", () => {
     describe("fail", () => {
       const request = {};
       const response = {};
       let next = () => {};
       const payload = { code: 404, message: "Sale not found" };

       before(async () => {
         request.params = { id: 1 };
         request.body = [{ productId: 999, quantity: 28 }];
         response.status = sinon.stub().returns(response);
         response.json = sinon.stub().returns();
         next = sinon.stub().returns();
         sinon.stub(SalesService, "updateSale").resolves(payload);
       });

       after(async () => SalesService.updateSale.restore());

       it("code and message", async () => {
         await SalesController.updateSale(request, response, next);
         expect(next.calledWith(payload)).to.be.true;
       });
     });

     describe("success", () => {
       const request = {};
       const response = {};
       let next = () => {};
       const payload = {
         code: 200,
         data: {
           saleId: 1,
           itemsUpdated: [
            {
              productId: 1,
              quantity: 28,
            },
           ],
         },
       };

      before(async () => {
        request.params = { id: 1 };
        request.body = [{ productId: 1, quantity: 28 }];
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(SalesService, "updateSale").resolves(payload);
      });

      after(async () => SalesService.updateSale.restore());

      it("status 200", async () => {
        await SalesController.updateSale(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("updated sale array", async () => {
        await SalesController.updateSale(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
     });
   });
});
