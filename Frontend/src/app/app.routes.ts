import { Routes } from '@angular/router';
import { AddEditEventComponent } from './components/add-edit-event/add-edit-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';

export const routes: Routes = [
    { path: '', component: ListEventsComponent },
    { path: 'add-event',  component: AddEditEventComponent },
    { path: 'edit-event/:id',  component: AddEditEventComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
