import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category/category.component';





@Injectable({
  providedIn: 'root'
})
export class AdnanService {

  //https://localhost:7024/api/Product/getProducts
  //  https://localhost:7024/api/Category/getCateegories

  constructor(private _url: HttpClient) { }
  getProducts() {
    return this._url.get('https://localhost:7024/api/Product/getProducts');
  }
  getCategories():Observable<Category[]> {
    return this._url.get<Category[]>('https://localhost:7024/api/Category/getCateegories');
  }

  AddCategories(data: any) {
    return this._url.post('https://localhost:7024/api/Category/addCategories', data);
  }

  updateCategory(id: number, data: any) {
    return this._url.put(`https://localhost:7024/api/Category/updateCategory/${id}`, data);
  }

  deleteCategory(id: number) {
    return this._url.delete(`https://localhost:7024/api/Category/deleteCategory/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this._url.get<any[]>(`https://localhost:7024/api/Category/${categoryId}`);
  }



}
