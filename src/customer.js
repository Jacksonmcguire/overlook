import HotelRepository from './hotel-repository'
class Customer extends HotelRepository {
  constructor(roomData, bookingData, userData) {
    super(roomData, bookingData);
    this.id = userData.id;
    this.name = userData.name;
    this.totalSpent = 0;
    this.bookedRooms = [];
    this.availableRooms = [];
  }
  getBookings() {
    this.bookings.forEach(booking => {
      if (booking.userID === this.id) {
        this.bookedRooms.push(booking)
      }
    })
  }

  getTotal() {
    return this.bookedRooms.reduce((totalSpent, booking) => {
      const matchingRoom = 
      this.rooms.find(room => room.number === booking.roomNumber);
      if (matchingRoom) {
        totalSpent += matchingRoom.costPerNight;
      }
      return totalSpent
    }, 0)
  }
  
  filterByDate(date) {
    const bookedToday = this.bookings.filter(booking => booking.date === date);
    this.availableRooms = 
    this.rooms.filter(room => !bookedToday.find(booking => {
      return booking.roomNumber === room.number;
    }))
    return this.availableRooms;
  }

  filterByType(roomType) {
    return this.availableRooms.filter(room => room.roomType === roomType);
  }
}

export default Customer