import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event, EventApiResponse } from '../../interfaces/event';
import { EventService } from '../../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-add-edit-event',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-event.component.html',
  styleUrl: './add-edit-event.component.css'
})
export class AddEditEventComponent {
  form: FormGroup;
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) { 
    this.form = this.fb.group({
      _id: [''],
      TitleEvent: ['', Validators.required],
      DateEvent: ['', Validators.required],
      Description: ['', Validators.required],
      Location: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getEventById(this.id);
    }
  }

  getEventById(id: string) {
    this.loading = true;
    this.eventService.getEventById(id).subscribe((response) => {
      this.loading = false;
      const event: EventApiResponse = {
        _id: response.data._id,
        TitleEvent: response.data.TitleEvent,
        DateEvent: response.data.DateEvent.replace(':00.000Z', ''),
        Description: response.data.Description,
        Location: response.data.Location
      }
      this.form.setValue(event);
    });
  }

  addEvent() {
    const event: Event = {
      TitleEvent: this.form.value.TitleEvent,
      DateEvent: this.form.value.DateEvent,
      Description: this.form.value.Description,
      Location: this.form.value.Location
    }
    if (this.id !== null) {
      this.loading = true;
      this.eventService.updateEvent(event, this.id).subscribe((response) => {
        this.loading = false;
        this.toastr.info('Evento actualizado con exito');
        this.router.navigate(['/']);
      });
    } else {
      this.loading = true;
      this.eventService.createEvent(event).subscribe((response) => {
        this.loading = false;
        this.toastr.success('Evento creado con exito');
        this.router.navigate(['/']);
      });
    }
  }
}
