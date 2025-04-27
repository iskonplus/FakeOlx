import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-show-category-page',
  templateUrl: './show-category-page.component.html',
  styleUrl: './show-category-page.component.scss'
})
export class ShowCategoryPageComponent {
  category?: string | null

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get("cat")?.split('-').join(' ');
  }

  returnToMainPage() {
    this.router.navigate(['/'])

  }

}
