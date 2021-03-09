import chai from 'chai';
const expect = chai.expect;
import HotelRepository from '../src/hotel-repository';
import Customer from '../src/customer.js';
import rooms from './Room-test-data';
import bookings from './Booking-test-data'
import userData from './cutomer-test-data'

describe('Customer', function() {
  let customer;
  let hotelRepo;
  beforeEach(() => {
    hotelRepo = new HotelRepository(rooms, bookings);
    hotelRepo.customers =
    userData.map(user => new Customer(rooms, bookings, user));
    customer = hotelRepo.customers[0]
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
    it('should start at 0 if the customer has yet to make any bookings', () => {
      customer.bookings = [];
      expect(customer.getTotal()).to.deep.equal(0);
    })
  })
  describe('filterByDate', () => {
    it('should be able to filter rooms available on a date', () => {
      expect(customer.filterByDate("2020/02/16")).to.have.lengthOf(11);
    })
    it('should give back an empty array if no rooms are available', () => {
      customer.bookings = [bookings[2]];
      customer.rooms = [rooms[11]];
      
      expect(customer.filterByDate("2020/01/10")).to.deep.equal([]);
    }) 
  })
  describe('filterByType', () => {
    it('should be able to filter those available rooms by type', () => {
      customer.filterByDate("2020/02/16");

      expect(customer.filterByType("single room")).to.have.lengthOf(6);
      expect(customer.filterByType("single room")[0]).to.deep.equal(rooms[2])
    })
    it('should still hold the previously available rooms for that date', () => {
      customer.filterByDate("2020/02/16");

      expect(customer.filterByType("single room")).to.have.lengthOf(6);
      expect(customer.availableRooms).to.have.lengthOf(11);
    })
  })
})