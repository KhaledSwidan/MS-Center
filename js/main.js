let preloader = document.querySelector("#preloader");
if (preloader) window.addEventListener("load", () => preloader.remove());

window.addEventListener("load", () => {
  const container = document.querySelector(".container"),
    playPauseBtn = container.querySelector(".play-pause"),
    mainAudio = container.querySelector("#main-audio"),
    progressArea = container.querySelector(".progress-area"),
    progressBar = progressArea.querySelector(".progress-bar");

  let isPlaying = false;

  const playMusic = () => {
    isPlaying = true;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    mainAudio.play();
  };
  const pauseMusic = () => {
    isPlaying = false;
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    mainAudio.pause();
  };
  playPauseBtn.addEventListener("click", () =>
    isPlaying ? pauseMusic() : playMusic()
  );

  mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
  });

  progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
  });
});
