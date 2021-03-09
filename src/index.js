// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import glide, {config} from './glide'
import Glide, {Controls, Breakpoints} from '@glidejs/glide/dist/glide.modular.esm'

// import './glide'
import './css/base.scss';
import HotelRepository from './hotel-repository';
import Customer from './customer';
import Room from './Room';
import Booking from './Booking';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/pexels-pixabay-271624.jpg'
import './images/error.svg'

const customersUrl = 'https://boiling-spire-83118.herokuapp.com/api/v1/customers';
const roomsUrl = 'https://boiling-spire-83118.herokuapp.com/api/v1/rooms';
const bookingsUrl = 'https://boiling-spire-83118.herokuapp.com/api/v1/bookings';
let hotelRepo = null;
let customer = null;

const header = document.querySelector('header');
const profileButton = document.querySelector('#profileIcon');
const dropdownMenu = document.querySelector('.dropdown-content');
let yourStays = dropdownMenu.querySelector('button');
const currentRoomContainer = document.querySelector('.current-room-container');
let goBackBtn = dropdownMenu.querySelector('.go-back');
const profileName = dropdownMenu.querySelector('h1');
const totalSpent = document.querySelector('.total-spent');
const dateInput = document.querySelector('#calendarIcon');
const selectDropdwn = document.querySelector('select')
const glideTrack = document.querySelector('.glide__track')
const slides = document.createElement('ul');
const glideArrows = document.querySelectorAll('.glide__arrow');
const bookMsg = document.querySelector('.booked-msg');
const loginContainer = document.querySelector('.log-in-page');
const loginForm = document.querySelector('.login');
glideTrack.append(slides);
slides.classList.add('glide__slides');
let currentGlide = null;
let activeType = null;
let featuredRoom = null;
let activeDate = null;


const getCustomerData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());



profileButton.addEventListener('click', () => {
  if (customer) {
    buildProfile()
    dropdownMenu.classList.toggle('visible')
  } else {
    loginContainer.classList.toggle('hidden');
  }
})

yourStays.addEventListener('click', showRoomsBooked);
goBackBtn.addEventListener('click', refreshProfile);
dateInput.addEventListener('change', filterDate);
selectDropdwn.addEventListener('change', filterByType);
glideTrack.addEventListener('click', selectRoom);
currentRoomContainer.addEventListener('click', bookRoom);
loginForm.addEventListener('submit', logIn);


