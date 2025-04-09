import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ProductService } from '../../../../../../service/product.service';
import { Product } from '../../../../../../model/Product';
import { TypeKardexService } from '../../../../../../service/type-kardex.service';
import { TypeKardex } from '../../../../../../model/TypeKardex';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass, NgFor, CommonModule } from '@angular/common';
import { ShedService } from '../../../../../../service/shed.service';
import { Shed } from '../../../../../../model/Shed';
import { SupplierService } from '../../../../../../service/supplier.service';
import { Supplier } from '../../../../../../model/Supplier';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-creations',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, NgClass, NgFor],
  templateUrl: './creations.component.html',
  styleUrls: ['./creations.component.css']
})
export class CreationsComponent implements OnInit {
  @Input() isOpen = false;
  @Input() isEditMode = false;
  @Input() typeKardex: TypeKardex = this.getDefaultTypeKardex();
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>(); // Notifica para actualizar la lista de datos

  products: Product[] = [];
  suppliers: Supplier[] = [];
  sheds: Shed[] = [];

  constructor(
    private typeKardexService: TypeKardexService,
    private productService: ProductService,
    private supplierService: SupplierService,
    private shedService: ShedService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loadProducts();
    this.loadSuppliers();
    this.loadSheds();
  }

  loadProducts() {
    this.productService.getAll().subscribe(
      products => this.products = products,
      error => console.error('Error al obtener productos:', error)
    );
  }

  loadSuppliers() {
    this.supplierService.getAll().subscribe(
      suppliers => this.suppliers = suppliers,
      error => console.error('Error al obtener proveedores:', error)
    );
  }

  loadSheds() {
    this.shedService.getAll().subscribe(
      sheds => this.sheds = sheds,
      error => console.error('Error al obtener galpones:', error)
    );
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.isEditMode) {
      this.typeKardexService.update(this.typeKardex.id, this.typeKardex).subscribe(() => {
        this.handleSuccess('¡Registro actualizado con éxito!');
      });
    } else {
      const { id, ...typeKardexData } = this.typeKardex;
      const newTypeKardex = { ...typeKardexData, status: 'A' } as TypeKardex;
      this.typeKardexService.create(newTypeKardex).subscribe(() => {
        this.handleSuccess('¡Registro creado con éxito!');
      });
    }
  }

  private handleSuccess(message: string) {
    Swal.fire({
      title: 'Éxito',
      text: message,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this.closeModal();

    setTimeout(() => {
      window.location.reload(); // Recarga la página completamente
    }, 500);
  }

  private getDefaultTypeKardex(): TypeKardex {
    return {
      id: 0,
      name: '',
      maximumAmount: 0,
      minimumQuantity: 0,
      supplierId: 0,
      productId: 0,
      shedId: 0,
      description: '',
      status: 'A'
    };
  }

}
