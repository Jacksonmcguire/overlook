class HotelRepository {
  constructor(roomData, bookingData) {
    this.bookings = bookingData;
    this.rooms = roomData;
    this.customers = [];
  }
}
export default HotelRepository;