Promise.all([getCustomerData, getRoomsData, getBookingsData])
  .then((promiseArr) => {
    const roomData = addHotelData(promiseArr[1].rooms, Room);
    const bookingData = addHotelData(promiseArr[2].bookings, Booking);
    const customerData = 
    addCustomerData(promiseArr[0].customers, [roomData, bookingData]);
    hotelRepo = new HotelRepository(roomData, bookingData)
    hotelRepo.customers = customerData;
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
  currentGlide = glide;
}

function logIn(e) {
  e.preventDefault()
  const userInput = loginForm.querySelector('#userName').value;
  const userId = userInput.match(/\d+/g).map(Number)[0];
  const userName = userInput.split(userId)[0];
  const password = loginForm.querySelector('#passWord').value;
  
  if ((userId > 0 && userId <= 50) && 
  (password === 'overlook2021' && userName === 'customer')) {
    showLoginError();
    fetchUser(userId)
  } else {
    showLoginError('show');
  }
}

function fetchUser(id) {
  fetch(customersUrl + `/${id}`)
    .then(response => {
      if (response.ok) {
        customer = 
        hotelRepo.customers.find(customer => customer.id === id);
        buildPage();
      }
    })
}

function buildProfile() {
  header.querySelector('h1').innerText = customer.name;
  loginContainer.classList.add('hidden');
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
  selectDropdwn.classList.remove('vis-hidden');
  activeDate = dateInput.value.replaceAll('-', '/');
  const availableRooms = 
  customer.filterByDate(activeDate);
  buildLimitedCards(availableRooms, new Glide('.glide'));
  document.querySelector('.book-btn').classList.remove('hidden')
}

function buildCards(dataSet) {
  if (dataSet === customer.rooms) {
    glideArrows[0].classList.remove('hidden')
    glideArrows[1].classList.remove('hidden')
    dataSet.map((room) => {
      return generateRoomCard(room);
    })
    glide.mount({Controls, Breakpoints});
  } 
}

function generateRoomCard(roomObj) {
  const infoArr = determineCardInfo(roomObj)
  const slide = document.createElement('li');
  slides.append(slide);
  slide.classList.add('glide__slide', 'room-container')
  insertCardHtml(slide, infoArr[1], infoArr[0], roomObj)
}

function determineCardInfo(roomObj) {
  let bidet;
  let bed;
  roomObj.bidet ? bidet = 'Bidet' : bidet = '';
  roomObj.numBeds > 1 ?
    bed = `${roomObj.numBeds} ${roomObj.bedSize} Beds` :
    bed = `${roomObj.numBeds} ${roomObj.bedSize} Bed`;
  return [bidet, bed]
}

function insertCardHtml(slide, bed, bidet, room) {
  slide.innerHTML = 
  `<img src="./images/pexels-pixabay-271624.jpg" alt="hotel room">
  <article>${room.roomType}
  <p class="amenities">${bidet}</p>
  <p class="amenities">${bed}</p>
  <p class="amenities">Room #</p>
  <p class="number">${room.number}
  </article>`;
}

function filterByType() {
  if (selectDropdwn.value === '0') {
    buildLimitedCards(customer.availableRooms, new Glide('.glide'))
  } else {
    activeType = selectDropdwn.value;
    buildLimitedCards(customer.filterByType(activeType), new Glide('.glide'));
  }
}

function buildLimitedCards(dataSet, glide) {
  currentGlide.destroy();
  currentGlide = glide;
  currentGlide.update(config);
  if (!dataSet.length) showBookedMsg();
  else {
    removeSlides()
    dataSet.forEach(room => generateRoomCard(room))
    currentGlide.mount({Controls, Breakpoints});
  }
}

function removeSlides() {
  Array.from(slides.children).forEach(slide => {
    slide.remove();
  })
}

function selectRoom(e) {
  const roomNum = 
    Number(e.target.parentNode.querySelector('.number').innerText);
  const room = customer.rooms.find(room => room.number === roomNum);
  showCurrentRoom(room);
}

function showCurrentRoom(room) {
  currentRoomContainer.classList.remove('vis-hidden');
  featuredRoom = room;
  const bidetBeds = determineCardInfo(room);
  const infoList = currentRoomContainer.querySelector('.room-info');
  infoList.children[0].innerText = room.roomType;
  infoList.children[1].innerText = 'Room #' + room.number;
  infoList.children[2].innerText = bidetBeds[0];
  infoList.children[3].innerText = bidetBeds[1];
  currentRoomContainer.querySelector('.book-btn').innerText = 
  `$${room.costPerNight.toFixed(0)}
  Book Now`;
}

function bookRoom(e) {
  if (e.target.classList.contains('book-btn') && checkUserErrors()) {
    const postObj = {"userID": customer.id, "date": activeDate, "roomNumber": featuredRoom.number}
    fetch(bookingsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postObj)
    })
      .then(response => {
        if (response.ok) {
          hotelRepo.bookings.push(new Booking(postObj))
          filterDate()
          return response.json();
        } 
      })
  }
}

function checkUserErrors() {
  if (!activeDate) {
    return false;
  } else if (!featuredRoom) {
    return false;
  } else {
    return true;
  }
}

function showBookedMsg() {
  bookMsg.classList.remove('vis-hidden');
  const type = activeType;
  bookMsg.innerText = 
  `Sorry we have no available ${type}'s on ${activeDate}`;
}

function showLoginError(str) {
  if (str === 'show') {
    loginContainer.querySelector('.error').classList.remove('hidden')
  } else {
    loginContainer.querySelector('.error').classList.add('hidden')
  }
}