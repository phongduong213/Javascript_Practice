//get reference to HTML elements
const minuteLabel = document.getElementById('minute');
const secondLabel = document.getElementById('second');
const milisecondLabel = document.getElementById('milisecond');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

const lapList = document.getElementById('lap-list');


///stopwatch variables

let minutes = 0;
let seconds = 0;
let miliseconds = 0;
let interval; //hold the interval ID for clearing the timer later



const updateTimer = () =>{
    miliseconds++;
    if (miliseconds === 100) { // 
        miliseconds = 0;
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

//function to pad the timer values with leading zeros
const displayTimer = () =>{
    milisecondLabel.textContent = padTimer(miliseconds);
    secondLabel.textContent = padTimer(seconds);
    minuteLabel.textContent = padTimer(minutes);


}

const padTimer = (time) =>{
    // Convert the 'time' value to a string and pad it with leading zeros if necessary
    // 'padStart' ensures that the resulting string is at least 2 characters long
    // If 'time' is less than 10, a '0' is added at the beginning to make it "0x" format
    return time.toString().padStart(2, '0');
}

const addLapList = () =>{
    const lapTime = `${padTimer(minutes)}:${padTimer(seconds)}:${padTimer(miliseconds)}`;

    //create a new li element
    const listItem = document.createElement('li');

    
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount+1}: </span>${lapTime}`;

    //append the new li to the lap list(ul)
    lapList.appendChild(listItem);
}

const resetTimerData = () =>{
    minutes = 0;
    seconds = 0;
    miliseconds = 0;
}

const startTimer = () =>{
    if(!interval){ //timer is not already running 
        interval = setInterval(updateTimer, 10); //call updateTimer every 10 milisecond
        startButton.disabled = true; //disable the start button while the timer is running
    }

    
}
const stopTimer = () =>{
        //stop a timer
        clearInterval(interval);
        //reset the interval
        interval=null;
        //add lap list
        addLapList();
        //reset timer data
        resetTimerData();
        
        startButton.disabled = false;
        pauseButton.disabled=false;
        resetButton.disabled=false;

}
const pauseTimer = () =>{
    //stop a timer that was previously set up
    clearInterval(interval);
    pauseButton.disabled = true; //disabled pause button

}
const resetTimer = () =>{
    //stop a timer that was previously set up by setInterval
    clearInterval(interval);
    //reset the interval
    interval=null;
    //reset timer data
    resetTimerData();
    //update the display
    displayTimer();
    //re-enable the start button
    startButton.disabled = false;
    //disable the reset button
    resetButton.disabled = true;
}


startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);