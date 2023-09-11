const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const student = require("../models/students");

describe("Students API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await student.deleteMany({});
  });

  afterEach(async () => {
    await student.deleteMany({});
  });

  describe("POST /students", () => {
    it("should add a new student", async () => {
      const res = await request(app).post("/students").send({
        name: "John Doe",
        studentId: "123456",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.student.name).toEqual("John Doe");
      expect(res.body.student.studentId).toEqual("123456");
    });

    it("should return an error if student details are not provided", async () => {
      const res = await request(app).post("/students").send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Name and StudentId are mandatory");
    });

    it("should return an error if student already exists", async () => {
      await student.create({ name: "John Doe", studentId: "123456" });
      const res = await request(app).post("/students").send({
        name: "John Doe",
        studentId: "123456",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual("Student already exists with this id");
    });
  });

  describe("GET /students", () => {
    it("should get all students", async () => {
      await student.create({ name: "John Doe", studentId: "123456" });
      await student.create({ name: "Jane Doe", studentId: "789012" });
      const res = await request(app).get("/students");
      expect(res.statusCode).toEqual(200);
      expect(res.body.students.length).toEqual(2);
      expect(res.body.students[0].name).toEqual("John Doe");
      expect(res.body.students[0].studentId).toEqual("123456");
      expect(res.body.students[1].name).toEqual("Jane Doe");
      expect(res.body.students[1].studentId).toEqual("789012");
    });
  });

  describe("GET /students/:id", () => {
    it("should get a student by id", async () => {
      const newStudent = await student.create({ name: "John Doe", studentId: "123456" });
      const res = await request(app).get(`/students/${newStudent.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.student.name).toEqual("John Doe");
      expect(res.body.student.studentId).toEqual("123456");
    });

    it("should return an error if student does not exist", async () => {
      const res = await request(app).get(`/students/123456`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("No student exists with this id");
    });
  });

  describe("PUT /students/:id", () => {
    it("should update a student by id", async () => {
      const newStudent = await student.create({
        name: "John Doe",
        studentId: "123456",
      });
      const res = await request(app)
        .put(`/students/${newStudent.id}`)
        .send({ name: "Jane Doe" });
      expect(res.statusCode).toEqual(200);
      expect(res.body.student.name).toEqual("Jane Doe");
      expect(res.body.student.studentId).toEqual("123456");
    });

    it("should return an error if student does not exist", async () => {
      const res = await request(app)
        .put(`/students/123456`)
        .send({ name: "Jane Doe" });
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("No student exists with this id");
    });
  });

  describe("DELETE /students/:id", () => {
    it("should delete a student by id", async () => {
      const newStudent = await student.create({
        name: "John Doe",
        studentId: "123456",
      });
      const res = await request(app).delete(`/students/${newStudent.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.student.name).toEqual("John Doe");
      expect(res.body.student.studentId).toEqual("123456");
    });

    it("should return an error if student does not exist", async () => {
      const res = await request(app).delete(`/students/123456`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual("No student exists with this id");
    });
  });
});