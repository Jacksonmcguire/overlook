import chai from 'chai';
const expect = chai.expect;
import HotelRepository from '../src/hotel-repository';
import Booking from '../src/Booking';
import Room from '../src/Room';
import Customer from '../src/customer.js';
import rooms from './Room-test-data';
import bookings from './Booking-test-data'
import userData from './cutomer-test-data'

describe('Customer', function() {
  let customer;
  let hotelRepo;
  beforeEach(() => {
    hotelRepo = new HotelRepository();
    hotelRepo.customers = userData.map(user => new Customer(user));
    customer = new Customer(hotelRepo.customers[0]);
  })
  it('should have an id', function() {
    expect(customer.id).to.deep.equal(1);
  });
  it('should have a name', function() {
    expect(customer.name).to.deep.equal("Leatha Ullrich");
  });
  it('should have default to no bookings', function() {
    expect(customer.bookedRooms).to.deep.equal([]);
  });
  it('should have default totalSpent of 0', function() {
    expect(customer.totalSpent).to.deep.equal(0);
  });
  describe('getBookings', () => {
    it('should populate the customers bookedRooms array', () => {
      customer.bookings = bookings;
      customer.getBookings();
      expect(customer.bookedRooms.length).to.deep.equal(1);
    })
  })
  describe('getTotal', () => {
    it('should be able to sum a users booked rooms prices', () => {
      customer.bookings = bookings;
      customer.rooms = rooms;
      customer.getBookings();
      expect(customer.getTotal()).to.deep.equal(172.09);
    })
})
})