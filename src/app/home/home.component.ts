import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatButtonToggleModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
   isAcceptable() {
    
  }

  
  fontStyleControl = new FormControl('');
  fontStyle?: string;
}
