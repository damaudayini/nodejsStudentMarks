const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const subject = require("../models/subjects");
const constants = require("../constants");

describe("Subjects API", () => {
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
    await subject.deleteMany({});
  });

  afterEach(async () => {
    await subject.deleteMany({});
  });

  describe("GET /subjects", () => {
    it("should get all subjects", async () => {
      const mockSubjects = [
        {
          subjectId: "MATH101",
          description: "Introduction to Mathematics",
        },
        {
          subjectId: "PHYS101",
          description: "Introduction to Physics",
        },
      ];
      jest.spyOn(subject, "find").mockResolvedValue(mockSubjects);

      const res = await request(app).get("/subjects");
      expect(res.statusCode).toEqual(200);
      expect(res.body.subjects).toHaveLength(2);
    });
  });

  describe("POST /subjects", () => {
    it("should create a new subject", async () => {
      const mockSubject = {
        subjectId: "MATH101",
        description: "Introduction to Mathematics",
      };
      jest.spyOn(subject, "create").mockResolvedValue(mockSubject);

      const res = await request(app).post("/subjects").send(mockSubject);
      expect(res.statusCode).toEqual(201);
      expect(res.body.subject.subjectId).toEqual("MATH101");
      expect(res.body.subject.description).toEqual("Introduction to Mathematics");
    });

    it("should return an error if subject already exists", async () => {
      const mockSubject = {
        subjectId: "MATH101",
        description: "Introduction to Mathematics",
      };
      jest.spyOn(subject, "findOne").mockResolvedValue(mockSubject);

      const res = await request(app).post("/subjects").send(mockSubject);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual(constants.SUBJECT_ALREADY_EXISTS);
    });
  });

  describe("PUT /subjects/:id", () => {
    it("should update a subject by id", async () => {
      const mockSubject = {
        _id: "123456",
        subjectId: "MATH101",
        description: "Introduction to Mathematics",
      };
      jest.spyOn(subject, "findById").mockResolvedValue(mockSubject);
      jest.spyOn(subject, "findByIdAndUpdate").mockImplementation((id, body) => {
        return { _id: id, ...body };
      });

      const res = await request(app)
        .put(`/subjects/${mockSubject._id}`)
        .send({ description: "Mathematics for Beginners" });
      expect(res.statusCode).toEqual(200);
      expect(res.body.subject.description).toEqual("Mathematics for Beginners");
    });

    it("should return an error if subject does not exist", async () => {
      jest.spyOn(subject, "findById").mockResolvedValue(null);

      const res = await request(app)
        .put(`/subjects/123456`)
        .send({ description: "Mathematics for Beginners" });
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual(constants.NO_SUBJECT_EXISTS);
    });
  });

  describe("DELETE /subjects/:id", () => {
    it("should delete a subject by id", async () => {
      const mockSubject = {
        _id: "123456",
        subjectId: "MATH101",
        description: "Introduction to Mathematics",
      };
      jest.spyOn(subject, "findById").mockResolvedValue(mockSubject);
      jest.spyOn(subject, "deleteOne").mockResolvedValue(mockSubject);

      const res = await request(app).delete(`/subjects/${mockSubject._id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.subject.subjectId).toEqual("MATH101");
      expect(res.body.subject.description).toEqual("Introduction to Mathematics");
    });

    it("should return an error if subject does not exist", async () => {
      jest.spyOn(subject, "findById").mockResolvedValue(null);

      const res = await request(app).delete(`/subjects/123456`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual(constants.NO_SUBJECT_EXISTS);
    });
  });
});