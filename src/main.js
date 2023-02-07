// play & pause
const playPauseBtn = document.querySelector(".play-pause-btn");
const playBtn = document.querySelector(".paly-btn");
const pauseBtn = document.querySelector(".pause-btn");
// video & container
const video = document.querySelector(".video");
const container = document.querySelector(".container-video");
// timeline
const progressBar = document.querySelector(".progressBar-container");
const thumb = document.querySelector(".thumb");
const durationTime = document.querySelector(".duration-time");
const currentTime = document.querySelector(".current-time");
// speed time
const forwardTime = document.querySelector(".forward-time");
const backTime = document.querySelector(".backward-time");
// forward & backward time
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
// mode view
const fullScreen = document.querySelector(".full-screen");
const fullScreenExit = document.querySelector(".full-screen-exit");
const miniScreen = document.querySelector(".miniScreen");
const fullScreenOpen = document.querySelector(".full-screen-open");
// volume
const volume = document.querySelector(".volume");
const showPercentValue = document.querySelector(".show-percent-value");
const volumeBtn = document.querySelector(".volume-btn");
const slider = document.querySelector(".slider");
const rateSpeed = document.querySelector(".speed-rate");
const speedBtn = document.querySelector(".speed-btn");
const centerIcon = document.querySelector(".center-icon");
// preview
const previewImg = document.querySelector(".preview-img");
const upTime = document.querySelector(".upTime");
// screen shot
const closeModalBtn = document.querySelector(".close-btn-modal");
const modal = document.querySelector(".modal");
const screenShotBtn = document.querySelector(".screen-shot-btn");
const screenShotImg = document.querySelector(".shot-image");
const saveBtn = document.querySelector(".sava-btn");
const clipboardBtn = document.querySelector(".clipboard-btn");
// dark mode
const DarkIcon = document.querySelector(".dark-icon");
const LightIcon = document.querySelector(".light-icon");
const themeToggle = document.querySelector(".theme-toggle");
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme : dark").matches;
// title video
const videoTitle = document.querySelector(".video-title");
const videoTitleChange = document.querySelector(".video-title-change");
// subtitle or caption
const subtitleBtn = document.querySelector(".subtitle-btn");
// information key
const info = document.querySelector(".info");
const infoBtn = document.querySelector(".info-btn");

// info for shortcuts
infoBtn.addEventListener("click", infoVideo);
function infoVideo() {
  if (info.classList.contains("hidden")) {
    info.classList.remove("hidden");
  } else {
    info.classList.add("hidden");
  }
}
info.addEventListener("mouseleave", () => {
  setTimeout(() => {
    info.classList.toggle("hidden");
  }, 700);
});
// subtitle or caption
const subtitle = video.textTracks[0];
subtitle.mode = "hidden";
subtitleBtn.addEventListener("click", captionHandler);
function captionHandler() {
  const isHidden = subtitle.mode === "hidden";
  subtitle.mode = isHidden ? "showing" : "hidden";
  subtitleBtn.classList.toggle("border-b-[2px]");
}
// get title video
let videoSrc = video.src;
let srcSplitVideo = videoSrc.split("/");
let SrcIndexVideo = srcSplitVideo[srcSplitVideo.length - 1];
let splitNameVideo = SrcIndexVideo.split(".");
let indexNameVideo = splitNameVideo[splitNameVideo.length - 2];
let NameVideo = indexNameVideo.split("-");
let mainNameVideo = NameVideo.join(" ");
videoTitleChange.textContent = mainNameVideo;

