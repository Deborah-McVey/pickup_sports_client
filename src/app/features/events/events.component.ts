import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private eventService:EventService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit(): void {
      // this.loadEvents(this.currentPage)
      this.route.queryParams.subscribe(params => {
        const page = params['page'] ? Number(params['page']) : 1
        this.loadEvents(page)
      })
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
      //this.loadEvents(this.currentPage + 1)
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage + 1 },
        queryParamsHandling: 'merge'
    })
    }
  }

  previousPage() {
    if(this.currentPage > 1) {
      //this.loadEvents(this.currentPage - 1)
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage - 1 },
        queryParamsHandling: 'merge'
    })
    }
  }
}
