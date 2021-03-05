class Customer {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
    this.totalSpent = 0;
    this.bookings = {
      past: [],
      upcoming: []
    }
  }
}

export default Customer