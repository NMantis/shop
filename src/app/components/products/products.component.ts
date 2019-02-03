import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, switchMap} from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  options: any;
  products: Product[];
  productToBeAdded: Product[];
  cartCount: number;
  constructor(
              private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router,
              private cartService: CartService,
              private snackbar: MatSnackBar
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

  addToCart (product: Product) {
    this.productToBeAdded = this.cartService.getCartItems();
    if ( this.productToBeAdded == null) {
      this.productToBeAdded = [];
      this.productToBeAdded.push(product);
      this.cartService.addToCart(this.productToBeAdded);
    } else {
        const temp = this.productToBeAdded.find(p => p._id === product._id);
      if (temp == null) {
        this.productToBeAdded.push(product);
        this.cartService.addToCart(this.productToBeAdded);
      } else {
        this.cartService.updateQuantity(temp, 1);
      }
    }
      this.cartCount = this.productToBeAdded.length;
      this.cartService.updateCount(this.cartCount);
      this.snackbar.open(`Product Added - Cart(${this.cartCount })`, 'OK', {
        duration: 5000
      });
  }


}
