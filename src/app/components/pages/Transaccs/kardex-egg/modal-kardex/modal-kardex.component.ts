import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MovementKardex } from '../../../../../../model/MovementKardex';
import { MovementKardexService } from '../../../../../../service/movement-kardex.service';
import { TypeKardex } from '../../../../../../model/TypeKardex';
import { TypeKardexService } from '../../../../../../service/type-kardex.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-kardex',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-kardex.component.html',
  styleUrls: ['./modal-kardex.component.css']
})
export class ModalKardexComponent implements OnInit {

  @Input() isEdit: boolean = false;
  @Input() movementKardex: MovementKardex = {} as MovementKardex;
  @Output() closeModal = new EventEmitter<void>();

  kardexTypes: TypeKardex[] = [];
  showEntrada: boolean = true;

  constructor(
    private movementKardexService: MovementKardexService,
    private typeKardexService: TypeKardexService
  ) {}

  ngOnInit(): void {
    this.loadModalKardexTypes();
  }

  loadModalKardexTypes(): void {
    this.typeKardexService.listAll().subscribe({
      next: (types) => (this.kardexTypes = types),
      error: (err) => console.error('Error al cargar tipos de Kardex en el modal:', err)
    });
  }

  get modalValorTotalEntrada(): number {
    const { cantidadEntrada = 0, costoUnitarioEntrada = 0 } = this.movementKardex;
    return cantidadEntrada * costoUnitarioEntrada;
  }

  onSubmitModal(): void {
    if (!this.movementKardex) return;

    if (this.isEdit && this.movementKardex.kardexId) {
        this.movementKardexService.update(this.movementKardex.kardexId, this.movementKardex).subscribe({
            next: () => {
                Swal.fire('Actualizado', 'Movimiento de Kardex actualizado correctamente.', 'success');
                this.onCancelModal();
                window.location.reload(); // Recarga la página
            },
            error: (err) => {
                console.error('Error al actualizar el movimiento de Kardex en el modal:', err);
                Swal.fire('Error', 'No se pudo actualizar el movimiento de Kardex.', 'error');
            }
        });
    } else {
        const { kardexId, ...payload } = this.movementKardex;
        this.movementKardexService.create(payload as MovementKardex).subscribe({
            next: () => {
                Swal.fire('Creado', 'Movimiento de Kardex creado correctamente.', 'success');
                this.onCancelModal();
                window.location.reload(); // Recarga la página
            },
            error: (err) => {
                console.error('Error al crear el movimiento de Kardex en el modal:', err);
                Swal.fire('Error', 'No se pudo crear el movimiento de Kardex.', 'error');
            }
        });
    }
}


  onCancelModal(): void {
    this.movementKardex = {} as MovementKardex;
    this.closeModal.emit();
  }

  toggleEntradaSalida(): void {
    this.showEntrada = !this.showEntrada;
  }
}
