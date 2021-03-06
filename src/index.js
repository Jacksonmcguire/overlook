// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import glide from './glide'
// import './glide'
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
let yourStays = dropdownMenu.querySelector('button');
const currentRoomContainer = document.querySelector('.current-room-container');
const currentRoomImg = currentRoomContainer.querySelector('img');
let goBackBtn = dropdownMenu.querySelector('.go-back');
const profileName = dropdownMenu.querySelector('h1');
const totalSpent = document.querySelector('.total-spent');
const dateInput = document.querySelector('#calendarIcon');
const glideTrack = document.querySelector('.glide__track')
const slides = document.createElement('ul');
glideTrack.append(slides);
slides.classList.add('glide__slides');
let currentSlides = [];


const getCustomerData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());



profileButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('visible')
})

yourStays.addEventListener('click', showRoomsBooked);
goBackBtn.addEventListener('click', refreshProfile);
dateInput.addEventListener('change', filterDate);


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
  buildCards(customer.rooms);
}

function buildProfile() {
  customer.totalSpent = 0;
  customer.getBookings();
  profileName.innerText = customer.name;
  totalSpent.innerText = `Total Spent: $${customer.getTotal().toFixed(0)}`;
}

function showRoomsBooked() {
  goBackBtn.classList.remove('hidden');
  dropdownMenu.querySelector('ul').classList.remove('hidden');
  profileName.classList.add('hidden');
  totalSpent.classList.add('hidden');
  yourStays.classList.add('hidden');

  customer.bookedRooms.forEach(booking => {
    const listItem = document.createElement('li');
    dropdownMenu.querySelector('ul').appendChild(listItem)
    listItem.innerHTML =
    `<li class="booking">${booking.date}: Room #${booking.roomNumber}</li>`;
  })
}

function refreshProfile() {
  goBackBtn.classList.add('hidden');
  dropdownMenu.querySelector('ul').classList.add('hidden');
  dropdownMenu.querySelector('ul').innerHTML = '';
  profileName.classList.remove('hidden');
  totalSpent.classList.remove('hidden');
  yourStays.classList.remove('hidden');
}

function filterDate() { 
  customer.filterByDate(dateInput.value.replaceAll('-', '/'));
  console.log(customer.filterByDate(dateInput.value.replaceAll('-', '/')))
  buildCards(customer.availableRooms)
  console.log(slides)
}

function buildCards(dataSet) {
  resetCards();
  dataSet.forEach((room) => {
    generateRoomCard(room);
  })
  
  glide.mount()
}

function generateRoomCard(roomObj) {
  let bidet;
  roomObj.bidet ? bidet = 'Bidet' : bidet = '';
  let bed;
  roomObj.numBeds > 1 ?
    bed = `${roomObj.numBeds} ${roomObj.bedSize} Beds` :
    bed = `${roomObj.numBeds} ${roomObj.bedSize} Bed`;
  const slide = document.createElement('li');
  slides.append(slide);
  slide.classList.add('glide__slide', 'room-container')
  slide.innerHTML = 
  `<img src="./images/pexels-pixabay-271624.jpg" alt="hotel room">
  <article>Amenities
    <p class="amenities">${bidet}</p>
    <p class="amenities">${bed}</p>
  </article>`;
}

function resetCards() {
  console.log(slides)
  while (slides.firstChild) {
    slides.removeChild(slides.firstChild)
  }
}