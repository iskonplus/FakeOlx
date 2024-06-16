import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }
  categoriesData = [
    { imgPath: '../../../assets/antyki-i-kolekcje.png' , heading:'Antiques and collections', class: 'yalow'},
    { imgPath: '../../../assets/car-cat.png' , heading:'Auto', class: 'blue'},
    { imgPath: '../../../assets/flat-cat.png' , heading:'Realty', class: 'pink'},
    { imgPath: '../../../assets/job-cat.png' , heading:'Job', class: 'green'},
    { imgPath: '../../../assets/home-cat.png' , heading:'House and garden', class: 'orange'},
    { imgPath: '../../../assets/phone-cat.png' , heading:'Electronics', class: 'lightBlue'},
    { imgPath: '../../../assets/clothes-cat.png' , heading:'Clothes', class: 'ochre'},
    { imgPath: '../../../assets/Farming-cat.png' , heading:'Farming', class: 'yalow'},
    { imgPath: '../../../assets/Pets-cat.png' , heading:'Pets', class: 'blue'},
    { imgPath: '../../../assets/children-cat.png' , heading:'For children', class: 'pink'},
    { imgPath: '../../../assets/Sports-cat.png' , heading:'Sports hobbies', class: 'green'},
    { imgPath: '../../../assets/Music-cat.png' , heading:'Music and education', class: 'orange'},
    { imgPath: '../../../assets/Health-cat.png' , heading:'Health and beauty', class: 'lightBlue'},
    { imgPath: '../../../assets/Construction-cat.png' , heading:'Construction', class: 'ochre'},
    { imgPath: '../../../assets/Hotel-cat.png' , heading:'Hotel', class: 'blue'},
    { imgPath: '../../../assets/Services-cat.png' , heading:'Services', class: 'pink'},
    { imgPath: '../../../assets/Give-cat.png' , heading:'Give away', class: 'green'},
    { imgPath: '../../../assets/Pools-cat.png' , heading:'Pools', class: 'orange'},
    { imgPath: '../../../assets/TV-cat.jpeg' , heading:'TV', class: 'lightBlue'},
    { imgPath: '../../../assets/Part-cat.png' , heading:'Part-time job', class: 'ochre'},
    { imgPath: '../../../assets/Vacations-cat.png' , heading:'Vacations', class: 'pink'},
    { imgPath: '../../../assets/Other-cat.png' , heading:'Other', class: 'green'},
]
}
