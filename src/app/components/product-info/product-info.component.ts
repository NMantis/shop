import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, switchMap} from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  id: any;
  product: Product = new Product();
  constructor(
              private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router
            ) { }

  ngOnInit() {
    this.route.params
    .pipe(
      map(params => this.id = params.id),
      switchMap(result => {
       return this.productService.getProductsById(this.id);
      })
    )
    .subscribe((data: Product) => {
      this.product = data;
    }, err => {
        this.router.navigate(['\pnf']);
    });
  }

}
