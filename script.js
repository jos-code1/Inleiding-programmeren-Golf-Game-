const ball = document.querySelector(".ball");
const club = document.querySelector(".club");
const needle = document.querySelector(".needle");
const hitRange = document.querySelector(".selector").offsetWidth - 20;

const hitResult = document.getElementById("hitResult");
const hitAudio = document.getElementById("hit");
const missAudio = document.getElementById("miss");

let hits = 0;
let misses = 0;

function updateScore() {
  let scoreElement = document.querySelector("h2"); // Select the score element
  // Update the text of the score element with the number of hits and misses
  scoreElement.textContent = `Hits: ${hits} | Misses: ${misses}`;
}

// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startNeedle() {
  needle.classList.remove("needlePause");
  needle.classList.add("needlePlay");
}

function pauseNeedle() {
  needle.classList.remove("needlePlay");
  needle.classList.add("needlePause");
}

function swingClub() {
  club.classList.add("swinging");
}
function stopClub() {
  club.classList.remove("swinging");
}

function resetRound() {
  console.log("RESET ROUND");
  startNeedle();
  stopClub();
}

function showHitResult(wasHit, message) {
  if (wasHit) {
    hitAudio.play();

    hitResult.classList.remove("miss");
    hitResult.classList.add("hit");
    hitResult.innerHTML = message;
    hits++; // Increase the number of hits
  } else {
    missAudio.play();

    hitResult.classList.remove("hit");
    hitResult.classList.add("miss");
    hitResult.innerHTML = message;
    misses++; // Increase the number of misses
  }
  hitResult.style.display = "block";
  setTimeout(() => {
    hitResult.style.display = "none";
  }, 2000);
}

function hideBall() {
  setTimeout(() => {
    ball.style.display = "none";
    setTimeout(() => {
      ball.style.display = "block";
    }, 2000);
  }, 650);
}

function hitAndDetermineScore() {
  const randomChance = getRandomInt(0, 5);
  const randomFactor = randomChance <= 1 ? 0 : 1;
  const skill = (needle.offsetLeft / hitRange) * 100;
  const hitProbability = randomFactor * skill;

  console.log("RandomChance: " + randomChance);
  console.log("Skill: " + skill);
  console.log("HitProbability: " + hitProbability);

  setTimeout(() => {
    if (hitProbability > 50) {
      showHitResult(true, "Perfect swing! You hit the ball!");
    } else {
      showHitResult(false, "Oops! You missed the ball!");
    }

    updateScore();
    resetRound();
  }, 2000);
}

// Function to handle swing action
function swing() {
  pauseNeedle();
  swingClub();
  hideBall();
  hitAndDetermineScore();
}
