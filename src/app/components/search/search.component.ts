import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  searchProductsForm = new FormGroup({
    formDataFind: new FormControl(''),
    formDataCity: new FormControl(''),
  });


  ngOnInit(): void {}

  submit(event: Event) {
    event.preventDefault();
    console.log(this.searchProductsForm.value);
    this.searchProductsForm.reset();
  }



}
