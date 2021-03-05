// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './glide.js'
import './css/base.scss';
import HotelRepository from './hotel-repository';
import Customer from './customer';
import Room from './Room';
import Booking from './Booking';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/pexels-pixabay-271624.jpg'
const customersUrl = 'http://localhost:3001/api/v1/customers';
const roomsUrl = 'http://localhost:3001/api/v1/rooms';
const bookingsUrl = 'http://localhost:3001/api/v1/bookings';
let hotelRepo = null;
let customer = null;

const profileButton = document.querySelector('#profileIcon');
const dropdownMenu = document.querySelector('.dropdown-content');
const totalSpent = document.querySelector('.total-spent');
const profileName = dropdownMenu.querySelector('h1');
const yourStays = dropdownMenu.querySelector('button');
const currentRoomContainer = document.querySelector('.current-room-container');
const currentRoomImg = currentRoomContainer.querySelector('img');

const getCustomerData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());



profileButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('visible')
})

yourStays.addEventListener('click', showRoomsBooked);


Promise.all([getCustomerData, getRoomsData, getBookingsData])
  .then((promiseArr) => {
    const roomData = addHotelData(promiseArr[1].rooms, Room);
    const bookingData = addHotelData(promiseArr[2].bookings, Booking);
    const customerData = 
    addCustomerData(promiseArr[0].customers, [roomData, bookingData]);
    hotelRepo = new HotelRepository(roomData, bookingData)
    hotelRepo.customers = customerData;
    customer = hotelRepo.customers[0];
    buildPage();
  })

function addHotelData(dataSet, classInst) {
  return dataSet.map(dataItem => (new classInst (dataItem)));
}

function addCustomerData(dataSet, dataSets) {
  return dataSet.map(dataItem => (new Customer (dataSets[0], dataSets[1], dataItem)));
}

function buildPage() {
  buildProfile();
}

function buildProfile() {
  customer.getBookings();
  profileName.innerText = customer.name;
  totalSpent.innerText = `Total Spent: $${customer.getTotal().toFixed(0)}`;
}

function showRoomsBooked() {
  console.log(customer.bookedRooms)
  customer.bookedRooms.forEach((booking, index) => {
    if (index === 0) {
      dropdownMenu.innerHTML =
      `<button class="go-back"></button>
       <ul></ul>`; 
    } 
    dropdownMenu.querySelector('ul').innerHTML +=
    `<li class="booking">${booking.date}: Room #${booking.roomNumber}</li>`

  })
}