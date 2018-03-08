/*
const calendarEvent = document.getElementById('calendarEvent');

calendarEvent.addEventListener('click', e => {
	window.location.href = "calendarRequest.html";
});
*/

//interface js goes below
var dateButton = document.getElementById('calendarEvent');
var dateInputBlock = document.getElementById('date');
var sendButton = document.getElementById('send');
var announceTitle = document.getElementById('txtName');
var announceMessage = document.getElementById('announcement');
var uploadFile = document.getElementById('uploadFile');
var preview = document.getElementById('preview');
let btnLocation = document.getElementById('location');
let btnLocation1 = document.getElementById('location1');
let selLocationBtn = document.getElementById('selLocation');

var charCount = document.getElementById("chars");
announceMessage.addEventListener('change', function(e) {
	charCount.innerHTML = e.target.value.length;
});

sendButton.addEventListener('click', function(e) {
	e.preventDefault();

	const title = announceTitle.value;
	const announcement = announceMessage.value;

	if(title == ""){
		alert("You must include a title");
	}
	if(announcement == ""){
		alert("You must include a message");
	}

	sendAnnouncement(title, announcement);
	announceMessage.value = "";
	announceTitle.value = "";

	//display "Message successfully sent" if this is true
});

//announcements logic
const FIREBASE_AUTH = firebase.auth();
const FIREBASE_DATABASE = firebase.database();
const FIREBASE_STORAGE = firebase.storage();

//date
//if regular anonouncement:
let expirationDate = new Date();
let dd = expirationDate.getDate() + 1;
let mm = expirationDate.getMonth() + 1; //January is 0 so +1 is added to get the proper date
let yyyy = expirationDate.getFullYear();

if (dd < 10) {
    dd = '0'+ dd;
}
if (mm < 10) {
    mm = '0' + mm;
}
expirationDate = mm + '/' + dd + '/' + yyyy + ' 23:59:59';
//its value is updated in datepicker-directive.js, day after today by default

//send msg to database
function sendAnnouncement(title, announcement) {
	const uid = FIREBASE_AUTH.currentUser.uid;
	const profileImg = FIREBASE_AUTH.currentUser.photoURL != null ? FIREBASE_AUTH.currentUser.photoURL : 'https://developers.google.com/experts/img/user/user-default.png';
	let org, orgType;

	FIREBASE_DATABASE.ref('/users/' + FIREBASE_AUTH.currentUser.uid).once('value')
		.then((snapshot) => {
			org = snapshot.val().organization;
			orgType = snapshot.val().type;
			console.log(org);
			console.log(orgType);
		})
		.then(() => {
			FIREBASE_DATABASE.ref('/requests/announcements').push({
				title: title,
				org: org,
				orgType: orgType,
				message: announcement,
				userProfileImg: profileImg,
				expirationDate: (new Date(expirationDate)).toString()
			});
		});
}

//file upload
uploadFile.addEventListener('change', function (e) {
    document.getElementById('uploader').style.display = 'block';
    var file = e.target.files[0];
    //Create a storage ref
    var storageRef = firebase.storage().ref('/announcements/' + file.name);
    //Upload file
    var task = storageRef.put(file);
    //Update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) {

        },
        function complete() {

        }
    );
    FIREBASE_STORAGE.ref('/upload/' + file.name).on('child_added', function (snapshot) {
        console.log(snapshot.val());
        preview = snapshot.val();
    });
});

//map
let map = L.map('map', {
    maxZoom: 3,
    crs: L.CRS.Simple
});
let bounds = [[0, 0], [700, 850]];
let image = L.imageOverlay('School Map 2.png', bounds).addTo(map);

map.fitBounds(bounds);

const x = 20
const y = 40
//1a
var sol = L.latLng([y, x]);
L.marker(sol).addTo(map);


btnLocation.addEventListener('click', function () {
    document.getElementById('map').style.visibility = "visible";
    document.getElementById('location1').style.display = "block";
    document.getElementById('dropbtn').style.display = "block";
    document.getElementById('location').style.display = "none";
})
btnLocation1.addEventListener('click', function () {
    document.getElementById('map').style.visibility = "hidden";
    document.getElementById('location1').style.display = "none";
    document.getElementById('dropbtn').style.display = "none";
    document.getElementById('location').style.display = "block";
})


//dropdown menu for selecting location
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
		let subDrops = document.getElementsByClassName("dropdown-sub")
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
		// for b;
		// for (b = 0; b < subDrops.length; b++) {
    //   let openDropdown = subDrops[b];
    //   if (openDropdown.classList.contains('show')) {
    //     openDropdown.classList.remove('show');
    //   }
    // }
  }
}

//when block a is clicked, open sub categories
let blockA = document.getElementById("blockA");
let blockASub = document.getElementById("blockASub");

let blockB = document.getElementById("blockB");
let blockBSub = document.getElementById("blockBSub");

let blockC = document.getElementById("blockC");
let blockCSub = document.getElementById("blockCSub");

let blockD = document.getElementById("blockD");
let blockDSub = document.getElementById("blockDSub");

let blockE = document.getElementById("blockE");
let blockESub = document.getElementById("blockESub");

let blockF = document.getElementById("blockF");
let blockFSub = document.getElementById("blockFSub");

let blockG = document.getElementById("blockG");
let blockGSub = document.getElementById("blockGSub");

let other = document.getElementById("other");
let otherSub = document.getElementById("otherSub");

blockA.addEventListener('click', function(){
    blockASub.className="show";
});

blockB.addEventListener('click', function(){
    blockBSub.className="show";
});

blockC.addEventListener('click', function(){
    blockCSub.className="show";
});
blockD.addEventListener('click', function(){
    blockDSub.className="show";
});
blockE.addEventListener('click', function(){
    blockESub.className="show";
});
blockF.addEventListener('click', function(){
    blockFSub.className="show";
});
blockG.addEventListener('click', function(){
    blockGSub.className="show";
});
other.addEventListener('click', function(){
    otherSub.className="show";
});
