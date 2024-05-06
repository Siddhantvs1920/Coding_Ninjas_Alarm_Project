
let date=document.getElementById("date");
let timeDisplay = document.getElementById("currentTime");
const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
const setAlarmButton = document.querySelector("#submitButton");
const cancelAlarmButton = document.querySelector("#CancelButton");
const newAlarmButton = document.querySelector("#newAlarm");

const ringTone = new Audio('Iktara.mp3');
// Extract the song name from the path
const pathArray = ringTone.src.split('/');
const fileName = pathArray[pathArray.length - 1];



//new alarm button triggered
newAlarmButton.addEventListener('click', () => {
  formContainer.style.display = 'block';
  setAlarmButton.textContent='Ok';
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
    if(currentDate.getSeconds()==59){
        playSound();
    }

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

setAlarmButton.addEventListener('click',function () {
   // console.log(setAlarmButton.textContent);
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


function displayAlarms() {
    const alarmsContainer = document.getElementById('set-alarm-container');

    // Clear the container before displaying alarms
    alarmsContainer.innerHTML = '';

    // Display each alarm in the container
    alarms.forEach((alarm, index) => {
        const alarmDiv = document.createElement('div');
        alarmDiv.innerHTML = `
            <div class="time">${alarm.hour}:${alarm.minute} ${alarm.ampm}</div>
            <button class="btn delete-alarm " data-id=${index}></button>
            <p>Music :${fileName} </p>
        `;
        alarmsContainer.appendChild(alarmDiv);

        const deleteButton = alarmDiv.querySelector(".delete-alarm");

        // Delete alarm button triggered
        deleteButton.addEventListener("click", () => deleteAlarm(index));

    });
}

   // Code to delete the item
function deleteAlarm(index) {

 if (confirm("Are you sure you want to delete this Alarm?")) {
  alert("Alarm deleted successfully!");
  alarms.splice(index, 1);
  saveAlarms();
} else {
  alert("Deletion canceled.");
}
  displayAlarms();
}


// localStorage.removeItem('alarms');


//play soung when alarm is triggered
function playSound() {
  
  var time = new Date();
 time.setMinutes(time.getMinutes() + 1);
  var currentTime=  time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

  alarms.forEach(alarm => {
    var alarmTime=alarm.hour.replace(/^0+/, '')+':'+alarm.minute.replace(/^0+/, '')+' '+alarm.ampm;

    if (alarmTime == currentTime) {
        alert('Alarm Triggered : '+alarmTime);
        ringTone.play();
    }
  });
  
}

// Call the function initially

