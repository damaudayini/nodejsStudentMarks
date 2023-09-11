const request = require("supertest");
const app = require("../../server");
const studentMarks = require("../models/studentMarks");
const student = require("../models/students");
const subject = require("../models/subjects");

jest.mock("../models/studentMarks");
jest.mock("../models/students");
jest.mock("../models/subjects");

describe("studentMarks API", () => {
  describe("POST /students/marks/123", () => {
    it("should create student marks and return 201 status code", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      const mockExistingSubject = {
        _id: "456",
        name: "Maths",
        teacher: "Jane Smith",
      };
      const mockCreatedMarks = {
        _id: "789",
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(mockExistingSubject);
      studentMarks.findOne.mockResolvedValue(null);
      studentMarks.create.mockResolvedValue(mockCreatedMarks);

      const response = await request(app)
        .post("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(201);
      expect(response.body.studentMarks).toEqual(mockCreatedMarks);
    });

    it("should return 400 status code if subject marks details are not provided", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
      };

      const response = await request(app)
        .post("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("StudentId, Subject & Marks are mandatory");
    });

    it("should return 404 status code if student does not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      student.findById.mockResolvedValue(null);

      const response = await request(app)
        .post("/students/marks/456")
        .send(mockReqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No student exists with this id");
    });

    it("should return 404 status code if subject does not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No such subject exists");
    });

    it("should return 400 status code if student marks already exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      const mockExistingSubject = {
        _id: "456",
        name: "Maths",
        teacher: "Jane Smith",
      };
      const mockExistingMarks = {
        _id: "789",
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(mockExistingSubject);
      studentMarks.findOne.mockResolvedValue(mockExistingMarks);

      const response = await request(app)
        .post("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Student marks already exists for the specified subject");
    });
  });

  describe("PUT /students/marks/:id", () => {
    it("should update student marks and return 200 status code", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 90,
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      const mockExistingSubject = {
        _id: "456",
        name: "Maths",
        teacher: "Jane Smith",
      };
      const mockExistingMarks = {
        _id: "789",
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      const mockUpdatedMarks = {
        _id: "789",
        studentId: "123",
        subjectId: "456",
        marks: 90,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(mockExistingSubject);
      studentMarks.findOne.mockResolvedValue(mockExistingMarks);
      studentMarks.findOneAndUpdate.mockResolvedValue(mockUpdatedMarks);

      const response = await request(app)
        .put("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(200);
      expect(response.body.studentMarks).toEqual(mockUpdatedMarks);
    });

    it("should return 400 status code if subject marks details are not provided", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
      };

      const response = await request(app)
        .put("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("StudentId, Subject & Marks are mandatory");
    });

    it("should return 404 status code if student does not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 90,
      };
      student.findById.mockResolvedValue(null);

      const response = await request(app)
        .put("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No student exists with this id");
    });

    it("should return 404 status code if subject does not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 90,
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No such subject exists");
    });

    it("should return 400 status code if student marks do not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
        marks: 90,
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      const mockExistingSubject = {
        _id: "456",
        name: "Maths",
        teacher: "Jane Smith",
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(mockExistingSubject);
      studentMarks.findOne.mockResolvedValue(null);

      const response = await request(app)
        .put("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("No student marks exist for the specified subject");
    });
  });

  describe("DELETE /students/marks/:id", () => {
    it("should delete student marks and return 200 status code", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      const mockExistingSubject = {
        _id: "456",
        name: "Maths",
        teacher: "Jane Smith",
      };
      const mockExistingMarks = {
        _id: "789",
        studentId: "123",
        subjectId: "456",
        marks: 80,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(mockExistingSubject);
      studentMarks.findOne.mockResolvedValue(mockExistingMarks);
      studentMarks.deleteOne.mockResolvedValue(mockExistingMarks);

      const response = await request(app)
        .delete("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(200);
      expect(response.body.studentMarks).toEqual(mockExistingMarks);
    });

    it("should return 400 status code if student subject details are not provided", async () => {
      const mockReqBody = {
        studentId: "123",
      };

      const response = await request(app)
        .delete("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("StudentId, SubjectId are mandatory");
    });

    it("should return 404 status code if student does not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
      };
      student.findById.mockResolvedValue(null);

      const response = await request(app)
        .delete("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No student exists with this id");
    });

    it("should return 404 status code if subject does not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(null);

      const response = await request(app)
        .delete("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No such subject exists");
    });

    it("should return 400 status code if student marks do not exist", async () => {
      const mockReqBody = {
        studentId: "123",
        subjectId: "456",
      };
      const mockExistingStudent = {
        _id: "123",
        name: "John Doe",
        age: 20,
      };
      const mockExistingSubject = {
        _id: "456",
        name: "Maths",
        teacher: "Jane Smith",
      };
      student.findById.mockResolvedValue(mockExistingStudent);
      subject.findOne.mockResolvedValue(mockExistingSubject);
      studentMarks.findOne.mockResolvedValue(null);

      const response = await request(app)
        .delete("/students/marks/123")
        .send(mockReqBody);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("No student marks exist for the specified subject");
    });
  });
});