// dark mode : theme check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    DarkIcon.classList.add("hidden");
    return;
  }
  LightIcon.classList.add("hidden");
};
// dark mode : call theme switch on clicking buttons
themeToggle.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    DarkIcon.classList.toggle("hidden");
    LightIcon.classList.toggle("hidden");
    return;
  }
  {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    DarkIcon.classList.toggle("hidden");
    LightIcon.classList.toggle("hidden");
  }
});
themeCheck();
// play & pause  video
video.addEventListener("click", togglePlay);
playBtn.addEventListener("click", togglePlay);
function togglePlay() {
  video.paused || video.ended ? video.play() : video.pause();
}
video.addEventListener("play", () => {
  playPauseBtn.classList.toggle("playing");
});
video.addEventListener("pause", () => {
  playPauseBtn.classList.toggle("playing");
});
// progress bar
progressBar.addEventListener("click", updateTime);
function updateTime(e) {
  const numPercent = e.offsetX / progressBar.offsetWidth;
  const percent = numPercent * 100;
  video.currentTime = numPercent * video.duration;
  thumb.style.setProperty("--progress", `${percent}%`);
}
// Time : hover time & preview image
progressBar.addEventListener("mousemove", getTimeCurrent);

function getTimeCurrent(e) {
  e.preventDefault();
  // preview image
  const leftTime = e.offsetX;
  const length = progressBar.offsetWidth;
  const percent = e.offsetX / length;
  const leftPreview = length * 0.06;
  const rightPreview = length * 0.954;
  upTime.style.setProperty("--upTime", `${leftTime}px`);
  if (percent < 0.053) {
    previewImg.style.setProperty("--upTime", `${leftPreview}px`);
  } else if (percent > 0.95) {
    previewImg.style.setProperty("--upTime", `${rightPreview}px`);
  } else {
    previewImg.style.setProperty("--upTime", `${leftTime}px`);
  }
  const imgPrev = Math.ceil((percent * video.duration) / 10);
  const imgPrevSrc = `/src/img/preview/image${imgPrev}.jpg`;
  previewImg.src = imgPrevSrc;
  // preview time
  const nowTime = percent * video.duration;
  upTime.textContent = formatTime(nowTime);

  progressBar.style.setProperty("--preview", `${leftTime}px`);
}

progressBar.addEventListener("mouseenter", () => {
  previewImg.classList.remove("hidden");
});
progressBar.addEventListener("mouseleave", () => {
  previewImg.classList.add("hidden");
});
// Time : current & duration
video.addEventListener("loadeddata", () => {
  durationTime.textContent = formatTime(video.duration);
});
video.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(video.currentTime);
  let uptime = (video.currentTime / video.duration) * 100;
  thumb.style.setProperty("--progress", `${uptime}%`);
  progressBar.style.setProperty("--progress", `${uptime}%`);
});

