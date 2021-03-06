var parse;
var currentUser;
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
			loginCall(true);
		},
		error: function(error)
		{
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
		document.getElementById("about").style.display = "none";
		document.getElementById("register").style.display = "none";
		document.getElementById("feeds").style.display = "block";
		populateFeeds();
		document.getElementsByTagName("nav")[0].style.display = "block";
		currentUser = Parse.User.current();
	}
	else
	{
		document.getElementById("input_username").value = "";
		document.getElementById("input_pwd").value = "";
		activateModal("Invalid Login", "That username or password is not in our records.");
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
	document.getElementById("about").style.display = "none";
	document.getElementsByTagName("nav")[0].style.display = "none";
	document.getElementById("register").style.display = "none";
	Parse.User.logOut();
	activateModal("Logging out", "Come back and conspire with us again sometime.");
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
			document.getElementById("register").style.display = "none";
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
		document.getElementById("login").style.display = "block";
		document.getElementById("register").style.display = "none";
		document.getElementsByTagName("nav")[0].style.display = "block";
		activateModal("Welcome", "You're now registered with <i>The Cabal Effect</i>");
	}
	else
	{
		activateModal("Invalid Inputs", "You entered invalid data, or left a field empty.");
	}
}
function populateListView(consp)
{
	var query = new Parse.Query("Conspiracies");
	query.equalTo("objectId", consp.id + "");

	query.first({
		success: function(result)
		{
			var queryComments = new Parse.Query("Comments");
			queryComments.equalTo("conspiracyId", result.id);
			queryComments.find({
				success: function(results)
				{
					populateListViewCall(true, result, results);
				},
				error: function(error)
				{
					populateListViewCall(false);
				}
			});
		},
		error: function(error)
		{
			populateListViewCall(false);
		}
	});
}
function populateListViewCall(victory, result, results)
{
	if(victory)
	{
		document.getElementById("login").style.display = "none";
		document.getElementById("feeds").style.display = "none";
		document.getElementById("list-view").style.display = "block";

		var object = result;
		var comments = results;
		console.log(object);
		console.log(comments);
		var photo = object.get("photo")._url;
		document.getElementById("list-view").innerHTML = "" +
			"<div class='feed'>" +
				"<div class='img_main-evidence'><img src='" + photo + "' height='200px' width='200px'></div>" +
				"<div class='feed-content'>" +
					"<h3>" + object.get('title') + "</h3>" +
					"<p class='author'>Author: <span>" + object.get('username') + "</span></p>" +
					"<button class='share' onclick='share()''>SHARE</button>" +
					"<div class='rating-system'>" +
						"<p class='details'>Rate this evidence: </p>" +
						"<div class='rating'><span id='star-1' onclick='rate(\"1\")'>☆</span><span id='star-2' onclick='rate(\"2\")'>☆</span><span id='star-3' onclick='rate(\"3\")'>☆</span></div>" +
					"</div>" +
				"</div>" +
			"</div>" +
			"<div class='synopsis'>" + object.get('description') + "</div>" +
			"<div id='choose-side'>" +
				"<div class='side'><input type='radio' name='conspire' value='yes'/> Conspirator</div>" +
				"<div class='side'><input type='radio' name='conspire' value='no'/> Unbeliever</div>" +
			"</div>" +
			"<div id='comments'>";

		for(var i = 0; i < Object.keys(comments).length; i++)
		{
			var consp;
			if(comments[i].get('suit')) consp = "conspirator";
			else consp = "nay-sayer";
			document.getElementById("list-view").innerHTML += "<div class='comment " + consp + "'><h4>" + comments[i].get('username') + ": </h4><span>" + comments[i].get('content') + "</span></div>";
		}
				/*
				<div class="comment nay-sayer"><h4>Jorge Rodriguez:</h4><span>This article is clearly garbage. I can see the blurred pizels where the image was Photoshopped.</span></div>
				<div class="comment conspirator"><h4>Evan Glazer:</h4><span>You can't refute this picture. No blurred lines here.</span></div>
				<div class="comment nay-sayer"><h4>Test:</h4><span>Man this post I made was awesome</span></div>
				*/
		document.getElementById("list-view").innerHTML += "</div>";
	}
	else
	{
		activateModal("Error!", "There was a problem retrieving your conspiracy from the database. It seems the suits are trying to silence us.");
	}
}
function share()
{
	activateModal();
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
	populateFeeds();
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("register").style.display = "none";
}
function makePost()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "block";
	document.getElementById("about").style.display = "none";
	document.getElementById("register").style.display = "none";
}
function submitPost()
{
	var title = document.getElementById("input_title").value;
	var synopsis = document.getElementById("input_synopsis").value;
	console.log(document.getElementById("btn_proof").files[0]);
	var proof = document.getElementById("btn_proof").files[0];

	var parseFile;
	if (proof)
    {
    	var name = proof.name;
    	parseFile = new Parse.File(name, proof);
    	activateModal("Upload successful", "File uploaded. <i>They</i> can't silence us now.");
    }
    else parseFile = null;

    var query = new Parse.Query("User");
	var Post = Parse.Object.extend("Conspiracies");
	var post = new Post();

	query.equalTo("objectId", currentUser.id + "");
	query.first({
		success: function(user)
		{
			if(currentUser !== null)
			{
				post.set("username", user.get("username"));
				post.set("title", title);
				post.set("description", synopsis);
				post.set("believer", true);
				post.set("commentCount", 0);
				post.set("conspirator_count", 0);
				if(parseFile !== null) post.set("photo", parseFile);

				post.save(null,
				{
					success: function(post)
					{
						submitPostCall(true);
					},
					error: function(post, error)
					{
						 submitPostCall(false);
					}
				});
			}
			else
			{
				document.getElementById("input_title").value = "";
				document.getElementById("input_synopsis").value = "";
				document.getElementById("input_proof").value = "";
				logout();
				activateModal("Not logged in", "You are not logged in!");
			}
		}
	});
}
function submitPostCall(victory)
{
	if(victory)
	{
		document.getElementById("login").style.display = "none";
		document.getElementById("logout").style.display = "block";
		document.getElementById("feeds").style.display = "block";
		populateFeeds();
		document.getElementById("list-view").style.display = "none";
		document.getElementById("settings").style.display = "none";
		document.getElementById("post").style.display = "none";
		document.getElementById("about").style.display = "none";
		document.getElementById("register").style.display = "none";
	}
	else
	{
		activateModal("Invalid Inputs", "You entered one or more fields with invalid data, or failed to fill out an important field.");
	}
	
}
function goSettings()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "block";
	document.getElementById("post").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("register").style.display = "none";

	var query = new Parse.Query("User");
	query.equalTo("objectId", currentUser.id + "");
	
	query.first({
		success: function(result)
		{
			populateSettingsCall(true, result);
		},

		error: function(error)
		{
			populateSettingsCall(false);
		}
	});
}
function populateSettingsCall(victory, result)
{
	var username = document.getElementById("input_name");
	var email = document.getElementById("input_email");

	if(victory)
	{	
		var object = result;

		username.value = object.get("username");
		email.value = object.get("email");
	}
	else
	{
		activateModal("Error!", "There was a problem retrieving your settings from the database. It seems the suits are trying to silence us.");
	}
}
function submitSettingsChange()
{
	var username = document.getElementById("input_name").value;
	var email = document.getElementById("input_email").value;
	var file = document.getElementById("input_file-avatar").value;

	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "block";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
	document.getElementById("about").style.display = "none";
	document.getElementById("register").style.display = "none";

	if(currentUser !== null)
	{
		var query = new Parse.Query("User");
		query.equalTo("objectId", currentUser.id + "");
		query.first({
			success: function(User)
			{
				User.save(null,
				{
					success: function(user)
					{
						user.set("username", username + "");
						user.set("email", email + "");
						user.save();
						populateFeeds();
						//User.set("Avatar", file);
						activateModal("Update success", "Your settings were successfully updated");
					},
					error: function (update, error)
					{
						activateModal("Update failed", "<i>The Man</i> prevented your settings from updating. Try again.");
					}
				});
			},
			error: function(User, error)
			{
				console.log("Conneciton failed.");
			}
		});
	}
	else
	{
		logout();
		activateModal("Not logged in", "You are not logged in!");
	}
	
	// TODO: Query the settings to the database.
}
function populateFeeds()
{
	var Conspiracies = Parse.Object.extend("Conspiracies");
	var query = new Parse.Query(Conspiracies);
	
	query.find({
		success: function(results)
		{
			populateFeedsCall(true, results);
		},

		error: function(error)
		{
			populateFeedsCall(false);
		}
	});
}
function populateFeedsCall(victory, results)
{
	document.getElementById("feeds").innerHTML = "";
	if(victory)
	{	
		for(var i = 0; i < results.length; i++)
		{
			var object = results[i];
			var ident = object.id;
			var photo = object.get("photo")._url;
			
			document.getElementById("feeds").innerHTML += '<div id="' + ident + '"' +
			'class="feed" onclick="populateListView(this)"><div class="img_main-evidence">' +
			'<img src="' + photo + '" height="200px" width="200px"></div>' +
			'<div class="feed-content"><h3>' + object.get("title") + '</h3>' +
			'<p class="author">Author: <span>' + object.get("username") + '</span></p>' +
			'<p class="details">Conspirators: <span>  ' + object.get("conspirator_count") + '  </span>' +
			'Comments: <span>  ' + object.get("commentCount") + '  </span></p></div></div>';
		}
	}
	else
	{
		activateModal("Error!", "There was a problem retrieving conspiracies from the database. It seems the suits are trying to silence us.");
	}
}
function goAbout()
{
	document.getElementById("login").style.display = "none";
	document.getElementById("logout").style.display = "block";
	document.getElementById("feeds").style.display = "none";
	document.getElementById("list-view").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("post").style.display = "none";
	document.getElementById("register").style.display = "none";
	document.getElementById("about").style.display = "block";
}
function activateModal(hdr, msg)
{
	if(hdr !== undefined)
	{
		document.getElementById("modal-header").innerHTML = hdr;
		document.getElementById("modal-message").innerHTML = msg;
	}
	else
	{
		var head = "Incomplete";
		var message = "We only had 17 hours to complete this project. This functionality didn't make the deadline.";
		document.getElementById("modal-header").innerHTML = head;
		document.getElementById("modal-message").innerHTML = message;
	}
	document.getElementById("modal-backing").style.display = "block";
	document.getElementById("message-box").style.display = "block";
}
function disableModal()
{
	document.getElementById("modal-backing").style.display = "none";
	document.getElementById("message-box").style.display = "none";
}