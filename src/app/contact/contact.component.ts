import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  booking = {
    name: '',
    email: '',
    phone: '',
    guests:'',
    date: '',
    time: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  submitBooking() {
    this.http.post<any>('https://restaurant.stepprojects.ge/api/Baskets/GetAll', this.booking)
      .subscribe(response => {
        console.log('Booking submitted:', response);
      }, error => {
        console.error('Error submitting booking:', error);
      });
  }
}
