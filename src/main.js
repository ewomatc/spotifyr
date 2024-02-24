document.addEventListener("DOMContentLoaded", () => {
	if (localStorage.getItem("accessToken")) {
		window.location.href = "./dashboard/dashboard.html";
	} else {
		window.location.href = "./login/login.html";
	}
});

// this script is linked in the index,html file. it simply checks if the user is logged in in their browser by attempting to access the access token. it shows the dashboartd if theyre loged in and the login screen if they are not.
