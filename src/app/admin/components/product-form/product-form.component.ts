import { ProductService } from 'shared/services/product.service';
import { CategoryService } from 'shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product:any={};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoyService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoyService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    //Use take because we don't want to use OnDestroy
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    //For redirect the user to the lists of the products
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);

  }

  ngOnInit() {
  }

}
