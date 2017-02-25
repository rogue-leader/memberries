import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    if(localStorage.getItem('Listenverzeichnis') == null) {
      let initialeListe = [
        { title: 'Einkaufen', component: Page1 },
        { title: 'Urlaub', component: Page2 }
      ];
      this.saveList(initialeListe);
    }
    
    this.pages = this.readList();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  readList() {
    //1. Bestehende Liste lesen
    //2. Gelesene Liste als Array haben

    let datenListe = localStorage.getItem('Listenverzeichnis');
    let liste = JSON.parse(datenListe);
    return liste;
  }

  addList() {
    //3. Dem Array ein neues Listenobjekt hinzufügen  
    //4. Neue Liste abspeichern
    let listen = this.readList();
    let pushList = {title: 'Neue Liste', component: Page2};
    listen.push(pushList);
    this.saveList(listen);
    this.pages = this.readList();
  }

  saveList(s) {
      let daten = JSON.stringify(s);
      localStorage.setItem('Listenverzeichnis', daten);
  }
}
