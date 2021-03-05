import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking';
import Room from '../src/Room';
import Customer from '../src/customer.js';
import rooms from './Room-test-data'
import bookings from './Booking-test-data'
import userData from './cutomer-test-data'
import HotelRepository from '../src/hotel-repository'

describe('HotelRepository', function() {
  let hotelRepo;
  beforeEach(() => {
    const roomData = rooms.map(room => new Room(room))
    const bookingData = bookings.map(booking => new Booking(booking))

    hotelRepo = new HotelRepository(roomData, bookingData);
  })
  it('should be instaintiated with bookings', function() {
    expect(hotelRepo.bookings[0]).to.be.instanceOf(Booking);
  });
  it('should be instantiated with rooms', function() {
    expect(hotelRepo.rooms[0]).to.be.instanceOf(Room);
  });
  it('should start with no customers', function() {
    expect(hotelRepo.customers).to.deep.equal([]);
  });
});
