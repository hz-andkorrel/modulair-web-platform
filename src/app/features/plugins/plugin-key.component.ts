import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HotelService } from './hotel.service';

@Component({
  selector: 'app-plugin-key',
  imports: [MatCardModule, MatListModule, MatIconModule],
  template: `
    <div class="plugin-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Room Key Management</mat-card-title>
          <mat-card-subtitle>Automatisch ontgrendelen voor ingecheckte gasten</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            @for (room of hotelService.rooms(); track room.number) {
              <mat-list-item>
                @if (room.status === 'unlocked') {
                  <mat-icon matListItemIcon class="icon-unlocked">
                    lock_open
                  </mat-icon>
                } @else {
                  <mat-icon matListItemIcon class="icon-locked">
                    lock
                  </mat-icon>
                }
                <div matListItemTitle>Room {{ room.number }}</div>
                <div matListItemLine>
                  @if (room.guestName) {
                    <span>{{ room.guestName }}</span>
                  } @else {
                    <span class="available-text">Available</span>
                  }
                </div>
              </mat-list-item>
            }
          </mat-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .plugin-container {
      padding: 20px;
      max-width: 50%;
    }
    mat-card {
      margin-bottom: 20px;
    }
    .available-text {
      color: #666;
      font-style: italic;
    }
    .icon-unlocked {
      color: #4caf50;
    }
    .icon-locked {
      color: #9e9e9e;
    }
    mat-list-item {
      margin-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
    }
  `]
})
export class PluginKeyComponent {
  hotelService = inject(HotelService);
}