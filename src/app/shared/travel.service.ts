import { Injectable } from '@angular/core';

import { FormControl , FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  constructor(private firebase: AngularFireDatabase) { }
  			travelList: AngularFireList<any>;


  form = new FormGroup({
     $key: new FormControl(null),
     country: new FormControl('', Validators.required),
     city: new FormControl('', Validators.required),
     price: new FormControl('',[Validators.required, Validators.minLength(3)]),
     celsius: new FormControl('',[Validators.required, Validators.minLength(1)]),
     img: new FormControl('',Validators.required)
         });

          getTravel(){
                 this.travelList = this.firebase.list('travel');
                 return this.travelList.snapshotChanges();
         }

         insertTravel(travel){
                 this.travelList.push({
                         country: travel.country,
                         city: travel.city,
                         celsius: travel.celsius,
                         price:travel.price,
                         img:travel.img
                  });
         }
populateForm(travel){
    this.form.setValue(travel);
  }

updateTravel(travel){
    this.travelList.update(travel.$key,{
       travel: travel.country,
       city: travel.city,
       celsius: travel.celsius,
       price: travel.price,
       img: travel.img,

    });
  }

  deleteTravel($key: string){
    this.travelList.remove($key);
  }

}

