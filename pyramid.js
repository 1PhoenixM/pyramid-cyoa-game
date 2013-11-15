//I combined elements from both of the backups.
//The player is now an object, so playerName is now player.pname and will add more properties of the player later on
/*Idea: Instead of having a default "you can't go that way" in an else rule (which would mess up the output), I put in an alert statement that 
tells the player to go back and try another path.*/
walled="There's a wall or other impass blocking you. Try another way.";
	
function changeRoom(newRoom){ //changes room according to player movement
	var x; //room description
	var room=newRoom; //takes parameter into the function
		switch (room){
  		case 'start':
    			x="It is dark in here.";
    			break;
		case 'swordboss':
			x="A large enemy appeared! A sword would be helpful here!";
			break;
		case 'axeboss':
			x="A second large enemy appeared! A pickaxe would be helpful here!";
			break;
		case 'enemy1':
			x="The first small enemy appeared!";
			break;
		case 'enemy2':
			x="A second small enemy appears.";
			break;
		case 'enemy3':
			x="A third small enemy appears.";
			break;
		case 'swordroom':
			x="There is an ancient-looking sword mounted on the far wall. Will you take it?";
			itemhandler();
			break;
		case 'axeroom':
			x="A pickaxe leans in the corner. Will you take it?";
			itemhandler();
			break;
		case 'maskroom':
			x="A Strange Mask lies on the floor. Will you take it?";
			itemhandler();
			break;
		case 'lightroom':
			x="There is a flashlight on the floor. Will you take it?";
			itemhandler();
			break;
		case 'trove':
			x="You find a trove of treasure in this room. But it\'s probably cursed, so you leave it alone.";
			break;
		case 'danger':
			x="You feel an ominous sense of danger.";
			break;
		case 'almost':
			x="There is a light ahead of you, but maybe you should check around a bit before you go.";
			break;
		case 'dogs':
			x="You find a room full of what appears to be mummified dogs. You feel safe somehow.";
			break;
		case 'goldtunnel':
			x="You enter a narrow tunnel lined with gold.";
			break;
		case 'finish':
			x="You made it out okay! Thank you for playing!";
			break;
		case 'abyss':
			x="You find a deep, dark staircase spiraling down into inky blackness. You can see that the stairs end, crumbling off into the abyss. It\'s impossible to go any further.";
			break;
		case 'vista':
			x="You see the outside for the first time. It\'s a beautiful vista from where you are, but you can\'t go any further.";
			break;
		case 'maskreject':
			x="Passed the Strange Mask up. It disintegrates. Good thing, too - it was cursed.";
			break;
		case 'note2':
			x="NOTE 2";
			break;
		case 'note3':
			x="NOTE 3";
			break;
		case 'note4':
			x="NOTE 4";
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
    		case 'note1':
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
	else if (x===2) {
		document.getElementById('outputDiv').innerHTML="The room is filled with deadly snakes. *YOU HAVE DIED*";
	}
	
		document.getElementById('gameStart').style.display='block';
		document.getElementById('gameControls').style.display='none';
}

function master(){
	player = {
	};
	player['pname']=document.getElementById('nameBox').value;
	if (player.pname===''){
		document.getElementById('outputDiv').innerHTML='Please type your name into the box.';
	}
	else {
		document.getElementById('gameStart').style.display = 'none'; //hides nameBox and CONFIRM button
		document.getElementById('gameControls').style.display = 'block'; //hides CONFIRM button if name has been inputted		
		document.getElementById('outputDiv').innerHTML="Welcome, " + player.pname + ". It is dark in here." //start room is now context sensitive and will only welcome the player once		
		document.getElementById('currentRoom').value='start'; //hidden div in html tells direction functions where the player is on the map. value 'start' is the first room.
	}
}


function north() { //user moves forward
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom=='start') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('passage');
		document.getElementById('currentRoom').value='passage';	
	}
	else if (currentRoom=='passage') {
		changeRoom('swordboss');
		document.getElementById('currentRoom').value='swordboss';	
	}
	else if (currentRoom=='swordboss') {
		changeRoom('trove');
		document.getElementById('currentRoom').value='trove';	
	}
	else if (currentRoom=='trove') {
		changeRoom('danger');
		document.getElementById('currentRoom').value='danger';	
	}
	else if (currentRoom=='danger') {
		changeRoom('axeboss');
		document.getElementById('currentRoom').value='axeboss';	
	}
	else if (currentRoom=='axeboss') {
		changeRoom('almost');
		document.getElementById('currentRoom').value='almost';	
	}
	else if (currentRoom=='almost') {
		changeRoom('finish');
		document.getElementById('currentRoom').value='finish';	
	}
	else if (currentRoom=='enemy2') {
		changeRoom('axeroom');
		document.getElementById('currentRoom').value='axeroom';	
	}
	else if (currentRoom=='enemy3') {
		changeRoom('maskroom');
		document.getElementById('currentRoom').value='maskroom';	
	}
	else if (currentRoom=='dogs') {
		death(2);
	}
	else {
		alert(walled);
	}
}

