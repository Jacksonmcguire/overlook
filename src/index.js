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
const bottomContainer = document.querySelector('.bottom-container');
const currentRoomImg = currentRoomContainer.querySelector('img');
let goBackBtn = dropdownMenu.querySelector('.go-back');
const profileName = dropdownMenu.querySelector('h1');
const totalSpent = document.querySelector('.total-spent');
const dateInput = document.querySelector('#calendarIcon');
const suiteBtn = document.querySelector('#type1');
const selectDropdwn = document.querySelector('select')
const singleRoomBtn = document.querySelector('#type2');
const residentialSuiteBtn = document.querySelector('#type3');
const juniorSuiteBtn = document.querySelector('#type4');
const glideTrack = document.querySelector('.glide__track')
const slides = document.createElement('ul');
const glideArrows = document.querySelectorAll('.glide__arrow');
const bookMsg = document.querySelector('.booked-msg');
glideTrack.append(slides);
slides.classList.add('glide__slides');
let currentRooms = [];
let activeType = null;
let featuredRoom = null;
let activeDate = null;
let originalSlides = null;


const getCustomerData = fetch(customersUrl).then(response => response.json());
const getRoomsData = fetch(roomsUrl).then(response => response.json());
const getBookingsData = fetch(bookingsUrl).then(response => response.json());



profileButton.addEventListener('click', () => {
  buildProfile()
  dropdownMenu.classList.toggle('visible')
})

yourStays.addEventListener('click', showRoomsBooked);
goBackBtn.addEventListener('click', refreshProfile);
dateInput.addEventListener('change', filterDate);
selectDropdwn.addEventListener('change', filterByType);
glideTrack.addEventListener('click', selectRoom);
currentRoomContainer.addEventListener('click', bookRoom);

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
  originalSlides = Array.from(slides.children);
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
  selectDropdwn.classList.remove('vis-hidden');
  activeDate = dateInput.value.replaceAll('-', '/');
  const availableRooms = 
  customer.filterByDate(activeDate);
  buildCards(availableRooms);

}

function buildCards(dataSet) {
  currentRooms = customer.availableRooms;
  if (dataSet === customer.rooms) {
    glideArrows[0].classList.remove('hidden')
    glideArrows[1].classList.remove('hidden')
    dataSet.map((room) => {
      return generateRoomCard(room);
    })
    glide.mount()

  } else if (currentRooms.length > 0) {
    buildLimitedCards(currentRooms)
    
  } else {
    console.log(currentRooms, customer.availableRooms)
    showBookedMsg();
  }
  // new Set(Array.from(slides.children))

}

function generateRoomCard(roomObj) {
  let bidet;
  roomObj.bidet ? bidet = 'Bidet' : bidet = '';
  let bed;
  roomObj.numBeds > 1 ?
    bed = `${roomObj.numBeds} ${roomObj.bedSize} Beds` :
    bed = `${roomObj.numBeds} ${roomObj.bedSize} Bed`;
  const slide = document.createElement('li');
  slides.appendChild(slide);
  slide.classList.add('glide__slide', 'room-container')
  slide.innerHTML = 
  `<img src="./images/pexels-pixabay-271624.jpg" alt="hotel room">
  <article>Amenities
    <button class="see-more">More info</button>
    <p class="amenities">${bidet}</p>
    <p class="amenities">${bed}</p>
    <p class="number">${roomObj.number}
  </article>`;
  return slide;
}

function filterByType() {
  console.log(selectDropdwn.value)
  if (selectDropdwn.value === '0') {
    buildLimitedCards(customer.availableRooms)
  } else {
    activeType = selectDropdwn.value;
    buildLimitedCards(customer.filterByType(activeType));
    
    console.log(customer.filterByType(activeType))
  }
}

function buildLimitedCards(dataSet) {
  if (dataSet.length < 4) {
    glideArrows[0].classList.add('hidden')
    glideArrows[1].classList.add('hidden')
  } else {
    glideArrows[0].classList.remove('hidden')
    glideArrows[1].classList.remove('hidden')
  }
  console.log(dataSet)
  const numToMatch = (slide => Number(slide.querySelector('.number').innerText))

  Array.from(originalSlides).forEach(slide => {
    const foundRoom = dataSet.find(room => {
      return room.number === numToMatch(slide);
    })
    if (foundRoom && !Array.from(slides.children).includes(slide)) {
      generateRoomCard(foundRoom)
    } else if (!foundRoom && Array.from(slides.children).includes(slide)) {
      removeSlide(slide);
    }
  })
  glide['_c'].Html.slides = [...slides.children];
}

function removeSlide(slide) {
  slides.removeChild(slide)
  slide.remove();
  slide.classList.add('hidden');
}

function selectRoom(e) {
  if (e.target.classList.contains('see-more')) {
    const roomNum = 
    Number(e.target.parentNode.querySelector('.number').innerText);
    const room = customer.rooms.find(room => room.number === roomNum);
    showCurrentRoom(room);
  } 
}

function showCurrentRoom(room) {
  currentRoomContainer.classList.remove('vis-hidden');
  featuredRoom = room;
  const infoList = currentRoomContainer.querySelector('.room-info');
  infoList.children[0].innerText = room.roomType;
  infoList.children[1].innerText = room.number;
  infoList.children[2].innerText = room.bidet;
  infoList.children[3].innerText = room.bedSize;
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
          return response.json();
        } 
      })
  }
}

function checkUserErrors() {
  if (!activeDate) {
    alert('Need Date')
    return false;
  } else if (!featuredRoom) {
    alert('Need Room')
    return false;
  } else {
    return true;
  }
}

function showBookedMsg() {
  bookMsg.classList.remove('vis-hidden');
  const type = activeType;
  bookMsg.innerText = 
  `Sorry we have no available ${type}'s available on ${activeDate}`;
}