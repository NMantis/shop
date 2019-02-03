import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, switchMap} from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  id: any;
  quantity = 1;

  @Input() product: Product = new Product();
  constructor(
              private cookie: CookieService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private cartService: CartService,
              private snackbar: MatSnackBar
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
        this.router.navigate(['/pnf']);
    });
  }


  addToCart() {
    const id = this.product._id.toString();
    if (!this.cookie.check('cart')) {
       this.cookie.set('cart', id);
    } else {
      const prevValue = this.cookie.get('cart');
      const checkForDoubles = prevValue.split(' ');
      for (let i = 0; i < checkForDoubles.length; i++) {
        if (checkForDoubles[i] === id ) {
          return null;
        }
      }
      this.cookie.set('cart', prevValue + ' ' + id );
    }
  }

}
