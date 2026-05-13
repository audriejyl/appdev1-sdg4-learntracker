import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supplier } from '../../../services/supplier.service';

/**
 * Child component that displays a single supplier
 * Demonstrates @Input for parent-to-child communication
 * Demonstrates @Output with EventEmitter for child-to-parent communication
 */
@Component({
  selector: 'app-supplier-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supplier-item.component.html',
  styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent {

  /**
   * Input property: receives supplier data from parent
   */
  @Input() supplier: Supplier | null = null;

  /**
   * Input property: receives search term to highlight matches
   */
  @Input() searchTerm: string = '';

  /**
   * Output event: emits when user clicks to view details
   */
  @Output() viewDetails = new EventEmitter<number>();

  /**
   * Output event: emits when user deletes the supplier
   */
  @Output() deleteSupplier = new EventEmitter<number>();

  /**
   * Handle view details button click
   */
  onViewDetails(): void {
    if (this.supplier?.id) {
      this.viewDetails.emit(this.supplier.id);
    }
  }

  /**
   * Handle delete button click
   */
  onDelete(): void {
    if (this.supplier?.id) {
      if (confirm(`Delete "${this.supplier.supplierName}"?`)) {
        this.deleteSupplier.emit(this.supplier.id);
      }
    }
  }

  /**
   * Highlight matching text in search results
   */
  highlightMatch(text: string): string {
    if (!this.searchTerm) return text;
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
