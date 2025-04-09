import { Component, OnInit } from '@angular/core';
import { Shed } from '../../../../../model/Shed';
import { ShedService } from '../../../../../service/shed.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
//Proveedor
import { SupplierService } from '../../../../../service/supplier.service';
import { Supplier } from '../../../../../model/Supplier';

@Component({
  selector: 'app-shed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shed.component.html',
  styleUrls: ['./shed.component.css']
})
export class ShedComponent implements OnInit {
  sheds: Shed[] = [];
  paginatedSheds: Shed[] = [];
  statusActive: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  suppliers: Supplier[] = [];
  
  // Modal properties
  showModal: boolean = false;
  editMode: boolean = false;
  currentShed: Shed = this.initializeShed();

  constructor(
    private shedService: ShedService,
    private supplierService: SupplierService
  ) {}
  
  ngOnInit(): void {
    this.loadSheds();
    this.loadSuppliers();
  }

  // Initialize empty shed
  initializeShed(): Shed {
    return {
      id: 0,
      name: '',
      location: '',
      capacity: 0,
      chickenType: '',
      inspectionDate: new Date().toISOString().split('T')[0], // Today's date in yyyy-MM-dd format
      note: '',
      supplierId: null as any,
      status: 'A'
    };
  }

  // Open modal for creating a new shed
  openCreateModal(): void {
    this.editMode = false;
    this.currentShed = this.initializeShed();
    this.showModal = true;
  }

  // Open modal for editing an existing shed
  openEditModal(shed: Shed): void {
    this.editMode = true;
    // Create a deep copy to avoid modifying the original object
    this.currentShed = { ...shed };
    
    // Format the date properly for the date input
    if (this.currentShed.inspectionDate) {
      // If it's a Date object or a string date
      const date = new Date(this.currentShed.inspectionDate);
      this.currentShed.inspectionDate = date.toISOString().split('T')[0];
    }
    
    this.showModal = true;
  }

  // Close modal
  closeModal(): void {
    this.showModal = false;
  }

  // Check if the form is valid
  isFormInvalid(): boolean {
    return !this.currentShed.name || 
           !this.currentShed.location || 
           !this.currentShed.capacity || 
           !this.currentShed.chickenType || 
           !this.currentShed.inspectionDate || 
           !this.currentShed.supplierId;
  }

  // Save form (create or update)
  saveForm(): void {
    if (this.isFormInvalid()) {
      Swal.fire('Error', 'Por favor complete todos los campos requeridos', 'error');
      return;
    }

    if (this.editMode) {
      this.updateShed();
    } else {
      this.createShed();
    }
  }

  // Create a new shed
  createShed(): void {
    // Create a new object with all properties except id
    const shedToCreate = {
      name: this.currentShed.name,
      location: this.currentShed.location,
      capacity: this.currentShed.capacity,
      chickenType: this.currentShed.chickenType,
      inspectionDate: this.currentShed.inspectionDate,
      note: this.currentShed.note,
      supplierId: this.currentShed.supplierId,
      status: this.currentShed.status
    };

    this.shedService.create(shedToCreate as Shed).subscribe({
      next: (response) => {
        this.sheds.push(response);
        this.updatePagination();
        this.closeModal();
        Swal.fire('Éxito', 'Galpón creado correctamente', 'success');
      },
      error: (err) => {
        console.error('Error al crear galpón:', err);
        Swal.fire('Error', 'No se pudo crear el galpón', 'error');
      }
    });
  }

  // Update an existing shed
  updateShed(): void {
    const id = this.currentShed.id;
    this.shedService.update(id, this.currentShed).subscribe({
      next: (response) => {
        // Update the shed in the array
        const index = this.sheds.findIndex(s => s.id === id);
        if (index !== -1) {
          this.sheds[index] = response;
        }
        this.updatePagination();
        this.closeModal();
        Swal.fire('Éxito', 'Galpón actualizado correctamente', 'success');
      },
      error: (err) => {
        console.error('Error al actualizar galpón:', err);
        Swal.fire('Error', 'No se pudo actualizar el galpón', 'error');
      }
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAll().subscribe((data) => {
      this.suppliers = data;
    });
  }

  getSupplierCompany(supplierId: number): string {
    const supplier = this.suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.company : 'N/A';
  }
  
  loadSheds(): void {
    this.shedService.getAll().subscribe((data) => {
      this.sheds = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    // Get sheds based on current status filter
    const filteredSheds = this.sheds
      .filter((shed) => (this.statusActive ? shed.status === 'A' : shed.status === 'I'));
    
    // Calculate max pages
    const maxPage = Math.max(1, Math.ceil(filteredSheds.length / this.itemsPerPage));
    
    // Ensure current page is valid
    if (this.currentPage > maxPage) {
      this.currentPage = maxPage;
    }
    
    // Update paginated sheds
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedSheds = filteredSheds.slice(startIndex, startIndex + this.itemsPerPage);
  }

  cambiarPagina(page: number): void {
    const maxPage = this.getPages().length;
    if (page > 0 && page <= maxPage) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPages(): number[] {
    const filteredCount = this.sheds.filter(shed => 
      this.statusActive ? shed.status === 'A' : shed.status === 'I'
    ).length;
    
    const pageCount = Math.max(1, Math.ceil(filteredCount / this.itemsPerPage));
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  toggleStatus(event: boolean): void {
    this.statusActive = event;
    this.currentPage = 1; // Reset to first page when toggling view
    this.updatePagination();
  }

  softDelete(id: number): void {
    const shed = this.sheds.find((s) => s.id === id);
    if (shed) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas desactivar este galpón?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Create a copy of the shed to avoid direct mutation
          const updatedShed: Shed = {
            ...shed,
            status: 'I'
          };
          
          this.shedService.update(id, updatedShed).subscribe({
            next: () => {
              // Update local data immediately for better UX
              const index = this.sheds.findIndex(s => s.id === id);
              if (index !== -1) {
                this.sheds[index] = updatedShed;
              }
              
              // Update pagination with current status filter
              this.updatePagination();
              
              Swal.fire(
                'Desactivado!',
                'El galpón ha sido desactivado.',
                'success'
              );
            },
            error: (err) => {
              console.error('Error al desactivar galpón:', err);
              Swal.fire(
                'Error!',
                'No se pudo desactivar el galpón.',
                'error'
              );
            }
          });
        }
      });
    }
  }

  restore(id: number): void {
    const shed = this.sheds.find((s) => s.id === id);
    if (shed) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas activar este galpón?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, activar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Create a copy of the shed to avoid direct mutation
          const updatedShed: Shed = {
            ...shed,
            status: 'A'
          };
          
          this.shedService.update(id, updatedShed).subscribe({
            next: () => {
              // Update local data immediately for better UX
              const index = this.sheds.findIndex(s => s.id === id);
              if (index !== -1) {
                this.sheds[index] = updatedShed;
              }
              
              // Update pagination with current status filter
              this.updatePagination();
              
              Swal.fire(
                'Activado!',
                'El galpón ha sido activado.',
                'success'
              );
            },
            error: (err) => {
              console.error('Error al activar galpón:', err);
              Swal.fire(
                'Error!',
                'No se pudo activar el galpón.',
                'error'
              );
            }
          });
        }
      });
    }
  }
}