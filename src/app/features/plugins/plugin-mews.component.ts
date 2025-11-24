import { Component, inject, computed, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HotelService } from './hotel.service';

@Component({
  selector: 'app-plugin-mews',
  imports: [MatTableModule, MatCardModule],
  template: `
    <div class="plugin-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Guest Check-ins</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="table-wrapper" 
               (mouseenter)="pauseAnimation()" 
               (mouseleave)="resumeAnimation()"
               (wheel)="pauseAnimation()">
            <table mat-table [dataSource]="guestsReversed()" 
                   class="mat-elevation-z2"
                   [class.animated-table]="isAnimating()">
              <!-- Guest Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Guest</th>
                <td mat-cell *matCellDef="let guest">{{ guest.name }}</td>
              </ng-container>

              <!-- Room Number Column -->
              <ng-container matColumnDef="roomNumber">
                <th mat-header-cell *matHeaderCellDef>Room</th>
                <td mat-cell *matCellDef="let guest">{{ guest.roomNumber || 'Not Assigned' }}</td>
              </ng-container>

              <!-- Check-in Time Column -->
              <ng-container matColumnDef="checkInTime">
                <th mat-header-cell *matHeaderCellDef>Check-in Time</th>
                <td mat-cell *matCellDef="let guest">{{ guest.checkInTime }}</td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .plugin-container {
      padding: 20px;
    }
    
    .table-wrapper {
      max-height: 400px;
      overflow-y: auto;
      position: relative;
      mask-image: linear-gradient(to bottom, 
        transparent 0%,
        black 10%,
        black 90%,
        transparent 100%);
      -webkit-mask-image: linear-gradient(to bottom, 
        transparent 0%,
        black 10%,
        black 90%,
        transparent 100%);
    }
    
    table {
      width: 100%;
    }
    
    .mat-mdc-header-row {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: white;
    }
    
    .animated-table {
      animation: scroll-up 30s linear infinite;
    }
    
    @keyframes scroll-up {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-50%);
      }
    }
    
    mat-card {
      margin-bottom: 20px;
    }
  `]
})
export class PluginMewsComponent {
  displayedColumns: string[] = ['name', 'roomNumber', 'checkInTime'];
  hotelService = inject(HotelService);
  isAnimating = signal(true);
  
  // Duplicate the guest list for seamless looping
  guestsReversed = computed(() => {
    const guests = [...this.hotelService.guests()].reverse();
    return [...guests, ...guests]; // Duplicate for infinite scroll
  });

  pauseAnimation() {
    this.isAnimating.set(false);
  }

  resumeAnimation() {
    this.isAnimating.set(true);
  }
}