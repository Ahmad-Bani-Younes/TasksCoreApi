import { Component } from '@angular/core';
import { AdnanService } from '../service/adnan.service';
import { Router } from '@angular/router';

export interface Category {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'] 
})
export class CategoryComponent {
  categoryList: Category[] = [];
  isEditMode: boolean = false;

  newCategory: Category = {
    categoryId: 0,
    categoryName: '',
    categoryDescription: ''
  };


  constructor(private ser: AdnanService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.ser.getCategories().subscribe((data: Category[]) => {
      this.categoryList = data;
    });
  }

  addCategory() {
    this.ser.AddCategories(this.newCategory).subscribe({
      next: (res) => {
        alert('Category added successfully');
        this.getCategories(); 
        this.resetForm();   
      },
      error: (err) => {
        console.error('Error adding category', err);
      }
    });
  }



  editCategory(cat: Category) {
    this.newCategory = { ...cat }; 
    this.isEditMode = true;
  }

  updateCategory() {
    this.ser.updateCategory(this.newCategory.categoryId, this.newCategory).subscribe({
      next: (res) => {
        alert('Category updated successfully');
        this.getCategories();
        this.resetForm();
      },
      error: (err) => {
        console.error('Error updating category', err);
      }
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.ser.deleteCategory(id).subscribe({
        next: (res) => {
          console.log('Category deleted successfully');
          this.getCategories();
        },
        error: (err) => {
          console.error('Error deleting category', err);
        }
      });
    }
  }

  viewCategory(id: number) {
    this.router.navigate(['/products', id]);
  }




  resetForm() {
    this.newCategory = {
      categoryId: 0,
      categoryName: '',
      categoryDescription: ''
    };
    this.isEditMode = false;
  }

}
