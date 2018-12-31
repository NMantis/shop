import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, switchMap} from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  options: any;
  products: Product[];
  constructor(
              private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router
            ) { }

  ngOnInit() {
    this.route.params
    .pipe(
      map(params => this.options = params.opt),
      switchMap(result => {
       return this.productService.getProductsByCat(this.options);
      })
    )
    .subscribe((data: Product[]) => {
      this.products = data;
    }, err => {
        this.router.navigate(['\pnf']);
    });
  }
}