// digit round time
const addZeroToTime = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
// format time
function formatTime(t) {
  const hours = Math.floor(t / 3600);
  const minutes = Math.floor(t / 60) % 60;
  const seconds = Math.floor(t % 60);
  if (hours === 0) {
    return `${addZeroToTime.format(minutes)}:${addZeroToTime.format(seconds)}`;
  } else {
    return `${hours}:${addZeroToTime.format(minutes)}:${addZeroToTime.format(seconds)}`;
  }
}
// Time : forward & backward
forwardTime.addEventListener("click", () => skipForward());
backTime.addEventListener("click", () => skipBackward());
function skipForward() {
  video.currentTime += 5;
  forwardBtn.classList.remove("hidden");
  setTimeout(() => {
    forwardBtn.classList.add("hidden");
  }, 250);
}
function skipBackward() {
  video.currentTime -= 5;
  backwardBtn.classList.remove("hidden");
  setTimeout(() => {
    backwardBtn.classList.add("hidden");
  }, 250);
}
// view : button full screen
fullScreen.addEventListener("click", fullScreenHandler);
function fullScreenHandler() {
  if (document.fullscreenElement == null) {
    container.requestFullscreen();
    fullScreenOpen.classList.add("hidden");
    fullScreenExit.classList.remove("hidden");
  } else {
    document.exitFullscreen();
    fullScreenOpen.classList.remove("hidden");
    fullScreenExit.classList.add("hidden");
  }
}
// view : enable full screen instead native
document.addEventListener("fullscreenchange", () => {
  container.classList.toggle("fullscreen", document.fullscreenElement);
});
// view : full picture to picture
video.addEventListener("enterpictureinpicture", () => {
  video.classList.add("mini-picture");
});
video.addEventListener("leavepictureinpicture", () => {
  video.classList.remove("mini-picture");
});
miniScreen.addEventListener("click", miniScreenHandler);
function miniScreenHandler() {
  if (video.classList.contains("mini-picture")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}
// volume : control
volume.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});
video.addEventListener("volumechange", (e) => {
  const valueVolume = video.volume;
  let showVolume;
  if (video.muted) {
    showVolume = 0;
  } else {
    showVolume = (valueVolume * 100).toFixed(0);
  }
  showPercentValue.textContent = `${showVolume}%`;
});
// volume : mute
volumeBtn.addEventListener("click", muteHandler);
function muteHandler() {
  video.muted = !video.muted;
}
video.addEventListener("volumechange", () => {
  volume.value = video.volume;
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volume.value = 0;
    volumeLevel = "muted";
  } else if (video.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }
  container.dataset.volumeLevel = volumeLevel;
});
//  change volume video with arrow up & down
video.volume = 0.5;
function volumeUp() {
  video.volume += 0.1;
}
function volumeDown() {
  video.volume -= 0.1;
}
// show & hide buttons
var time1;
const hideButton = () => {
  if (video.paused) return;
  time1 = setTimeout(() => {
    slider.classList.add("opacity-0");
    videoTitle.classList.add("opacity-0");
    infoBtn.classList.add("opacity-0");
    info.classList.add("hidden");
  }, 3000);
};
hideButton();
container.addEventListener("mousemove", () => {
  slider.classList.remove("opacity-0");
  videoTitle.classList.remove("opacity-0");
  infoBtn.classList.remove("opacity-0");
  clearTimeout(time1);
  hideButton();
});
// speed time
rateSpeed.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    video.playbackRate = item.dataset.speed;
    rateSpeed.querySelector("li.active").classList.remove("active");
    item.classList.add("active");
  });
});
speedBtn.addEventListener("click", () => {
  rateSpeed.classList.toggle("hidden");
});
let showRate;
rateSpeed.addEventListener("mouseleave", () => {
  showRate = setTimeout(() => {
    rateSpeed.classList.add("hidden");
  }, 2000);
});
rateSpeed.addEventListener("mousemove", () => {
  clearTimeout(showRate);
});
// icon center
video.addEventListener("playing", function () {
  centerIcon.style.opacity = 0;
});
video.addEventListener("pause", function () {
  centerIcon.style.opacity = 1;
});
// modal : close button
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  video.play();
});
// screen shot
screenShotBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  takeScreenShot();
});
function takeScreenShot() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  var dataURI = canvas.toDataURL("image/png");
  screenShotImg.src = dataURI;
  video.pause();
}
// save image screenshot in device client
saveBtn.addEventListener("click", () => {
  let url = screenShotImg.src;
  saveBtn.href = url;
  saveBtn.download = "image.png";
  saveBtn.click();
});

// save image screenshot to clipboard client
clipboardBtn.addEventListener("click", () => {
  copyPicture();
});
async function copyPicture() {
  try {
    const src = screenShotImg.src;
    const response = await fetch(src);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
  } catch (err) {
    console.error(err.name, err.message);
  }
}
// management video player with keyboard
document.addEventListener("keydown", (i) => {
  const tagName = document.activeElement.tagName.toLowerCase();
  if (tagName === "input") return;
  switch (i.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
    case "k":
      togglePlay();
      break;
    case "f":
      fullScreenHandler();
      break;
    case "i":
      miniScreenHandler();
      break;
    case "m":
      muteHandler();
      break;
    case "c":
      captionHandler();
      break;
    case "arrowup":
      volumeUp();
      break;
    case "arrowdown":
      volumeDown();
      break;
    case "arrowright":
      skipForward();
      break;
    case "arrowleft":
      skipBackward();
      break;
  }
});
