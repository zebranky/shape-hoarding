var el = document.getElementById("cr-stage");
// TODO: decide on better listeners
el.addEventListener("click", toggleFullScreen, false);
el.addEventListener("touchstart", toggleFullScreen, false);

function toggleFullScreen() {
  if (!document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement ) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

if (("standalone" in window.navigator) && !window.navigator.standalone) {
  // TODO: provide better notification to iPad/iPhone users
  alert("Add to Home Screen!");
}