import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  event: Event = new Event({});

  constructor(private routes:ActivatedRoute, private eventService:EventService) {}

  ngOnInit(): void {
      this.routes.params.subscribe((params) =>{
        // console.log(params);
        this.eventService.getEvent(params['id']).subscribe({
          next: (event: Event) => {
          this.event = event;
          console.log('get event', this.event)
        },
        error: (error) => {
          console.log(error);
        },
        });
      });
  }
}
