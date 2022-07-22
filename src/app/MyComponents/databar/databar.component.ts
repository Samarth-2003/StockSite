import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataAreaComponent } from '../data-area/data-area.component';


@Component({
  selector: 'app-databar',
  templateUrl: './databar.component.html',
  styleUrls: ['./databar.component.css'],
  
})
@Injectable()
export class DatabarComponent implements OnInit {
 
  @ViewChild(DataAreaComponent) 
  private Child !: DataAreaComponent;
  activate(id: string) {
    var elem = document.getElementById(id);
    if (elem != null) {
      elem.classList.toggle("active-show");
      !elem.ariaSelected;
    }
    var prev = document.getElementById(this.prevSelectedID);
    if (prev != null) {
      prev.classList.toggle("active-show");
      !prev.ariaSelected;
    }
    this.prevSelectedID = id;
   
    this.Child.refresh(id);

  };

  public prevSelectedID: string;
  //public currSelectedID:string;
  constructor(private http: HttpClient,) {

    
    this.prevSelectedID = "apple";
    //this.currSelectedID = "nse-indicies";
  }


  ngOnInit(): void {
  }

}
