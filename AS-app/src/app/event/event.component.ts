import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { VolunteerModel } from '../volunteer/volunteer.model';
import { VolunteersService } from '../volunteer/volunteers.service';
import { EventService } from './event.service';
import { EventModel } from './event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('dateInput') dateInputRef: ElementRef;
  @ViewChild('descriptionInput') desInputRef: ElementRef;
  modelType = '';
  relatedTo: VolunteerModel[] = [];

  constructor(private volunteerService: VolunteersService, private eventService: EventService) {
    eventService.relatedTo = this.relatedTo;

  }
  addToList(item) {
    const index = this.volunteerService.volunteers.indexOf(item);
    this.relatedTo.push(this.volunteerService.volunteers[index]);
    this.volunteerService.volunteers.splice(index, 1);
  }
  delFromList(item) {
    const index = this.relatedTo.indexOf(item);
    this.volunteerService.volunteers.push(this.relatedTo[index]);
    this.relatedTo.splice(index, 1);
  }

 
  onAddEvent() {

    const eventName = this.nameInputRef.nativeElement.value;
    const eventDate = this.dateInputRef.nativeElement.value;
    const eventDescription = this.desInputRef.nativeElement.value;
    if(eventName == "" || eventDate == "" || this.relatedTo.length == 0 ){
      alert("תשלים את הנתונים הנדרשים");
    }
    else{
      const eventAdded = new EventModel(eventName,this.modelType,eventDate,eventDescription,this.relatedTo); 
      this.eventService.commingSoonEvents.push(eventAdded);
    }  
    console.log(this.eventService.commingSoonEvents);
  }



  ngOnInit() {
  }

}