function west() { //user moves left
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom=='start') {
		document.getElementById('currentRoom').value='staircase';
		changeRoom('staircase');
	}
	else if (currentRoom=='staircase') {
		document.getElementById('currentRoom').value='swordroom';
		changeRoom('swordroom');	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('enemy1');
		document.getElementById('currentRoom').value='enemy1';
	}
	else if (currentRoom=='note1') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';	
	}
	else if (currentRoom=='swordboss') {
		changeRoom('abyss');
		document.getElementById('currentRoom').value='abyss';	
	}
	else if (currentRoom=='note2') {
		changeRoom('swordboss');
		document.getElementById('currentRoom').value='swordboss';	
	}
	else if (currentRoom=='trove') {
		changeRoom('goldtunnel');
		document.getElementById('currentRoom').value='goldtunnel';	
	}
	else if (currentRoom=='goldtunnel') {
		changeRoom('enemy2');
		document.getElementById('currentRoom').value='enemy2';	
	}
	else if (currentRoom=='danger') {
		changeRoom('vista');
		document.getElementById('currentRoom').value='vista';	
	}
	else if (currentRoom=='enemy3') {
		changeRoom('danger');
		document.getElementById('currentRoom').value='danger';	
	}
	else if (currentRoom=='note3') {
		changeRoom('maskroom');
		document.getElementById('currentRoom').value='maskroom';	
	}
	else if (currentRoom=='almost') {
		changeRoom('lightroom');
		document.getElementById('currentRoom').value='lightroom';	
	}
	else if (currentRoom=='lightroom') {
		changeRoom('note4');
		document.getElementById('currentRoom').value='note4';	
	}
	else if (currentRoom=='dogs') {
		changeRoom('almost');
		document.getElementById('currentRoom').value='almost';	
	}
	else {
	alert(walled);
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
	else if (currentRoom=='enemy1') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('note1')
		document.getElementById('currentRoom').value='note1';	
	}
	else if (currentRoom=='swordroom') {
		changeRoom('staircase');
		document.getElementById('currentRoom').value='staircase';	
	}
	else if (currentRoom=='abyss') {
		changeRoom('swordboss');
		document.getElementById('currentRoom').value='swordboss';	
	}
	else if (currentRoom=='swordboss') {
		changeRoom('note2');
		document.getElementById('currentRoom').value='note2';	
	}
	else if (currentRoom=='trove') {
		death(1);	
	}
	else if (currentRoom=='goldtunnel') {
		changeRoom('trove');
		document.getElementById('currentRoom').value='trove';	
	}
	else if (currentRoom=='enemy2') {
		changeRoom('goldtunnel');
		document.getElementById('currentRoom').value='goldtunnel';	
	}
	else if (currentRoom=='vista') {
		changeRoom('danger');
		document.getElementById('currentRoom').value='danger';	
	}
	else if (currentRoom=='danger') {
		changeRoom('enemy3');
		document.getElementById('currentRoom').value='enemy3';	
	}
	else if (currentRoom=='maskroom') {
		changeRoom('note3');
		document.getElementById('currentRoom').value='note3';	
	}
	else if (currentRoom=='almost') {
		changeRoom('dogs');
		document.getElementById('currentRoom').value='dogs';	
	}
	else if (currentRoom=='lightroom') {
		changeRoom('almost');
		document.getElementById('currentRoom').value='almost';	
	}
	else if (currentRoom=='note4') {
		changeRoom('lightroom');
		document.getElementById('currentRoom').value='lightroom';	
	}
	else {
	alert(walled);
	}
}

