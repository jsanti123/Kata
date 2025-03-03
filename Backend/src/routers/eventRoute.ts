import { Router } from 'express';
const router = Router();
import { EventController } from '../controllers/eventController';
import { validateEventFields, validateEventBody, eventValidation, validateUpdateEventBody } from '../validators/eventValidator';

const eventController = new EventController();

router.post('/event', [...eventValidation, validateEventBody, validateEventFields], eventController.createEvent);
router.get('/events', eventController.getEvents);
router.get('/event/:eventId', eventController.getEventById);
router.put('/event/:eventId', [validateEventBody, validateUpdateEventBody], eventController.updateEvent);
router.delete('/event/:eventId', eventController.deleteEvent);

export default router;
