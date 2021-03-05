import chai from 'chai';
const expect = chai.expect;
import bookings from './booking-test-data'
import Booking from '../src/Booking'
describe('Booking', function() {
  let booking;
  beforeEach(() => {
    booking = new Booking(bookings[0]);
  })
  it('should be assigned an id upon instantiation', () => {
    expect(booking.id).to.deep.equal("5fwrgu4i7k55hl6sz");
  })
  it('should be assigned a user by id upon instantiation', () => {
    expect(booking.userID).to.deep.equal(9);
  })
  it('should be assigned a date upon instantiation', () => {
    expect(booking.date).to.deep.equal("2020/04/22");
  })
  it('should be assigned a room number upon instantiation', () => {
    expect(booking.roomNumber).to.deep.equal(15);
  })
  it('should be assigned a roomServiceCharge list upon instantiation', () => {
    expect(booking.roomServiceCharges).to.deep.equal([]);
  })
  
})