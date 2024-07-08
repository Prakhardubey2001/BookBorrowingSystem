import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/user/sidebar/sidebar.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AboutComponent } from './pages/user/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { TokenavailableComponent } from './pages/user/tokenavailable/tokenavailable.component';
import { AddBookComponent } from './pages/user/add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ShowBooksComponent } from './pages/user/show-books/show-books.component';
import { MatTableModule } from '@angular/material/table';
import { ViewbookdetailsComponent } from './pages/user/viewbookdetails/viewbookdetails.component';
import { MatSelectModule } from '@angular/material/select';
import { CreatedbooksComponent } from './pages/user/createdbooks/createdbooks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BorrowedBooksComponent } from './pages/user/borrowed-books/borrowed-books.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    SignupComponent,
    LoginComponent,
    SidebarComponent,
    UserDashboardComponent,
    AboutComponent,
    UserHomeComponent,
    TokenavailableComponent,
    AddBookComponent,
    ShowBooksComponent,
    ViewbookdetailsComponent,
    CreatedbooksComponent,
    BorrowedBooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
