import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { DeleteCategoryComponent } from './delete-category/delete-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpperCasePipe } from './upper-case.pipe';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CategoryStatsComponent } from './category-stats/category-stats.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';

import { DatabaseService } from './database.service';

import { AddEventComponent } from './add-event/add-event.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { DisplayEventComponent } from './display-event/display-event.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { DurationPipe } from './duration.pipe';
import { TranslatorComponent } from './translator/translator.component';
import { StatsG2Component } from './stats-g2/stats-g2.component';
import { AppRoutingModule } from './app-routing.module';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';

const routes: Routes = [{
  path: 'add-event',
  component: AddEventComponent
}, {
  path: 'list-events',
  component: ListEventsComponent
}, {
  path: 'delete-event',
  component: DeleteEventComponent
}, {
  path: 'update-event',
  component: UpdateEventComponent
}, {
  path: 'display-event',
  component: DisplayEventComponent
}, 
{ path: 'translator',
  component: TranslatorComponent
}, { 
  path: 'stats-g2',
  component: StatsG2Component
}, {
  path: '',
  redirectTo: 'list-events',
  pathMatch: 'full'
}, 
{ path: 'addcategory', component: AddCategoryComponent },
{ path: 'listcategory', component: ListCategoryComponent },
{ path: 'deletecategory', component: DeleteCategoryComponent },
{ path: 'categorydetail', component: CategoryDetailComponent },
{ path: 'updatecategory', component: UpdateCategoryComponent },
{ path: 'texttospeech', component: TextToSpeechComponent },
{ path: 'invalid-data', component: InvalidDataComponent },
  { path: '**', 
  component: NotFoundComponent 
},
]

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    DeleteEventComponent,
    UpdateEventComponent,
    DisplayEventComponent,
    NotFoundComponent,
    ListEventsComponent,
    DurationPipe,
    TranslatorComponent,
    StatsG2Component,
    AddCategoryComponent,
    ListCategoryComponent,
    DeleteCategoryComponent,
    UpperCasePipe,
    CategoryDetailComponent,
    UpdateCategoryComponent,
    CategoryStatsComponent,
    TextToSpeechComponent,
    InvalidDataComponent
  ],

  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, 
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
