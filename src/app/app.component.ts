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

  rootPage: any = Page2;

  pages: Array<{title: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.initializeStorage();
    this.pages = this.readList();
    // this.openPage(this.pages[0]);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  initializeStorage() {
    // used for an example of ngFor and navigation
    if(localStorage.getItem('Listenverzeichnis') == null) {
      let initialeListe = [];
      this.saveList(initialeListe);
    }
  }

  openPage(page) {
    this.nav.setRoot(Page1, page);
  }

  readList(): Array<{title: string}> {
    let datenListe = localStorage.getItem('Listenverzeichnis');
    let liste = JSON.parse(datenListe);
    return liste;
  }

  addList() {
    let listen = this.readList();
    let pushList = {id:(Date.now()), title: 'Neue Liste'};
    listen.push(pushList);
    this.saveList(listen);
    this.pages = this.readList();
  }

  saveList(s) {
    let daten = JSON.stringify(s);
    localStorage.setItem('Listenverzeichnis', daten);
  }

  deleteList(outdatedList) {
    let lists = this.readList();
    let neueListe = [];

    for(let list of lists) { //[a,b,c,d,f]
      let id:any = list['id'];

      if(id != outdatedList.id) {
        neueListe.push(list);
      }
    }

    this.saveList(neueListe);
    this.pages = neueListe;
  }
}
