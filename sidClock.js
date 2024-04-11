let date=document.getElementById("date");
let timeDisplay = document.getElementById("currentTime");
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
const setAlarmButton = document.querySelector("#submitButton");
const cancelAlarmButton = document.querySelector("#CancelButton");
const newAlarmButton = document.querySelector("#newAlarm");

const ringTone = new Audio('file:///C:/FrontEndSkillTest/AlarmClock/Iktara.mp3');
// Extract the song name from the path
const pathArray = ringTone.src.split('/');
const fileName = pathArray[pathArray.length - 1];



//new alarm button triggered
newAlarmButton.addEventListener('click', () => {
  formContainer.style.display = 'block';
  newAlarmButton.style.display='none';
});

//running date and time
function refreshTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    });
    const currentDate = new Date();
    const localDateString = currentDate.toLocaleDateString();

    timeDisplay.innerHTML = time;
    date.innerHTML='Date: '+localDateString;
}


setInterval(refreshTime, 1000);


//Set the Dropdown Value fo hour min field
window.addEventListener("DOMContentLoaded", (event) => {
  
    dropDownMenu(1, 12, hour);
   
    dropDownMenu(0, 59, minute);
    displayAlarms();
  
  });
  
  function dropDownMenu(start, end, element) {
    for (let i = start; i <= end; i++) {
      const dropDown = document.createElement("option");
      dropDown.value = i < 10 ? "0" + i : i;
      dropDown.innerHTML = i < 10 ? "0" + i : i;
      element.appendChild(dropDown);
    }
  }

for (let i = 2; i > 0; i--) {
    let am_pm = i == 1 ? "AM" : "PM";
    let option = `<option value="${am_pm}">${am_pm}</option>`;
    AmPm.firstElementChild.insertAdjacentHTML("afterend", option);
}

const alarms = JSON.parse(localStorage.getItem('alarms')) || [];

//set alarm button click

setAlarmButton.addEventListener('click', function() {
    const selectedHour = document.getElementById('hour').value;
    const selectedMinute = document.getElementById('minute').value;
    const selectedAmPm = document.getElementById('ampm').value;

     // Check if the user has selected valid values
     if (selectedHour === 'Hour' || selectedMinute === 'Minute' || selectedAmPm === 'AM/PM') {
      alert('Please select a valid time');
      return; // Stop further execution
    }
     const alarm = {
      hour: selectedHour,
      minute: selectedMinute,
      ampm: selectedAmPm
  };


   // Add the alarm to the array
   alarms.push(alarm);

   // Save alarms to localStorage
   saveAlarms();
   // Display all alarms
   displayAlarms();
   formContainer.style.display = 'none';
   newAlarmButton.style.display='block';
   alert('Alarm set sucessfully')

    
});

// Function to save alarms to localStorage
function saveAlarms() {
  localStorage.setItem('alarms', JSON.stringify(alarms));
}

//cancel botton triggered
cancelAlarmButton.addEventListener('click', () => {
  formContainer.style.display = 'none';
  newAlarmButton.style.display='block';

});


// Function to display all alarms
function displayAlarms() {
  const alarmsContainer = document.getElementById('set-alarm-container');

  // Clear the container before displaying alarms
  alarmsContainer.innerHTML = '';

  // Display each alarm in the container
  alarms.forEach((alarm, index) => {
      const alarmDiv = document.createElement('div');
      alarmDiv.innerHTML = `
              <div class="time">${alarm.hour}:${alarm.minute} ${alarm.ampm}
              <button class="btn delete-alarm" data-id=${index}>❌ Delete</button></div>
              <p>Music :${fileName} </p>
              `;
      alarmsContainer.appendChild(alarmDiv);
      const deleteButton = document.querySelector(".delete-alarm");
      //delete alarm button triggered
  deleteButton.addEventListener("click", () => deleteAlarm(index));
  

  });
}
function deleteAlarm(index) {
  console.log('delete '+index.value);
  alert('Alarm Deleted')
  alarms.splice(index, 1);
  saveAlarms();
  displayAlarms();
}


// localStorage.removeItem('alarms');


//play soung when alarm is triggered
function playSound() {
  
  var time = new Date();
  var currentTime=  time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  alarms.forEach(alarm => {
    var alarmTime=alarm.hour.replace(/^0+/, '')+':'+alarm.minute.replace(/^0+/, '')+' '+alarm.ampm;
    if (alarmTime == currentTime) {
      console.log('alarm triggered');
        ringTone.play();
    }
  });
  
}

// Call the function initially
playSound();

// Set up the interval to call the function every minute
const intervalId = setInterval(playSound, 60000);