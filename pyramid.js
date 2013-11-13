//rooms should have descriptive names rather than number values for ease of reading
//always use '' when designating room switch, room values, etc
//refer to visual map to determine room locations relevant to one another
//had to change function names due to conflicts with existing javascript key names (left, forward, back, right are all already used for something else. went with cardinal directions instead)
//added switch statement
//map has been created up to passage room. using diagram via cacoo.


function changeRoom(newRoom){ //changes room according to player movement
	var playerName = document.getElementById('nameBox').value;
	var x; //room description
	var room=newRoom; //takes parameter into the function
		switch (room){
  			case 'start':
    			x="It is dark in here.";
    			break;
  			case 'staircase':
    			x="You find a dark staircase.";
    			break;
  			case 'smallroom':
   			x="You come across a small room.";
    			break;
    		case 'passage':
    			x="This passage is lit by torches.";
    			break;
    		case 'encounter1':
    			x="The first small enemy appeared!";
    			break;
    		case 'story1':
    			x="There are interesting engravings on the wall.";
    			break;
  		}
	document.getElementById('outputDiv').innerHTML=x; //displays new room description
}

function death(x) { //chooses what type of death the player experiences and resets the game
	if (x===0) {
		document.getElementById('outputDiv').innerHTML="You have fallen into a pit of thorns! *YOU HAVE DIED*";	
	}
	else if (x===1) {
		document.getElementById('outputDiv').innerHTML="The walls begin to close in on you and you can\'t stop them. *YOU HAVE DIED*";
	}
		document.getElementById('gameStart').style.display='block';
		document.getElementById('gameControls').style.display='none';
}



function master(){
	var playerName = document.getElementById('nameBox').value;
	
	if (playerName===''){
		document.getElementById('outputDiv').innerHTML='Please type your name into the box.';
	}
	else {
		document.getElementById('gameStart').style.display = 'none'; //hides nameBox and CONFIRM button
		document.getElementById('gameControls').style.display = 'block'; //hides CONFIRM button if name has been inputted		
		document.getElementById('outputDiv').innerHTML="Welcome, " + playerName + ". It is dark in here." //start room is now context sensitive and will only welcome the player once		
		document.getElementById('currentRoom').value='start'; //hidden div in html tells direction functions where the player is on the map. value 'start' is the first room.
	}
}

function north() { //user moves forward
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom=='start') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';	
	}
	else if (currentRoom=='staircase') {
		document.getElementById('outputDiv').innerHTML="The stairs appear to be blocked. You can't go any further.";	
	}
	if (currentRoom=='smallroom') {
		changeRoom('passage');
		document.getElementById('currentRoom').value='passage';	
	}
	
}

function west() { //user moves left
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom=='start') {
		document.getElementById('currentRoom').value='staircase';
		changeRoom('staircase');
	}
	else if (currentRoom=='staircase') {
		document.getElementById('outputDiv').innerHTML="The stairs appear to be blocked. You can't go any further.";	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('encounter1');
		document.getElementById('currentRoom').value='encounter1';
	}
	else if (currentRoom=='story1') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';	
	}
}

function east() { //user moves right
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom=='start') {	
		death(0);
	}
	else if (currentRoom=='staircase') {
		changeRoom('start')
		document.getElementById('currentRoom').value='start'	
	}
	else if (currentRoom=='encounter1') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('story1')
		document.getElementById('currentRoom').value='story1';	
	}
}

function south() { //user moves back
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom=='start') {	
		document.getElementById('outputDiv').innerHTML="You push against the stone wall but to no avail. You cannot go backwards.";
	}
	else if (currentRoom=='staircase') {
		document.getElementById('outputDiv').innerHTML="The stairs appear to be blocked. You can't go any further.";	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('start');
		document.getElementById('currentRoom').value='start';
	}
	else if (currentRoom=='passage') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';
	}
}

function inventory() {
	inventory=[];
	alert(''+inventory+'');
}


function help(x){ //changes help message depending on if game has started or not
	if (x===0) {	
		alert('Enter your name in the box above and click "CONFIRM" to start.');
	}
	else if (x===1) {
		alert('Choose which direction you\'d like to go.') //once inventory system is created, add explanation here
	}
}