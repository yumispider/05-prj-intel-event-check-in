const checkInButton = document.getElementById("checkInForm");
const totalCountElement = document.getElementById("attendeeCount");
let totalCount = parseInt(totalCountElement.textContent);

checkInButton.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Display the greeting message
  const greetingMessage = document.getElementById("greeting");
  const nameInput = document.getElementById("attendeeName").value;
  const teamInput = document.getElementById("teamSelect").value;

  if (nameInput.trim() !== "" && teamInput !== "") {
    greetingMessage.textContent = `Welcome, ${nameInput}! You have successfully checked in to team ${teamInput}.`;
  }

  // Increment the attendance count for the appropriate team
  const teamCountElement = document.getElementById(`${teamInput}Count`);
  let currentCount = parseInt(teamCountElement.textContent);
  teamCountElement.textContent = currentCount + 1;

  // Increment the total attendance count
  if (totalCount < 50) {
    totalCount++;
  }

  totalCountElement.textContent = totalCount;

  // Update the progress bar
  const progressPercent = totalCount / 50; // Assuming a goal of 50 attendees
  setProgressBar(progressPercent);

  if (totalCount == 50) {
    const celebrationMessage = document.getElementById("celebrationMessage");
    celebrationMessage.innerHTML = `<i class="fas fa-trophy"></i><p>Congratulations! All attendees have checked in!</p>`;
    celebrationMessage.style.display = "block";
  }
});

function setProgressBar(newPercent) {
  if (newPercent <= 1) {
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = `${newPercent * 100}%`;
  }
}
