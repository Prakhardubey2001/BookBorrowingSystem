import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AboutComponent } from './pages/user/about/about.component';
import { UserGuard } from './services/user.guard';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { TokenavailableComponent } from './pages/user/tokenavailable/tokenavailable.component';
import { AddBookComponent } from './pages/user/add-book/add-book.component';
import { ShowBooksComponent } from './pages/user/show-books/show-books.component';
import { ViewbookdetailsComponent } from './pages/user/viewbookdetails/viewbookdetails.component';
import { CreatedbooksComponent } from './pages/user/createdbooks/createdbooks.component';
import { BorrowedBooksComponent } from './pages/user/borrowed-books/borrowed-books.component';

const routes: Routes = [
  
  {
    path: '',
    component:HomeComponent,
    pathMatch: 'full'

  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch: 'full'
  } ,
  {
    path: 'login',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-dashboard',
    component:UserDashboardComponent,
    
    canActivate: [UserGuard],
    children:[
      {path:'',
    component:UserHomeComponent, 
  },
  {
    path:'tokenavailable',
    component:TokenavailableComponent,
  },
  {
    path: 'about',
    component:AboutComponent,
    
  },
  {
    path:'addbook',
    component:AddBookComponent,
  },
  {
    path:'showbooks',
    component:ShowBooksComponent,
  },
  {path:'viewbookdetails/:id',
  component:ViewbookdetailsComponent,
  },
  {
    path:'createdbooks',
    component:CreatedbooksComponent,
  },
  {
    path:'borrowedbooks',
    component:BorrowedBooksComponent,
  },

    ]
  },
  
  {
    path:'**',
    component:ErrorComponent,
    pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
