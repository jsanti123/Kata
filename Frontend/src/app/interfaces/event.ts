export interface Event {
    _id?: string;
    TitleEvent: string;
    DateEvent: Date;
    Description: string;
    Location: string;
}

export interface EventApiResponse {
    _id: string;
    TitleEvent: string;
    DateEvent: string;
    Description: string;
    Location: string;
}
export interface ApiResponseEvents {
    status: string;
    message: string;
    data: EventApiResponse[];
}

export interface ApiResponse {
    status: string;
    message: string;
    data: EventApiResponse;
}
