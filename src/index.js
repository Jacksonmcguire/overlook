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
const hotelRepo = new HotelRepository();
const profileButton = document.querySelector('#profileIcon');
const dropdownMenu = document.querySelector('.dropdown-content');
const getCustomerData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());

profileButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('visible')
})

Promise.all([getCustomerData, getRoomsData, getBookingsData])
  .then((promiseArr) => {
    addHotelData(promiseArr[0].customers, 'customers', Customer);
    addHotelData(promiseArr[1].rooms, 'rooms', Room);
    addHotelData(promiseArr[2].bookings, 'bookings', Booking);
    console.log(hotelRepo)
  })

function addHotelData (dataSet, key, classInst) {
  dataSet.forEach(dataItem => (hotelRepo[key].push(new classInst (dataItem))));
}