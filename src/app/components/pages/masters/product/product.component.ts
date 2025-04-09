import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../../../../service/product.service';
import { Product } from '../../../../../model/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []; // Nueva propiedad para productos filtrados
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  statusActive: boolean = true;
  isLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.isLoading = false;
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
      }
    });
  }

  applyFilters(): void {
    // Filtramos una sola vez y guardamos los resultados
    this.filteredProducts = this.products.filter(p => 
      this.statusActive ? p.status === 'A' : p.status === 'I'
    );
    this.totalItems = this.filteredProducts.length;
    this.currentPage = 1; // Reiniciar a la primera página al filtrar
  }

  toggleStatus(): void {
    this.statusActive = !this.statusActive;
    this.applyFilters();
  }

  get paginatedProducts(): Product[] {
    // Usamos los productos ya filtrados
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  cambiarPagina(nuevaPagina: number): void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (nuevaPagina >= 1 && nuevaPagina <= totalPages) {
      this.currentPage = nuevaPagina;
    }
  }

  getPages(): number[] {
    if (this.totalItems === 0) return [];
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Si hay muchas páginas, mostrar solo un número limitado
    if (totalPages > 5) {
      const pages = [];
      // Siempre mostrar primera página
      pages.push(1);
      
      // Mostrar páginas alrededor de la actual
      let startPage = Math.max(2, this.currentPage - 1);
      let endPage = Math.min(totalPages - 1, this.currentPage + 1);
      
      // Agregar ellipsis si es necesario
      if (startPage > 2) {
        pages.push(-1); // Usamos -1 como marcador para mostrar "..."
      }
      
      // Agregar páginas intermedias
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Agregar ellipsis si es necesario
      if (endPage < totalPages - 1) {
        pages.push(-2); // Usamos -2 como otro marcador para mostrar "..."
      }
      
      // Siempre mostrar última página
      pages.push(totalPages);
      
      return pages;
    }
    
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  addProduct(): void {
    console.log('Adding new product');
    // Aquí puedes implementar la lógica para agregar un nuevo producto
    // Por ejemplo, navegar a una página de formulario o abrir un modal
  }

  softDeleteProduct(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El producto será eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.productService.softDelete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error deleting product:', err);
            this.isLoading = false;
            Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
          }
        });
      }
    });
  }

  restoreProduct(id: number): void {
    Swal.fire({
      title: '¿Restaurar producto?',
      text: 'El producto volverá a estar disponible.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, restaurar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.productService.restore(id).subscribe({
          next: () => {
            Swal.fire('Restaurado', 'El producto ha sido restaurado.', 'success');
            this.loadProducts();
          },
          error: (err) => {
            console.error('Error restoring product:', err);
            this.isLoading = false;
            Swal.fire('Error', 'No se pudo restaurar el producto', 'error');
          }
        });
      }
    });
  }

  updateProduct(id: number, product: Product): void {
    console.log('Edit product', id, product);
    // Implementar lógica para editar producto
  }
}