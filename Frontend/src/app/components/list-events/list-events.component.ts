import { Component } from '@angular/core';
import { Event } from '../../interfaces/event';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-events',
  imports: [CommonModule, NgxPaginationModule, RouterLink, ProgressBarComponent],
  standalone: true,
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css'
})
export class ListEventsComponent {
  listEvents: Event[] = [];
  loading: boolean = false;
  currentPage = 1;

  constructor(private eventService: EventService, private toastr: ToastrService) {}

  getEvents(): void {
    try {
      this.loading = true;
      this.eventService.getEvents().subscribe((response) => {
        this.listEvents = response.data.map(event => ({
          ...event,
          DateEvent: new Date(event.DateEvent.replace('Z', '')),
        }));
        this.loading = false;
      });
    }catch(error) {
      this.toastr.error('Error al obtener los eventos');
      this.loading = false;
    } 
  }

  deleteEvent(eventId: string): void {
    try {
      this.loading = true;
      this.eventService.deleteEvent(eventId).subscribe((response) => {;
        this.getEvents();
        this.toastr.warning('El evento fue eliminado con exito');
      });
    } catch(error) {
      this.toastr.error('Error al eliminar el evento');
      this.loading = false;
    }
    
  }
  ngOnInit(): void {
    this.getEvents();
  }
}
