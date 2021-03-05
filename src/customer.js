import HotelRepository from './hotel-repository'
class Customer extends HotelRepository {
  constructor({id, name}) {
    super();
    this.id = id;
    this.name = name;
    this.totalSpent = 0;
    this.bookedRooms = [];
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
}

export default Customer