// get elements - select all the relevant elements from the html
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build functions

function togglePlay(){
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
}
function updateButton(){
  // console.log('update the button');
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(){
  //data-skip in dom back 10 sec, or ahead 25 select
  console.log('skipping', this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
  console.log(this.value);
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function progressClick(e){
  //current click location/width of progress bar * video length
  const progressTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(progressTime);  //offsetX
  video.currentTime = progressTime;
}

// event listeners
//plays/pauses on click on video
video.addEventListener('click', togglePlay);
//changes toggle button image on pause/play
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

//plays/pauses on click on toggle button
toggle.addEventListener('click', togglePlay);

//skip
skipButtons.forEach(button => button.addEventListener('click', skip));

//handle the range sliders - type set as range (volume, playback rate)
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', progressClick);
//when mousedown if true, run progressClick, else do nothing
progress.addEventListener('mousemove', (e) => mousedown && progressClick(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
