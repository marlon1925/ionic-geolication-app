import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  AngularFireStorage,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

export interface Ubicacion {
  name: string;
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: number = 0;
  longitude: number = 0;
  filesCollection: AngularFirestoreCollection<Ubicacion>;
  files: any; 

  constructor(
    private geolocation: Geolocation,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.filesCollection = afs.collection<Ubicacion>('ubicacionCollection');
    this.files = this.filesCollection.valueChanges();
  }

  options = {
    timeout: 10000,
    enableHighAccuracy: true,
    maximumAge: 3600,
  };

  getCurrentCoordinates() {
    this.geolocation
      .getCurrentPosition(this.options)
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch((error) => {
        console.log("Error, no se puede obtener tu ubicacion", error);
      });
  }

  openGoogleMaps() {
    const googleMapsUrl =
      'https://www.google.com/maps/@' + this.latitude + ',' + this.longitude;
    console.log(googleMapsUrl);
    // Open the URL in the system's default web browser
    window.open(googleMapsUrl, '_system');
  }

  addUbicacion() {
    return this.filesCollection.add({
      name: 'Lalangui Salazar Guayanay',
      latitud: this.latitude,
      longitud: this.longitude,
    });
  }
}
