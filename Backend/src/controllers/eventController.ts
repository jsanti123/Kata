import e, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Event } from '../models/Event';
import { EventData, successResponse, errorResponse } from '../utils/response';

export class EventController {
    async createEvent(req: Request, res: Response) {
        try {
            const { TitleEvent, DateEvent, Description, Location } = req.body;
            const event = new Event({
                TitleEvent,
                DateEvent: new Date(DateEvent+':00Z'),
                Description,
                Location
            });
            await event.save();
            const data: EventData = {
                _id: event.id,
                TitleEvent,
                DateEvent: new Date(DateEvent+':00Z'),
                Description,
                Location
            }
            res.status(StatusCodes.CREATED).send(successResponse(data, 'Event created'));
            
        }catch(error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse('Error creating event', []));
            console.log(error);
        }
    }

    async getEvents(req: Request, res: Response) {
        try {
            const events = await Event.find();
            const data: EventData[] = events.map(event => {
                return {
                    _id: event.id,
                    TitleEvent: event.TitleEvent,
                    DateEvent: event.DateEvent,
                    Description: event.Description,
                    Location: event.Location
                }
            });
            res.status(StatusCodes.OK).send(successResponse(data, 'Events retrieved'));
        } catch(error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse('Error getting events', []));
        }
    }

    async getEventById(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const event = await Event.findById(eventId);
            if (!event) {
                res.status(StatusCodes.NOT_FOUND).send(errorResponse('Event not found', []));
                return;
            }
            const data: EventData = {
                _id: event.id,
                TitleEvent: event.TitleEvent,
                DateEvent: event.DateEvent,
                Description: event.Description,
                Location: event.Location
            }
            res.status(StatusCodes.OK).send(successResponse(data, 'Event found'));
        } catch(error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse('Error getting event', []));
        }
    }

    async updateEvent(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const { TitleEvent, DateEvent, Description, Location } = req.body;
            const event = await Event.findByIdAndUpdate(eventId, {
                TitleEvent,
                DateEvent,
                Description,
                Location
            }, { new: true, runValidators: true });
            if (!event) {
                res.status(StatusCodes.NOT_FOUND).send(errorResponse('Event not found', []));
                return;
            } else {
                const data: EventData = {
                    _id: event.id,
                    TitleEvent: event.TitleEvent,
                    DateEvent: event.DateEvent,
                    Description: event.Description,
                    Location: event.Location
                }
                res.status(StatusCodes.OK).send(successResponse(data, 'Event updated'));
            }
        } catch(error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse('Error updating event', []));
        }
    }

    async deleteEvent(req: Request, res: Response) {
        try {
            const { eventId } = req.params;
            const event = await Event.findByIdAndDelete(eventId);
            if (!event) {
                res.status(StatusCodes.NOT_FOUND).send(errorResponse('Event not found', []));
                return;
            }
            const data: EventData = {
                _id: event.id,
                TitleEvent: event.TitleEvent,
                DateEvent: event.DateEvent,
                Description: event.Description,
                Location: event.Location
            }
            res.status(StatusCodes.OK).send(successResponse(data, 'Event deleted'));
        } catch(error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResponse('Error deleting event', []));
        }
    }

}

