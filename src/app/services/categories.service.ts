import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }
  categoriesData = [
    { imgPath: '../../../assets/antyki-i-kolekcje.png' , heading:'Antiques and collections'},
    { imgPath: '../../../assets/car-cat.png' , heading:'Auto'},
    { imgPath: '../../../assets/flat-cat.png' , heading:'Realty'},
    { imgPath: '../../../assets/job-cat.png' , heading:'Job'},
    { imgPath: '../../../assets/home-cat.png' , heading:'House and garden'},
    { imgPath: '../../../assets/phone-cat.png' , heading:'Electronics'},
    { imgPath: '../../../assets/mens.png' , heading: "Men's clothing"},
    { imgPath: '../../../assets/clothes-cat.png' , heading:"Women's clothing"},
    { imgPath: '../../../assets/Farming-cat.png' , heading:'Farming'},
    { imgPath: '../../../assets/Pets-cat.png' , heading:'Pets'},
    { imgPath: '../../../assets/children-cat.png' , heading:'For children'},
    { imgPath: '../../../assets/Sports-cat.png' , heading:'Sports hobbies'},
    { imgPath: '../../../assets/Music-cat.png' , heading:'Music and education'},
    { imgPath: '../../../assets/Health-cat.png' , heading:'Health and beauty'},
    { imgPath: '../../../assets/Construction-cat.png' , heading:'Construction'},
    { imgPath: '../../../assets/Hotel-cat.png' , heading:'Hotel'},
    { imgPath: '../../../assets/Services-cat.png' , heading:'Services'},
    { imgPath: '../../../assets/Give-cat.png' , heading:'Jewelery'},
    { imgPath: '../../../assets/Pools-cat.png' , heading:'Pools'},
    { imgPath: '../../../assets/TV-cat.jpeg' , heading:'TV'},
    { imgPath: '../../../assets/Part-cat.png' , heading:'Part-time job'},
    { imgPath: '../../../assets/Vacations-cat.png' , heading:'Vacations'},
    { imgPath: '../../../assets/Other-cat.png' , heading:'Other'},
]
}
