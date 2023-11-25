import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/common/product.interface';
import { ProductService } from 'src/app/services/common/product.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import { ConfirmDialogComponent } from '../../ui/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/core/ui.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() data: Product;


  //Subscription
  private subDelete: Subscription;

  constructor(
    private productService: ProductService,
    private reloadService: ReloadService,
    private dialog: MatDialog,
    private uiServices: UiService
  ) {

  }

  /**
   * HTTP REQUEST HANDLE
   * deleteProduct()
   */


  deleteProduct(id: string) {
    this.subDelete = this.productService.deleteProductByUserId(id).subscribe(res => {
      if (res.success) {
        this.uiServices.success(res.message);
        this.reloadService.needRefreshData$();
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }




  /**
* COMPONENT DIALOG VIEW
*/
  public openConfirmDialog(type: string, data?: any) {
    switch (type) {
      case 'delete': {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: '400px',
          data: {
            title: 'Confirm Delete',
            message: 'Are you sure you want delete this data?'
          }
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {
            this.deleteProduct(data);
          }
        });
        break;
      }
    }

  }

  getImagePlaceholder(type: 'matrimonial' | 'job_post' | 'products' | 'to_let') {
    switch(type) {
      case 'products': {
        return '/assets/images/placeholder/products.png';
      }
      case 'job_post': {
        return '/assets/images/placeholder/job.png';
      }
      case 'to_let': {
        return '/assets/images/placeholder/to-let.png';
      }
      case 'matrimonial': {
        return '/assets/images/placeholder/marriage.png';
      }
      default: {
        return '/assets/images/placeholder/products.png';
      }
    }
  }

  getJobType(type: 'matrimonial' | 'job_post' | 'products' | 'to_let') {
    switch(type) {
      case 'products': {
        return 'Products';
      }
      case 'job_post': {
        return 'Job';
      }
      case 'to_let': {
        return 'To Let';
      }
      case 'matrimonial': {
        return 'Matrimonial';
      }
      default: {
        return 'Products';
      }
    }
  }



}