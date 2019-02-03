import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { DialogComponent } from '../../dialog/dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() prods: Boolean;

  length: number;
  dataSource: Product[];
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30];

  displayedColumns = ['No', 'name', 'image', 'price', 'category', 'stock', 'action'];
  constructor(
              private productService: ProductService,
              public dialog: MatDialog
              ) { }

  ngOnInit() {
    this.getAllproducts();
  }

  addProductDialog() {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: { action: 'addProd' ,
                name: null,
                price: null,
                description: null,
                stock: null,
                category: null,
                image: null}
      });
      dialogRef.afterClosed().subscribe(result => this.getAllproducts());
    }


  getAllproducts() {
    this.productService.getAll()
    .subscribe( data => {
      this.dataSource = data.products;
      this.length = this.dataSource.length;
    });
  }

  editProductDialog(id, name, description, category, price, stock) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { action: 'editProd' ,
              id: id,
              name: name,
              description: description,
              price: price,
              category: category,
              stock: stock
            }
    });

    dialogRef.afterClosed().subscribe(result => this.getAllproducts());
  }

}
