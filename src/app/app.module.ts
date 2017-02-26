import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { toDoListComponent } from '../pages/toDoList/toDoListComponent';
import { welcomeComponent } from '../pages/welcome/welcomeComponent';
import { TodoListService } from '../services/todoListService';

@NgModule({
  declarations: [
    MyApp,
    toDoListComponent,
    welcomeComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    toDoListComponent,
    welcomeComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TodoListService
  ]
})
export class AppModule {}
