import chai from 'chai';
const expect = chai.expect;
// import Customer from '../src/customer.js';
import userData from './cutomer-test-data'
import HotelRepository from '../src/hotel-repository'

describe('HotelRepository', function() {
  let hotelRepo;
  beforeEach(() => {
    hotelRepo = new HotelRepository();
  })
  it('should start with no bookings', function() {
    expect(hotelRepo.bookings).to.deep.equal([]);
  });
  it('should start with no rooms', function() {
    expect(hotelRepo.rooms).to.deep.equal([]);
  });
  it('should start with no customers', function() {
    expect(hotelRepo.customers).to.deep.equal([]);
  });
});
