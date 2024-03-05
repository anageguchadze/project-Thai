import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.http.get<Category[]>('https://restaurant.stepprojects.ge/api/Categories/GetAll')
      .subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        }
      });
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.fetchFilteredProducts(categoryId);
  }

  fetchFilteredProducts(categoryId: number): void {
    this.http.get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetFiltered?categoryId=' + categoryId)
      .subscribe({
        next: (data) => {
          this.products = data.map((product: any) => ({
            id: product.id,
            name: product.name,
            imageUrl: 'https://restaurant.stepprojects.ge/' + product.imageUrl, // Ensure correct URL formation
            price: product.price
          }));
        },
        error: (error) => {
          console.error('Error fetching filtered products:', error);
        }
      });
  }
  
}
