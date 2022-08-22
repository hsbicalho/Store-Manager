const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require('../../../services/productsService');
const ProductsController = require("../../../controllers/productsController");

describe("Tests on ProductsService", () => {
  describe("1. Return all products", () => {
    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Product not found" };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getAll").resolves(payload);
      });

      after(async () => ProductsService.getAll.restore());

      it("error with code and message", async () => {
        await ProductsController.getAll(request, response, next);
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
            id: 1,
            name: "Martelo de Thor",
          },
        ],
      };

      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getAll").resolves(payload);
      });

      after(async () => ProductsService.getAll.restore());

      it("status 200", async () => {
        await ProductsController.getAll(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it('products array', async () => {
        await ProductsController.getAll(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("2. Product By ID", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Product not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getById").resolves(payload);
      });

      after(async () => ProductsService.getById.restore());

      it("error with code and message", async () => {
        await ProductsController.getById(request, response, next);
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
            id: 1,
            name: "Martelo de Thor",
          },
       };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "getById").resolves(payload);
       });

       after(async () => ProductsService.getById.restore());

       it("status  200", async () => {
        await ProductsController.getById(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
       });

       it("products array", async () => {
        await ProductsController.getById(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
       });
    });
  });

  describe("3. Insert new product on DB", () => {

    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 400, message: '"name" is required' };

      before(async () => {
        request.body = { name: 'algo' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "postProduct").resolves(payload);
      });

      after(async () => ProductsService.postProduct.restore());

      it("error with code and message", async () => {
        await ProductsController.postProduct(request, response, next);
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
          id: 1,
          name: "Escudo do Capitão América",
        },
      };

      before(async () => {
        request.body = { name: "Escudo do Capitão América" };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "postProduct").resolves(payload);
      });

      after(async () => ProductsService.postProduct.restore());

      it("status 201", async () => {
        await ProductsController.postProduct(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("products array", async () => {
        await ProductsController.postProduct(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("4.Update product", () => {
    describe("fail", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Product not found" };

      before(async () => {
        request.params = { id: 1 };
        request.body = { name: "" };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "updateProduct").resolves(payload);
      });

      after(async () => ProductsService.updateProduct.restore());

      it("error with code and message", async () => {
        await ProductsController.updateProduct(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });
    describe("success", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = {
        code: 200,
        data: { id: 1, name: "Capacete do Mandaloriano" },
      };

      before(async () => {
        request.params = { id: 1 };
        request.body = { name: "Capacete do Mandaloriano" };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "updateProduct").resolves(payload);
      });

      after(async () => ProductsService.updateProduct.restore());

      it("status 200", async () => {
        await ProductsController.updateProduct(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

      it("updated object", async () => {
        await ProductsController.updateProduct(request, response, next);
        expect(response.json.calledWith(payload.data)).to.be.true;
      });
    });
  });

  describe("5. Delete an product", () => {
    describe("caso de falha", () => {
      const request = {};
      const response = {};
      let next = () => {};
      const payload = { code: 404, message: "Product not found" };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "deleteProduct").resolves(payload);
      });

      after(async () => ProductsService.deleteProduct.restore());

      it("error with code and message", async () => {
        await ProductsController.deleteProduct(request, response, next);
        expect(next.calledWith(payload)).to.be.true;
      });
    });

    describe("success", () => {
      const request = {};
      const response = {};
      let next = () => { };
      const payload = {
        code: 204,
        data: { id: 1 },
      };

      before(async () => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        next = sinon.stub().returns();
        sinon.stub(ProductsService, "deleteProduct").resolves(payload);
      });

      after(async () => ProductsService.deleteProduct.restore());

      it("status 204", async () => {
        await ProductsController.deleteProduct(request, response, next);
        expect(response.status.calledWith(payload.code)).to.be.true;
      });

    });
  });
});
