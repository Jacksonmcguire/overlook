import chai from 'chai';
const expect = chai.expect;
import rooms from './Room-test-data'
import Room from '../src/Room'
describe('Room', function() {
  let room;
  beforeEach(() => {
    room = new Room(rooms[0]);
  })
  it('should be assigned a room# upon instantiation', () => {
    expect(room.number).to.deep.equal(1);
  })
  it('should be assigned a roomType upon instantiation', () => {
    expect(room.roomType).to.deep.equal('residential suite');
  })
  it('should be assigned a bidet upon instantiation', () => {
    expect(room.bidet).to.deep.equal(true);
  })
  it('should be assigned a bedSize upon instantiation', () => {
    expect(room.bedSize).to.deep.equal('queen');
  })
  it('should be assigned a numBeds upon instantiation', () => {
    expect(room.numBeds).to.deep.equal(1);
  })
  it('should be assigned a cost upon instantiation', () => {
    expect(room.costPerNight).to.deep.equal(358.4);
  })
  
})