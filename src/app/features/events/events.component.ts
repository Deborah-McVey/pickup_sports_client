import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  currentPage:number = 1;
  totalPages:number = 0;
  events:Event[] = []

  constructor(private eventService:EventService) {}

  ngOnInit(): void {
      this.loadEvents(this.currentPage)
  }

  loadEvents(page:number) {
    this.eventService.getEvents(page).subscribe({
      next: (response:any) => {
        this.events = response.events;
        this.currentPage = response.current_page;
        this.totalPages = response.total_pages;
      },
      error: (error:any) => {
        console.error("error fetching event", error)
      }
    })
  }

  nextPage() {
    if(this.currentPage < this.totalPages) {
      this.loadEvents(this.currentPage + 1)
    }
  }

  previousPage() {
    if(this.currentPage > 1) {
      this.loadEvents(this.currentPage - 1)
    }
  }
}