function backwards() { //user moves back one room to the previous room
	currentRoom=document.getElementById('currentRoom').value;
	if (currentRoom=='staircase') {
		east();	
	}
	else if (currentRoom=='smallroom') {
		changeRoom('start');
		document.getElementById('currentRoom').value='start';
	}
	else if (currentRoom=='passage') {
		changeRoom('smallroom');
		document.getElementById('currentRoom').value='smallroom';
	}
	else if (currentRoom=='swordroom') {
		east();
	}
	else if (currentRoom=='enemy1') {
		east();
	}
	else if (currentRoom=='note1') {
		west();
	}
	else if (currentRoom=='abyss') {
		east();
	}
	else if (currentRoom=='note2') {
		west();
	}
	else if (currentRoom=='swordboss') {
		changeRoom('passage');
		document.getElementById('currentRoom').value='passage';
	}
	else if (currentRoom=='trove') {
		changeRoom('swordboss');
		document.getElementById('currentRoom').value='swordboss';
	}
	else if (currentRoom=='goldtunnel') {
		east();
	}
	else if (currentRoom=='enemy2') {
		east();
	}
	else if (currentRoom=='axeroom') {
		changeRoom('enemy2');
		document.getElementById('currentRoom').value='enemy2';
	}
	else if (currentRoom=='danger') {
		changeRoom('trove');
		document.getElementById('currentRoom').value='trove';
	}
	else if (currentRoom=='vista') {
		east();
	}
	else if (currentRoom=='enemy3') {
		west();
	}
	else if (currentRoom=='maskroom') {
		changeRoom('enemy3');
		document.getElementById('currentRoom').value='enemy3';
	}
	else if (currentRoom=='note3') {
		west();
	}
	else if (currentRoom=='axeboss') {
		changeRoom('danger');
		document.getElementById('currentRoom').value='danger';
	}
	else if (currentRoom=='almost') {
		changeRoom('axeboss');
		document.getElementById('currentRoom').value='axeboss';
	}
	else if (currentRoom=='lightroom') {
		east();
	}
	else if (currentRoom=='dogs') {
		west();
	}
	else if (currentRoom=='note4') {
		east();
	}
	else {
	alert(walled);
	}
}

function inventory() {
	alert(playerinventory);
}

function smallenemy(){}

function bossbattle(){}

function itemhandler(){
playerinventory=[];
currentRoom=document.getElementById('currentRoom').value;
if (currentRoom='swordroom')
	playerinventory[0]='sword';
else if (currentRoom='axeroom')
	playerinventory[1]='pick-axe';
else if (currentRoom='maskroom')
	playerinventory[2]='strange mask';
else if (currentRoom='lightroom')
	playerinventory[3]='flashlight';
else {return;}
}

function help(x){ //changes help message depending on if game has started or not
	if (x===0) {	
		alert('Enter your name in the box above and click "CONFIRM" to start.');
	}
	else if (x===1) {
		alert('Choose which direction you\'d like to go.') //once inventory system is created, add explanation here
	}
}
