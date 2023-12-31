import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from './../models/product.model';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  //private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  private apiUrl = 'https://api.estedominionoexiste.co/api/v1/products';

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    /*
    return this.http.get<Product[]>(
      'https://young-sands-07814.herokuapp.com/api/products'
    );
    */
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    /*
    return this.http.get<Product[]>(this.apiUrl, {
      params,
    });
    */
    return this.http
      .get<Product[]>(this.apiUrl, {
        params,
      })
      .pipe(retry(3));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset },
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
