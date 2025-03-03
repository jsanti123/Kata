import app from "../src/app"
import request from "supertest"
import mongoose from 'mongoose';
import { mongoServer } from '../src/config/dbconnection';

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("POST /api/event", () => {
    test("It should respond with status 201 and correct response", async () => {
        const response = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00",
                Description: "Test Description",
                Location: "Test Location"
            });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Event created");
        expect(response.body.data).toBeInstanceOf(Object);
    });

    test("It should respond with status 400 and correct response", async () => {
        const response = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00",
                Description: "Test Description"
            });
        expect(response.status).toBe(400);
        expect(response.body.message.message).toBe("Invalid Fields");

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
                DateEvent: "2022-01-01T00:00",
                Description: "Test Description",
                Location: "Test Location"
            });
        
        const response = await request(app).get(`/api/event/${event.body.data._id.toString()}`);	
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Event found");
        expect(event.body.data._id.toString()).toBe(response.body.data._id);
    });

    test("It should respond with status 404 and correct response", async () => {
        const response = await request(app).get("/api/event/123");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Event not found");
    });
});

describe("PUT /api/event/:eventId", () => {
    test("It should respond with status 200 and correct response", async () => {
        const event = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00",
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

    test("It should respond with status 400 and correct response", async () => {
        const event = await request(app)
            .post("/api/event")
            .send({
                TitleEvent: "Test Event",
                DateEvent: "2022-01-01T00:00",
                Description: "Test Description",
                Location: "Test Location"
            });
        const response = await request(app)
            .put(`/api/event/${event.body.data._id.toString()}`)
            .send({
                TitleEvent: ""
            });
        expect(response.body.status).toBe(500);
        expect(response.body.message).toBe("Error updating event");
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

    test("It should respond with status 404 and correct response", async () => {
        const response = await request(app).delete("/api/event/123");
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Event not found");
    });
});

