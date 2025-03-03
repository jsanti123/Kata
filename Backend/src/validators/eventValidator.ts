import { body } from 'express-validator';
import { validationResult } from 'express-validator';
import e, { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EventData, successResponse, errorResponse } from '../utils/response';

export const eventValidation = [
    body('TitleEvent')
    .exists().withMessage('titleEvent not found').bail()
    .notEmpty().withMessage('titleEvent is required').bail()
    .isString().withMessage('titleEvent must be a string'),
    body('DateEvent')
    .exists().withMessage('date not found').bail()
    .notEmpty().withMessage('date is required').bail()
    .isISO8601().withMessage('date must be in ISO8601 format (YYYY-MM-DDTHH:MM:SS)'),
    body('Description')
    .exists().withMessage('description not found').bail()
    .notEmpty().withMessage('description is required').bail()
    .isString().withMessage('description must be a string'),
    body('Location')
    .exists().withMessage('location not found').bail()
    .notEmpty().withMessage('location is required').bail()
    .isString().withMessage('location must be a string'),
]

export const validateEventFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message =  {
            message: 'Invalid Fields',
            expectedBody: {
                TitleEvent: 'string',
                DateEvent: 'date',
                Description: 'string',
                Location: 'string'
            }
        }
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse(message, errors.array()));
        return;
    }
    next();
};

export const validateEventBody = (req: Request, res: Response, next: NextFunction) => {
    const validFields = ['TitleEvent', 'DateEvent', 'Description', 'Location'];
    const receivedFields = Object.keys(req.body);
      const extraFields = receivedFields.filter(field => !validFields.includes(field));
  
    if (extraFields.length > 0) {
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse('Invalid Body', extraFields));
        return;
    }
    next();
};

export const validateUpdateEventBody = (req: Request, res: Response, next: NextFunction) => {
    const validFields = ['TitleEvent', 'Date', 'Description', 'Location'];
    const receivedFields = Object.keys(req.body);
    const extraFields = receivedFields.filter(field => validFields.includes(field));
    if (extraFields.length == 0) {
        res.status(StatusCodes.BAD_REQUEST).send(errorResponse('Its required to send at least one field to update', []));
        return;
    }
    next();
};