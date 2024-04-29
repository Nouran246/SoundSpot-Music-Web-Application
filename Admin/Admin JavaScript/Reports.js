function toggleUserReports() {
  var userReports = document.getElementById("user-reports");
  var appStatistics = document.getElementById("app-statistics");

  userReports.style.display = "block";
  appStatistics.style.display = "none";
}

function toggleAppStatistics() {
  var userReports = document.getElementById("user-reports");
  var appStatistics = document.getElementById("app-statistics");

  userReports.style.display = "none";
  appStatistics.style.display = "block";
}
function toggleAll(){
    var userReports = document.getElementById("user-reports");
    var appStatistics = document.getElementById("app-statistics");
  
    userReports.style.display = "block";
    appStatistics.style.display = "block";
}

function resolveIssue() {
    // Get the status element that triggered the function
    var button = event.target;
    var report = button.closest('.report');
    var statusElement = report.querySelector('.status');
  
    // Get the current status text
    var currentStatus = statusElement.textContent.trim();
  
    // Toggle the status between "Resolved" and "Pending"
    var newStatus = (currentStatus === "Resolved") ? "Pending" : "Resolved";
  
    // Update the status text
    statusElement.textContent = newStatus;
  }
  
  

  function emailUser() {
    // Extract the email address from the user report button that triggered the function
    var reportElement = event.target.closest('.report');
    var emailElement = reportElement.querySelector("p:nth-child(2)"); // Assuming the email is the second <p> element
  
    if (emailElement) {
      var email = emailElement.textContent.trim();
      // Open the email form with the recipient field pre-filled with the extracted email address
      window.location.href = "mailto:" + email;
    } else {
      console.log("Email address not found for the user.");
    }
  }
document.addEventListener('DOMContentLoaded', function() {
    // Chart for revenue
    var revenueCtx = document.getElementById('myChart').getContext('2d');
    var revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'New Users per month',
                data: [20, 50, 30, 200, 100, 200, 400],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Chart for total songs (line chart)
    var songsCtx = document.getElementById('songsChart').getContext('2d');
    var songsChart = new Chart(songsCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Total Songs added this month',
                data: [300, 350, 500, 800, 700, 600, 650],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

   // Chart for most played song (pie chart)
var mostPlayedCtx = document.getElementById('mostPlayedChart').getContext('2d');
var mostPlayedChart = new Chart(mostPlayedCtx, {
    type: 'pie',
    data: {
        labels: ['Song A', 'Song B', 'Song C', 'Song D', 'Song E'], // Replace with your song names
        datasets: [{
            label: 'Number of Plays',
            data: [200, 150, 300, 250, 400], // Replace with the number of plays for each song
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        aspectRatio: 3, // Set the aspect ratio to control the width and height
        responsive: true, // Disable responsiveness
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }
});

var activeUsersCtx = document.getElementById('activeUsersChart').getContext('2d');
var activeUsersChart = new Chart(activeUsersCtx, {
    type: 'line',
    data: {
        labels: ['0-6h', '6-12h', '12-18h', '18-24h'],
        datasets: [{
            label: 'Active Users (Last 24 Hours)',
            data: [100, 150, 200, 50],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

var playlistsCtx = document.getElementById('playlistsChart').getContext('2d');
    var playlistsChart = new Chart(playlistsCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Replace with your months
            datasets: [{
                label: 'Total Playlists Created',
                data: [100, 120, 150, 180, 200, 220, 250], // Replace with the playlists data for each month
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

// Chart for Free Subscribers - Pie chart
var freeSubscribersCtx = document.getElementById('freeSubscribersChart').getContext('2d');
var freeSubscribersChart = new Chart(freeSubscribersCtx, {
    type: 'pie',
    data: {
        labels: ['Free Subscribers', 'Non-Free Subscribers'],
        datasets: [{
            label: 'Subscribers',
            data: [800, 200],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        aspectRatio: 3, // Set the aspect ratio for the pie chart
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }
});

// Chart for Premium Subscribers - Pie chart
var premiumSubscribersCtx = document.getElementById('premiumSubscribersChart').getContext('2d');
var premiumSubscribersChart = new Chart(premiumSubscribersCtx, {
    type: 'pie',
    data: {
        labels: ['Premium Subscribers', 'Non-Premium Subscribers'],
        datasets: [{
            label: 'Subscribers',
            data: [200, 800],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        aspectRatio: 3, // Set the aspect ratio for the pie chart
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    }
});

// Chart for Total Revenue - Bar chart
var revenueCtx = document.getElementById('revenueChart').getContext('2d');
var revenueChart = new Chart(revenueCtx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // Replace with your months
        datasets: [{
            label: 'Total Revenue',
            data: [10000, 15000, 20000, 25000, 30000, 35000, 40000], // Replace with the revenue data for each month
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});










});
