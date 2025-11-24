import { Injectable, signal, computed, effect } from '@angular/core';

export interface Guest {
  name: string;
  checkInTime: string;
  roomNumber?: string;
}

export interface Room {
  number: string;
  status: 'unlocked' | 'locked' | 'available';
  guestName?: string;
  floor: number;
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private formatDate() {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month}/${day}/${year}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  }

  private guestsSignal = signal<Guest[]>([
    { name: 'Emma Jansen', checkInTime: '2025-11-24 08:30 AM', roomNumber: '101' },
    { name: 'Lucas de Vries', checkInTime: '2025-11-24 09:15 AM', roomNumber: '102' },
    { name: 'Sophie van Dijk', checkInTime: '2025-11-24 10:00 AM', roomNumber: '201' },
    { name: 'Daan Bakker', checkInTime: '2025-11-24 10:45 AM', roomNumber: '202' },
    { name: 'Mila Smit', checkInTime: '2025-11-24 11:30 AM', roomNumber: '301' },
    { name: 'Bram Visser', checkInTime: '2025-11-24 12:15 PM', roomNumber: '302' },
    { name: 'Lotte Mulder', checkInTime: '2025-11-24 01:00 PM', roomNumber: '401' },
    { name: 'Thijs Hendriks', checkInTime: '2025-11-24 01:45 PM', roomNumber: '402' },
    { name: 'Julia Vermeer', checkInTime: '2025-11-24 02:30 PM', roomNumber: '501' },
    { name: 'Sem van Leeuwen', checkInTime: '2025-11-24 03:15 PM', roomNumber: '502' },
  ]);

  private roomsSignal = signal<Room[]>([
    { number: '101', status: 'available', floor: 1 },
    { number: '102', status: 'available', floor: 1 },
    { number: '103', status: 'available', floor: 1 },
    { number: '201', status: 'available', floor: 2 },
    { number: '202', status: 'available', floor: 2 },
    { number: '203', status: 'available', floor: 2 },
    { number: '301', status: 'available', floor: 3 },
    { number: '302', status: 'available', floor: 3 },
    { number: '303', status: 'available', floor: 3 },
    { number: '401', status: 'available', floor: 4 },
    { number: '402', status: 'available', floor: 4 },
    { number: '403', status: 'available', floor: 4 },
    { number: '501', status: 'available', floor: 5 },
    { number: '502', status: 'available', floor: 5 },
    { number: '503', status: 'available', floor: 5 },
  ]);

  guests = this.guestsSignal.asReadonly();
  rooms = computed(() => {
    const currentGuests = this.guestsSignal();
    return this.roomsSignal().map(room => {
      const guest = currentGuests.find(g => g.roomNumber === room.number);
      if (guest) {
        return {
          ...room,
          status: 'unlocked' as const,
          guestName: guest.name
        };
      }
      return {
        ...room,
        status: 'available' as const,
        guestName: undefined
      };
    });
  });

  addGuest(name: string, roomNumber: string, checkInTime?: string) {
    const time = checkInTime || this.formatDate();

    this.guestsSignal.update(guests => [...guests, { name, checkInTime: time, roomNumber }]);
  }

  removeGuest(name: string) {
    this.guestsSignal.update(guests => guests.filter(g => g.name !== name));
  }

  constructor() {
    // Make service globally accessible for browser console commands
    (window as any).hotel = {
      addGuest: (name: string, roomNumber: string) => this.addGuest(name, roomNumber),
      removeGuest: (name: string) => this.removeGuest(name),
      listGuests: () => {
        console.table(this.guestsSignal());
        return this.guestsSignal();
      },
      listRooms: () => {
        console.table(this.rooms());
        return this.rooms();
      }
    };
  }
}
