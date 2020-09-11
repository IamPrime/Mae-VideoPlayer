const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');
const controlsContainer = document.querySelector('.video-container .ctrls-container');

const playPauseBtn = document.querySelector('.video-container .controls button.play');
const playBtn = playPauseBtn.querySelector('.playing');
const pauseBtn = playPauseBtn.querySelector('.paused');

const rewindBtn = document.querySelector('.video-container .controls button.rewind');
const forwardBtn = document.querySelector('.video-container .controls button.forward');

const volumeBtn = document.querySelector('.video-container .controls button.volume');
const volFullBtn = volumeBtn.querySelector('.vol-f');
const volMuteBtn = volumeBtn.querySelector('.vol-x');

const fullscreenBtn = document.querySelector('.video-container .controls button.fullscreen');
const maxScreenBtn = fullscreenBtn.querySelector('.maximize');
const minScreenBtn = fullscreenBtn.querySelector('.minimize');

const progressBar = document.querySelector('.video-container .progress-ctrls .progress-bar')
const progress = document.querySelector('.video-container .progress-ctrls .progress-bar .progress');

let controlsTimeout;
controlsContainer.style.display = 'none';

progress.style.width = '0px';
pauseBtn.style.display = 'none';

volMuteBtn.style.display = 'none';
minScreenBtn.style.display = 'none';

const timeLeft = document.querySelector('.video-container .progress-ctrls .time-left');

const displayCtrls = () =>{
    controlsContainer.style.display = '';
    document.body.style.cursor = 'initial'
    if(controlsTimeout){
        clearTimeout(controlsTimeout);
    }
    controlsTimeout = setTimeout( () => {
        controlsContainer.style.display = 'none';
        document.body.style.cursor = 'none'
    }, 7000);
}

const playPause = () =>{
    if(video.paused || video.ended) {
        video.play();

        playBtn.style.display = 'none';
        pauseBtn.style.display = '';
    }
    else{
        video.pause();

        playBtn.style.display = '';
        pauseBtn.style.display = 'none';
    }
};

const toggleMute = () =>{
    if (video.muted){
        volFullBtn.style.display = '';
        volMuteBtn.style.display = 'none';
    }
    else{
        volFullBtn.style.display = 'none';
        volMuteBtn.style.display = '';
    }

    video.muted = !video.muted;
};

const toggleFullscreen = () =>{
    if(!document.fullscreenElement){
        videoContainer.requestFullscreen();

        maxScreenBtn.style.display = 'none';
        minScreenBtn.style.display = '';
    }else{
        document.exitFullscreen();

        maxScreenBtn.style.display = '';
        minScreenBtn.style.display = 'none';
    }
}

const toggleRewindBtn = () =>{
    video.currentTime -= 10;
}

const toggleForwardBtn = () =>{
    video.currentTime += 10;
}

document.addEventListener('keyup', (event) => {
    if(event.keyCode === 32){
        playPause();
    }

    if(event.keyCode === 77){
        toggleMute();
    }

    if(event.keyCode === 70){
        toggleFullscreen();
    }

    if(event.keyCode === 39){
        toggleForwardBtn();
    }

    if(event.keyCode === 37){
        toggleRewindBtn();
    }
});

document.addEventListener('mousemove', (event) =>{
    displayCtrls();
});

video.addEventListener('timeupdate', () =>{
    progress.style.width = ((video.currentTime / video.duration) * 100) + '%';

    const totalSecsLeft = video.duration - video.currentTime;

    /**const hoursLeft = Math.floor(totalSecsLeft / 3600);
    const minsLeft = Math.floor(totalSecsLeft / 60);
    const secsLeft = Math.floor(totalSecsLeft - minsLeft * 60);

    timeLeft.textContent = `${hoursLeft ? hoursLeft : '00'}:${minsLeft.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;**/

    const time = new Date(null);
    time.setSeconds(totalSecsLeft);
    let hours = null;
    
    if(totalSecsLeft >= 3600){
    hours = (time.getHours().toString()).padStart('2', '0'); }
    
    let minutes = (time.getMinutes().toString()).padStart('2', '0');
    let seconds = (time.getSeconds().toString()).padStart('2', '0');

    timeLeft.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`;
})

progressBar.addEventListener('click', (event) => {
    const pbar = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft))/ progressBar.offsetWidth;
    video.currentTime = pbar * video.duration;
})

playPauseBtn.addEventListener('click', playPause)

rewindBtn.addEventListener('click', toggleRewindBtn)

forwardBtn.addEventListener('click', toggleForwardBtn)

volumeBtn.addEventListener('click', toggleMute)

fullscreenBtn.addEventListener('click', toggleFullscreen)
