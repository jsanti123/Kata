import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IEvent {
    _id: string;
    TitleEvent: string;
    DateEvent: Date;
    Description: string;
    Location: string;
}

const EventSchema = new Schema({
    _id: { 
        type: String, 
        default: uuidv4 
    },
    TitleEvent: { 
        type: String, 
        required: true 
    },
    DateEvent: { 
        type: Date, 
        required: true 
    },
    Description: { 
        type: String, 
        required: true 
    },
    Location: { 
        type: String, 
        required: true
     },
});

export const Event = model<IEvent>('Event', EventSchema, 'events');