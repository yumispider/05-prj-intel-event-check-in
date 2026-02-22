const checkInForm = document.getElementById("checkInForm");
const totalCountElement = document.getElementById("attendeeCount");
let totalCount = parseInt(totalCountElement.textContent);

let shiftPressed = false;

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Modify the attendance while totalCount is less than 50
  if (totalCount < 50) {
    // Display the greeting message
    const greetingMessage = document.getElementById("greeting");
    const nameInput = document.getElementById("attendeeName").value;
    const teamInput = document.getElementById("teamSelect").value;

    let teamName = document
      .getElementsByClassName(`team-card ${teamInput}`)[0]
      .querySelector("span.team-name").textContent;

    if (nameInput.trim() !== "" && teamInput !== "") {
      greetingMessage.textContent = `Welcome, ${nameInput}! You have successfully checked in to ${teamName}.`;
    }

    totalCount++;

    // Increment the attendance count for the appropriate team
    const teamCountElement = document.getElementById(`${teamInput}Count`);
    let currentCount = parseInt(teamCountElement.textContent);
    teamCountElement.textContent = currentCount + 1;

    // Add the attendee's name to the appropriate team members list
    const teamMembersElement = document.getElementById(`${teamInput}Members`);
    teamMembersElement.innerHTML += `<li>${nameInput}</li>`;
  }

  totalCountElement.textContent = totalCount;

  // Update the progress bar
  const progressPercent = totalCount / 50; // Assuming a goal of 50 attendees
  setProgressBar(progressPercent);

  if (totalCount == 50) {
    teamName = getHighestTeam();
    const celebrationMessage = document.getElementById("celebrationMessage");
    celebrationMessage.innerHTML = `<i class="fas fa-trophy"></i><p>Congratulations to ${teamName} with the most attending team members!</p>`;
    celebrationMessage.style.display = "block";
  }

  // Reset the form after submission
  if (!shiftPressed) {
    checkInForm.reset();
  }
});

function setProgressBar(newPercent) {
  if (newPercent <= 1) {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${newPercent * 100}%`;
  }
}

function getHighestTeam() {
  const teamList = document
    .getElementsByClassName("teams-grid")[0]
    .getElementsByClassName("team-card");

  let highestCount = 0;
  let highestTeam = "";

  for (let i = 0; i < teamList.length; i++) {
    const teamCount = parseInt(
      teamList[i].querySelector(".team-count").textContent,
    );
    if (teamCount > highestCount) {
      highestCount = teamCount;
      highestTeam = teamList[i].querySelector(".team-name").textContent;
    }
  }
  return highestTeam;
}

checkInForm.addEventListener("keydown", function (event) {
  if (event.key === "Shift") {
    shiftPressed = true;
  }
});

checkInForm.addEventListener("keyup", function (event) {
  if (event.key === "Shift") {
    shiftPressed = false;
  }
});
