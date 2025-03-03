import app from "../src/app"
import request from "supertest"
import mongoose from 'mongoose';
import { mongoServer } from '../src/config/dbconnection';

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("POST /api/events", () => {
    test("It should respond with status 201 and correct response", async () => {
        const response = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00:00",
                Description: "Test Description",
                Location: "Test Location"
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Event created");
        expect(response.body.data).toBeInstanceOf(Object);
    });

});

describe("GET /api/events", () => {
    test("It should respond with status 200 and correct response", async () => {
        const response = await request(app).get("/api/events");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Events retrieved");
        expect(response.body.data).toBeInstanceOf(Array);
    });
});

describe("GET /api/event/:eventId", () => {
    test("It should respond with status 200 and correct response", async () => {
        const event = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00:00",
                Description: "Test Description",
                Location: "Test Location"
            });
        
        const response = await request(app).get(`/api/event/${event.body.data._id.toString()}`);	
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Event found");
        expect(event.body.data._id.toString()).toBe(response.body.data._id);
    });
});

describe("PUT /api/event/:eventId", () => {
    test("It should respond with status 200 and correct response", async () => {
        const event = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00:00",
                Description: "Test Description",
                Location: "Test Location"
            });
        const response = await request(app)
            .put(`/api/event/${event.body.data._id.toString()}`)
            .send({
                TitleEvent: "Updated Test Event"
            });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Event updated");
        expect(response.body.data.TitleEvent).toBe("Updated Test Event");
    });
});

describe("DELETE /api/event/:eventId", () => {
    test("It should respond with status 200 and correct response", async () => {
        const event = await request(app)
            .get("/api/events");
        for (let i = 0; i < event.body.data.length; i++) {
            const response = await request(app)
                .delete(`/api/event/${event.body.data[i]._id.toString()}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Event deleted");
        }
    });
});

