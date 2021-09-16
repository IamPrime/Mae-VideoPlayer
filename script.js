/** Query Selectors */
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');
const currentVid = document.getElementById('currentVid');
const controlsContainer = document.querySelector('.video-container .ctrls-container');

const playPauseBtn = document.querySelector('.video-container .controls button.play');
const playBtn = playPauseBtn.querySelector('.playing');
const pauseBtn = playPauseBtn.querySelector('.paused');

const stopBtn = document.querySelector('.stop');
const stoppedBtn = document.querySelector('.stopped');

const rewindBtn = document.querySelector('.video-container .controls button.rewind');
const forwardBtn = document.querySelector('.video-container .controls button.forward');

const volumeBtn = document.querySelector('.video-container .controls button.volume');
const volFullBtn = volumeBtn.querySelector('.vol-f');
const volMuteBtn = volumeBtn.querySelector('.vol-x');

const playlistName = document.querySelector('.playlistName');
const author = document.querySelector('.author');

// Working on this section
const captionsBtn = document.querySelector('.captions');
const episodesBtn = document.querySelector('.video-container .controls button.episodes');
const closeListBtn = episodesBtn.querySelector('.closeList');
const openListBtn = episodesBtn.querySelector('.openList');
// above this line

const nextPrevBtn = document.querySelector('.video-container .controls button.next');
const nextBtn = nextPrevBtn.querySelector('.nextPlay');
const prevBtn = nextPrevBtn.querySelector('.lastPlay');

const castBtn = document.querySelector('.chromecast');

const fullscreenBtn = document.querySelector('.video-container .controls button.fullscreen');
const maxScreenBtn = fullscreenBtn.querySelector('.maximize');
const minScreenBtn = fullscreenBtn.querySelector('.minimize');

const timeLeft = document.querySelector('.video-container .progress-ctrls .time-left');
const progressBar = document.querySelector('.video-container .progress-ctrls .progress-bar')
const progress = document.querySelector('.video-container .progress-ctrls .progress-bar .progress');
/** End of Query Selectors */

/** Other Functions */
let videoIndex = 0;

let controlsTimeout;
controlsContainer.style.display = 'none';

progress.style.width = '0px';
pauseBtn.style.display = 'none';

volMuteBtn.style.display = 'none';
minScreenBtn.style.display = 'none';

prevBtn.style.display = 'none';
timeLeft.style.display = 'none';

closeListBtn.style.display = 'none'

const loadVideo = (indexNum) => {
    author.innerText = playList[indexNum].author;
    playlistName.innerText = playList[indexNum].name;
    video.poster = playList[indexNum].poster;
    currentVid.src = `videos/${playList[indexNum].src}`;

    playBtn.style.display = '';
    pauseBtn.style.display = 'none';
}

const displayCtrls = () => {
    controlsContainer.style.display = '';
    document.body.style.cursor = 'initial'
    if (controlsTimeout) {
        clearTimeout(controlsTimeout);
    }
    controlsTimeout = setTimeout(() => {
        controlsContainer.style.display = 'none';
        document.body.style.cursor = 'none'
    }, 7000);
}

const playPause = () => {
    if (video.paused || video.ended) {
        video.play();

        playBtn.style.display = 'none';
        pauseBtn.style.display = '';
        timeLeft.style.display = ''
    }
    else {
        video.pause();

        playBtn.style.display = '';
        timeLeft.style.display = ''
        pauseBtn.style.display = 'none';
    }
};

const stop = () => {
    if (video.play || video.pause) {
        video.pause();
        video.currentTime = 0;

        playBtn.style.display = '';
        pauseBtn.style.display = 'none';
    }
    else {
        video.ended = true;
    }
};

const toggleMute = () => {
    if (video.muted) {
        volFullBtn.style.display = '';
        volMuteBtn.style.display = 'none';
    }
    else {
        volFullBtn.style.display = 'none';
        volMuteBtn.style.display = '';
    }

    video.muted = !video.muted;
};

const nextPrev = () => {
    if (videoIndex < playList.length) {
        videoIndex++;
        loadVideo(videoIndex);

        nextBtn.style.display = ''
        prevBtn.style.display = 'none'
        timeLeft.style.display = 'none'
    }
    else {
        videoIndex = 0;
        loadVideo(videoIndex);

        prevBtn.style.display = ''
        nextBtn.style.display = 'none'
        timeLeft.style.display = 'none'
    }
};

const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();

        maxScreenBtn.style.display = 'none';
        minScreenBtn.style.display = '';
    } else {
        document.exitFullscreen();

        maxScreenBtn.style.display = '';
        minScreenBtn.style.display = 'none';
    }
}

const toggleRewindBtn = () => {
    video.currentTime -= 10;
}

const toggleForwardBtn = () => {
    video.currentTime += 10;
}

const toggleCastBtn = () => {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    }
    else {
        if (document.pictureInPictureEnabled) {
            video.requestPictureInPicture();
        }
    }
}
/** End of Other Functions */

/** Event Listeners */

window.addEventListener('load', () => {
    loadVideo(videoIndex);
})

document.addEventListener('keyup', (event) => {
    if (event.keyCode === 32) {
        playPause();
    }

    if (event.keyCode === 77) {
        toggleMute();
    }

    if (event.keyCode === 70) {
        toggleFullscreen();
    }

    if (event.keyCode === 39) {
        toggleForwardBtn();
    }

    if (event.keyCode === 37) {
        toggleRewindBtn();
    }

    if (event.keyCode === 38) {
        nextPrev();
    }

    if (event.keyCode === 9) {
        toggleCastBtn();
    }
});

document.addEventListener('mousemove', (event) => {
    displayCtrls();
});

video.addEventListener('timeupdate', () => {
    progress.style.width = ((video.currentTime / video.duration) * 100) + '%';
    const totalSecsLeft = video.duration - video.currentTime;

    /**===Commented Code Also works===
     * const hoursLeft = Math.floor(totalSecsLeft / 3600);
    const minsLeft = Math.floor(totalSecsLeft / 60);
    const secsLeft = Math.floor(totalSecsLeft - minsLeft * 60);

    timeLeft.textContent = `${hoursLeft ? hoursLeft : '00'}:${minsLeft.toString().padStart(2, '0')}:${secsLeft.toString().padStart(2, '0')}`;**/

    const time = new Date(null);
    time.setSeconds(totalSecsLeft);
    let hours = null;

    if (totalSecsLeft >= 3600) {
        hours = (time.getHours().toString()).padStart('2', '0');
    }

    let minutes = (time.getMinutes().toString()).padStart('2', '0');
    let seconds = (time.getSeconds().toString()).padStart('2', '0');

    timeLeft.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`;
})

progressBar.addEventListener('click', (event) => {
    const pbar = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pbar * video.duration;
})

playPauseBtn.addEventListener('click', playPause)

stoppedBtn.addEventListener('click', stop)

rewindBtn.addEventListener('click', toggleRewindBtn)

forwardBtn.addEventListener('click', toggleForwardBtn)

volumeBtn.addEventListener('click', toggleMute)

nextPrevBtn.addEventListener('click', nextPrev)

castBtn.addEventListener('click', toggleCastBtn)

fullscreenBtn.addEventListener('click', toggleFullscreen)
/** End of Event Listeners */
