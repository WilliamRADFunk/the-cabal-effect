var parse;
function init()
{
	Parse.initialize("6tAJZkpgW9kdlJhQmv1BF5TMq8weUwEaNTYE1WKp", "42UHDmrJLF6ZQrt9I016j6WmjKtEY74uT2DaRXWZ");
}
function login()
{
	var name = document.getElementById("input_username").value;
	var pwd = document.getElementById("input_pwd").value;

	Parse.User.logIn(name, pwd,
	{
		success: function(results)
		{
			console.log(results);
			loginCall(true);
		},
		error: function(error)
		{
			console.log(error);
			loginCall(false);
		}
	});
}
function loginCall(victory)
{
	if(victory)
	{
		document.getElementById("login").style.display = "none";
		document.getElementById("logout").style.display = "block";
		document.getElementById("feeds").style.display = "block";
		document.getElementsByTagName("nav")[0].style.display = "block";
	}
	else
	{
		document.getElementById("input_username").value = "";
		document.getElementById("input_pwd").value = "";
		alert("That username or password is not in our records.");
	}
}
function logout()
{
	document.getElementById("input_username").value = "";
	document.getElementById("input_pwd").value = "";
	document.getElementById("login").style.display = "block";
	document.getElementById("logout").style.display = "none";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
	document.getElementsByTagName("nav")[0].style.display = "none";
}
function register()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("register").style.display = "block";
}
function submitRegistration()
{
	var name = document.getElementById("input_reg-username").value;
	var pwd = document.getElementById("input_reg-pwd").value;
	var email = document.getElementById("input_reg-email").value;

	var user = new Parse.User();
	user.set("username", name);
	user.set("password", pwd);
	user.set("email", email);

	user.signUp(null,
	{
		success: function(user)
		{
			registrationCall(true);
		},
		error: function(user, error)
		{
			registrationCall(false);
		}
	});
}
function registrationCall(victory)
{
	if(victory)
	{
		document.getElementById("register").style.display = "none";
		document.getElementById("feeds").style.display = "block";
		document.getElementsByTagName("nav")[0].style.display = "block";
	}
	else
	{
		alert("You entered invalid data, or left a field empty.");
	}
}
function seeConspiracy(consp)
{
	console.log("Checking out this conspiracy: " + consp.id);

	document.getElementById("login").style.display = "none";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "block";
}
function share()
{
	console.log("Sharing is caring");
}
function rate(id)
{
	document.getElementById("star-1").removeAttribute("class");
	document.getElementById("star-2").removeAttribute("class");
	document.getElementById("star-3").removeAttribute("class");

	if(id === "1")
	{
		document.getElementById("star-" + id).className = "chosen";
	}
	else if(id === "2")
	{
		document.getElementById("star-1").className = "chosen";
		document.getElementById("star-" + id).className = "chosen";
	}
	else
	{
		document.getElementById("star-1").className = "chosen";
		document.getElementById("star-2").className = "chosen";
		document.getElementById("star-" + id).className = "chosen";
	}
	// TODO: Query the rating to the database.
}
function goHome()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "block";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
}
function makePost()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "block";
}
function submitPost()
{
	console.log("Makin' a pooooost");
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "block";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
}
function goSettings()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "block";
	document.getElementById("post").style.display = "none";
}
function submitSettingsChange()
{
	console.log("Changin' da settings");
	var username = document.getElementById("input_name").value;
	var password = document.getElementById("input_pass").value;
	var email = document.getElementById("input_email").value;
	var file = document.getElementById("input_file-avatar").value;

	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "block";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
}