const swipeContainer = document.querySelector(".swipe-container");
const childCount = swipeContainer.children.length;

swipeContainer.style.setProperty("--n", childCount);

// This track just the first finger which is put down on the screen
function unify(event) {
  return event.changedTouches ? event.changedTouches[0] : event;
}

// x = setup coordonates : store the x value of the clicked point
let x0 = null;

const lock = event => {
  x0 = unify(event).clientX;
};

//setup the direction of the swiping gesture
let i = 0;

const move = event => {
  if (x0 || x0 === 0) {
    let distanceX = unify(event).clientX - x0,
      sign = Math.sign(distanceX);
    if ((i > 0 || sign < 0) && (i < childCount - 1 || sign > 0))
      swipeContainer.style.setProperty("--i", (i -= sign));
    x0 = null;
  }
};

swipeContainer.addEventListener("mousedown", lock, false);
swipeContainer.addEventListener("mouseup", move, false);

swipeContainer.addEventListener("touchstart", lock, false);
swipeContainer.addEventListener("touchend", move, false);

swipeContainer.addEventListener(
  "touchmove",
  event => {
    event.preventDefault();
  },
  false
);