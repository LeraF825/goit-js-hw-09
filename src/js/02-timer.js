import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let intevalTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
      if(selectedDates[0].getTime() - Date.now() < 0 ){
        btnStart.disabled = true;
        return Notiflix.Notify.warning('Please choose a date in the future')
      } else{
        btnStart.disabled = false;
      }
    },
  };
flatpickr('input#datetime-picker', options);

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
 
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  };

  function updateTime(){
    const selectedDate = new Date(inputDate.value);
    const currentDate = new Date();
    const difference = selectedDate - currentDate;
    // console.log(difference);
    const daysHoursMS = convertMs(difference);
    // console.log(daysHoursMS);

    if(difference < 0){
        clearInterval(intevalTime);
        inputDate.disabled = false;
        return;
    };

    dataDays.textContent = daysHoursMS.days;
    dataHours.textContent = daysHoursMS.hours;
    dataMinutes.textContent = daysHoursMS.minutes;
    dataSeconds.textContent = daysHoursMS.seconds;
  }

  btnStart.addEventListener('click',onStart);

  function onStart(){
    btnStart.disabled = true;
    inputDate.disabled = true;
    intevalTime = setInterval(updateTime,1000);
  }
  
  function addLeadingZero(value){
    return value.toString().padStart(2, '0');
  }