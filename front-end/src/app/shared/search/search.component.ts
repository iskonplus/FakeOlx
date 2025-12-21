import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  @Output() filterTerm: EventEmitter<string> = new EventEmitter<string>();

  searchProductsForm = new FormGroup({
    formDataFind: new FormControl(''),
    formDataCity: new FormControl(''),
  });


  ngOnInit(): void {}

  submit(event: Event) {
    event.preventDefault();
    this.filterTerm.emit(this.searchProductsForm.value.formDataFind ?? "");
    // this.searchProductsForm.reset();
  }



}
