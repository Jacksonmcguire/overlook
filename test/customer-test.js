import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/customer.js';
import userData from './cutomer-test-data'

describe('Customer', function() {
  let customer;
  beforeEach(() => {
    customer = new Customer(userData[0]);
  })
  it('should have an id', function() {
    expect(customer.id).to.deep.equal(1);
  });
  it('should have a name', function() {
    expect(customer.name).to.deep.equal("Leatha Ullrich");
  });
  it('should have default to no past bookings', function() {
    expect(customer.bookings.past).to.deep.equal([]);
  });
  it('should have default to no future bookings', function() {
    expect(customer.bookings.upcoming).to.deep.equal([]);
  });
  it('should have default totalSpent of 0', function() {
    expect(customer.totalSpent).to.deep.equal(0);
  });
});
