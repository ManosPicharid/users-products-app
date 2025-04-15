import mongoose from "mongoose";
import request from "supertest";
import * as authService from "../services/auth.services.js"
import * as userService from "../services/user.services.js"
import app from "../app.js";

// Connecting to MongoDB before each test
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(
      () => { console.log("Connection to MongoDB established for Jest") },
      err => { console.log("Failed to connect to MongoDB for Jest", err) }
    );
});

// Close connection to MongoDB
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Requests for /api/users", () => {
  let token;
  beforeAll(() => {
    let user = {
      username: "testadmin",
      email: "test2@aueb.gr",
      roles: ["ADMIN"]
    };
    token = authService.generateAccessToken(user);
  });

  it('GET Returns all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.length).toBeGreaterThan(0);
  }, 50000);

  it("POST Creates a user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        "username": "test5",
        "password": "12345",
        "name": "test5 name",
        "surname": "test5 surname",
        "email": "test5@aueb.gr",
        "address": {
          "area": "area1",
          "road": "road5"
        }
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
  }, 50000)

  it("POST Creates a user with existing username", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        "username": "test5",
        "password": "12345",
        "name": "new name",
        "surname": "new surname",
        "email": "test5new@aueb.gr",
        "address": {
          "area": "area1",
          "road": "road5"
        }
      })

    expect(res.statusCode).toBe(400);
    expect(res.body.status).not.toBeTruthy()
  }, 50000)

  it("POST Creates a user with existing email", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        "username": "test6",
        "password": "12345",
        "name": "new name",
        "surname": "new surname",
        "email": "test5@aueb.gr",
        "address": {
          "area": "area1",
          "road": "road5"
        }
      })

    expect(res.statusCode).toBe(400);
    expect(res.body.status).not.toBeTruthy()
  }, 50000)

  it("POST Creates a user with empty name, surname, password", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        "username": "test6",
        "password": "",
        "name": "",
        "surname": "",
        "email": "test6@aueb.gr",
        "address": {
          "area": "area1",
          "road": "road5"
        }
      })

    expect(res.statusCode).toBe(400);
    expect(res.body.status).not.toBeTruthy()
  }, 50000)
});

describe("Requests for /api/users/:username", () => {
  let token;
  beforeAll(() => {
    let user = {
      username: "admin",
      email: "admin1@aueb.gr",
      roles: ["EDITOR","READER","ADMIN"]
    };
    token = authService.generateAccessToken(user);
  });

  it("Get returns specific user", async () => {
    const result = await userService.findLastInsertedUser();
    const res = await request(app)
      .get('/api/users/' + result.username)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBeTruthy();
    expect(res.body.data.username).toBe(result.username);
    expect(res.body.data.email).toBe(result.email);
  }, 50000)

  it("Update a user", async () => {
    const result = await userService.findLastInsertedUser();

    const res = await request(app)
      .patch("/api/users/" + result.username)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: result.username,
        name: "new updated name",
        surname: "new updated surname",
        email: "newupdated@aueb.gr",
        address: {
          area: "updatedArea",
          road: "updatedRoad"
        }
      })

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBeTruthy();
  }, 50000)

  it("DELETE delete a user", async () => {
    const result = await userService.findLastInsertedUser();
    
    const res = await request(app)
      .delete("/api/users/" + result.username)
      .set("Authorization", `Bearer ${token}`)

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBeTruthy();
  })
}, 50000)