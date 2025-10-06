// tests/breeds.test.ts
import request from "supertest";
import app from "../routes/index"; // mantém import do app
import api from "../config/api";

jest.mock("../config/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("Breeds routes", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /api/breeds should return a list of breeds", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        message: ["bulldog", "retriever"],
        status: "success"
      }
    });

    const res = await request(app).get("/api/breeds");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true); // garante que é um array
    res.body.forEach((breed: any) => {
      expect(typeof breed).toBe("string"); // garante que cada item é string
    });
  });

  it("GET /api/breeds/:breed/images should return 3 valid bulldog image URLs", async () => {
    const breed = "bulldog";
    
    const mockImages = [
      "https://images.dog.ceo/breeds/bulldog-english/murphy.jpg",
      "https://images.dog.ceo/breeds/bulldog-french/n02108915_4303.jpg",
      "https://images.dog.ceo/breeds/bulldog-french/n02108915_7115.jpg"
    ];

    mockedApi.get.mockResolvedValueOnce({
      data: {
        message: mockImages,
        status: "success"
      }
    });

    const res = await request(app).get(`/api/breeds/${breed}/images`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);

    // Valida se cada item é uma URL válida do dog.ceo
    res.body.forEach((url: string) => {
      expect(typeof url).toBe("string");
      expect(url).toMatch(/^https:\/\/images\.dog\.ceo\/breeds\/[a-z-]+\/.+\.(jpg|jpeg|png)$/);
    });

    expect(mockedApi.get).toHaveBeenCalledWith(`/breed/${breed}/images/random/3`);
  });

  it("GET /api/breeds should handle API errors", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("API error"));

    const res = await request(app).get("/api/breeds");

    expect(res.status).toBe(500);
  });

});
