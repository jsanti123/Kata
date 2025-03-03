import { StatusCodes } from 'http-status-codes';

export interface ApiResponse {
    status: number;
    message: string;
    data?: EventData | null | EventData[];
    errors?: string[]
}

export interface EventData {
    _id: string;
    TitleEvent: string;
    DateEvent: Date;
    Description: string;
    Location: string;
}

export const successResponse = (data: EventData | EventData[], message: string): ApiResponse => {
    return {
        status: StatusCodes.OK,
        message: message,
        data
    }
}

export const errorResponse = (status: StatusCodes, message: any, errors?: any[]): ApiResponse => {
    return {
        status: status,
        message,
        errors
    }
}