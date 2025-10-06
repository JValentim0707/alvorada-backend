// tests/favorites.test.ts
import request from "supertest";
import express from "express";
import favoritesRouter from "../routes/favorites";
import * as favoritesModel from "../model/favorites";

// Monta um app de teste apenas com a rota
const app = express();
app.use(express.json());
app.use("/api/favorites", favoritesRouter);

// Mock simples das funções do model
jest.mock("../model/favorites");
const mockedFavorites = favoritesModel as jest.Mocked<typeof favoritesModel>;

describe("Favorites routes (only route behavior)", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ================= POST /api/favorites =================
  it("POST /api/favorites should return 200 on success", async () => {
    mockedFavorites.addFavoriteBreed.mockResolvedValueOnce(undefined);

    const res = await request(app)
      .post("/api/favorites")
      .send({ breed: "bulldog" });

    expect(res.status).toBe(200);
    expect(res.text).toBe("Success");
  });

  it("POST /api/favorites should return 500 if model throws", async () => {
    mockedFavorites.addFavoriteBreed.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app)
      .post("/api/favorites")
      .send({ breed: "bulldog" });

    expect(res.status).toBe(500);
  });

  // ================= GET /api/favorites =================
  it("GET /api/favorites should return an array of strings", async () => {
    mockedFavorites.getAllFavoriteBreeds.mockResolvedValueOnce(["bulldog", "poodle"]);

    const res = await request(app).get("/api/favorites");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((breed: any) => expect(typeof breed).toBe("string"));
  });

  it("GET /api/favorites should return 500 if model throws", async () => {
    mockedFavorites.getAllFavoriteBreeds.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).get("/api/favorites");

    expect(res.status).toBe(500);
  });

  // ================= DELETE /api/favorites/:breed =================
  it("DELETE /api/favorites/:breed should return 200 on success", async () => {
    mockedFavorites.removeFavoriteBreed.mockResolvedValueOnce(undefined);

    const res = await request(app).delete("/api/favorites/bulldog");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Success");
  });

  it("DELETE /api/favorites/:breed should return 500 if model throws", async () => {
    mockedFavorites.removeFavoriteBreed.mockRejectedValueOnce(new Error("DB error"));

    const res = await request(app).delete("/api/favorites/bulldog");

    expect(res.status).toBe(500);
  });

});
