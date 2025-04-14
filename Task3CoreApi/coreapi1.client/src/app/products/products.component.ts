import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdnanService } from '../service/adnan.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  categoryId!: number;
  productList: any[] = [];

  constructor(private route: ActivatedRoute, private productService:AdnanService) { }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByCategory(this.categoryId).subscribe({
      next: (res) => (this.productList = res),
      error: (err) => console.error('Failed to load products:', err),
    });
  }

}
