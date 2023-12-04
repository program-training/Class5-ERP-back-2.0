import ServerError from "../../utils/serverErrorClass";
import { productMock, productKeys } from "../helpers/mocks";
import {
  addQuantityToProducts,
  getProductById,
  getProductsBySearch,
  updateProductsById,
} from "./productsService";

const ID = "123";
const NUM_ID = 123;


describe("getProductById function", () => {

    const mockGetProductByIdFromDb = jest.fn();

    beforeEach(() => {
      mockGetProductByIdFromDb.mockReset();    
    });

    it('should throw error if id is not number', async () => { 
      await expect(getProductById('abc')).rejects.toThrow(ServerError);
    });

    it('should reject with error from db', async () => { 
      const errorMessage = "product not found";
      mockGetProductByIdFromDb.mockRejectedValue(new Error(errorMessage));

      await expect(getProductById(123452345)).rejects.toThrow(errorMessage);
    });

    it('should resolve with product on success', async () => {
      
      mockGetProductByIdFromDb.mockResolvedValue(productMock);
      const result = await getProductById(123);
      expect(result).toEqual(productMock);
    });

    it("test with number:", async () => {  
      const result = await getProductById(NUM_ID);
      expect(Object.keys(result)).toEqual(productKeys);
    });
});

describe("getProductsBySearch function", () => {
  it("return search item", async () => {
    const searchText = "shirt";
    const result = await getProductsBySearch(searchText);
    const toCheck = result[0].name + result[0].category + result[0].description;
    expect(toCheck).toContain(searchText);
  });
});

describe("updateProductsById function", () => {
  test("return proper response", async () => {
    const testReq = [
      {
        productId: ID,
        requiredQuantity: 1,
      },
    ];
    const result = await updateProductsById(testReq);
    expect(Object.keys(result)).toEqual(["inStock", "notInStock"]);
  });
});

describe("addQuantityToProducts function", () => {
  test("add quantity to products", async () => {
    const prevQuantity = (await getProductById(ID)).quantity;
    const requiredQuantity = 1;

    const testReq = [
      {
        productId:ID,
        requiredQuantity,
      },
    ];

    await addQuantityToProducts(testReq);
    const currentQuantity = (await getProductById(ID)).quantity;
    const result = currentQuantity - prevQuantity;

    expect(result).toEqual(requiredQuantity);
  });
});
