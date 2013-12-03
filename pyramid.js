//V1.2 BETA
////////////////////////
//Game Mechanics:
//Player exists as an object with a customizable name, and choice of three personalities which slightly affect the storyline.
//User can enter name and personality using the keyboard, and interacts with the game by clicking buttons with the mouse.
//"Rooms" of the map give text and image feedback.
//The user can choose to go forward, left, right, or back. They can also check their inventory array, and choose whether or not to fight or pick up items (although items and some fighting are needed to progress).
//Enemy battles have fixed positions, but fights are based on RNG (random number generator).
//Help windows are available at all times to explain controls.
//Invalid name/personality input values are handled.
////////////////////////
//Left to do: minor bugfixes, images, CSS, comments.
//Bugs Fixed:
//progresscontrol buttons are no longer removed if player declines battle
//added by M.I.: an event now occurs if you use the flashlight in the very first room. needs an image.
//second boss now blocks you without item.
//items can only be picked up once now.
//enemies now (apparently) at different chance values through a separate check function. not sure if working.
///////////////////////
//Known bugs: 
//directional buttons appear in boss fights, allowing player to bypass the boss fight and move on
//could add different messages other than "missed" in enemy fights
//add possible deaths after 10+ missed attacks
//if directional buttons are used when asked if you want to fight/pick up something, the fight/item buttons are left intact in other rooms.
///////////////////////
//enemies respawn (should they permanently die?)
//		It kind of goes along with the whole pyramid theme that they keep resurrecting... plus it lengthens the game?
//enemy randomness may be too high (I had an irritating run when I was playing where I didn't hit the enemy after 15 or so attempts
//		Sometimes they die on the first try, too...
///////////////////////

walled="There's a wall or other impass blocking you. Try another way.";
playerinventory=[];

function changeRoom(newRoom){ //changes room according to player movement
	var x; //room description
	var room=newRoom; //takes parameter into the function
	switch (room){
		case 'start':
			if(playerinventory[3]==='flashlight'){
			x="It is dark in here. Would you like to use the flashlight?";
			document.getElementById('itemConfirm').style.display ='block';
			}
			else{x="It is dark in here.";}
			break;
		case 'swordboss':
			x="A large enemy appeared! A sword would be helpful here! Will you fight?</br>";
			itemcheck();
			enemyfight(6);
			document.getElementById('fightConfirm').style.display ='block';
			break;
		case 'axeboss':
			x="A second large enemy appeared! A pickaxe would be helpful here! Will you fight?</br>";
			itemcheck();
			enemyfight(10);
			document.getElementById('fightConfirm').style.display ='block';
			break;
		case 'enemy1':
			x="The first small enemy appeared! Will you fight?</br>";
			enemyfight(3);
			document.getElementById('fightConfirm').style.display ='block';
			break;
		case 'enemy2':
			x="A second small enemy appears. Will you fight?</br>";
			enemyfight(6);
			document.getElementById('fightConfirm').style.display ='block';
			break;
		case 'enemy3':
			x="A third small enemy appears. Will you fight?</br>";
			enemyfight(7);
			document.getElementById('fightConfirm').style.display ='block';
			break;
		case 'swordroom':
			if(playerinventory[0]==='sword'){
			x="It appears to be an old armory... you already took the sword, so there's not much to see.";
			}
			else{x="There is an ancient-looking sword mounted on the far wall. Will you take it?";
			document.getElementById('itemConfirm').style.display ='block';}
			break;
		case 'axeroom':
			if(playerinventory[1]==='pick-axe'){
			x="There were people here more recently than you would have guessed... you already took the pick-axe, so there's not much to see.";
			}
			else{x="A pickaxe leans in the corner. Will you take it?";
			document.getElementById('itemConfirm').style.display ='block';}
			break;
		case 'maskroom':
			x="A Strange Mask lies on the floor. Will you take it?";
			document.getElementById('itemConfirm').style.display ='block';
			break;
		case 'lightroom':
			if(playerinventory[3]==='flashlight'){
			x="There were definitely people in this area very recently. Maybe the flashlight could help you illuminate some dark secrets of your own.";
			}
			else{x="There is a flashlight on the floor. Will you take it?";
			document.getElementById('itemConfirm').style.display ='block';}
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
			if(player.pers==='benevolent'){x="There are interesting engravings on the wall. This one reads: the kindness of " + player.pname + " was known everywhere. ";}
			else if(player.pers==='brave'){x="There are interesting engravings on the wall. This one reads: the conquests of " + player.pname + " will be known throughout time. ";}
			else if(player.pers==='powerful'){x="There are interesting engravings on the wall. This one reads: the wrath of " + player.pname + " will not be forgotten. ";}
			break;
		case 'note3':
			if(player.pers==='benevolent'){x="There are interesting engravings on the wall. This one reads: here we have left the belongings of " + player.pname + ". We hope what they have given in charity will be paid back in full in the afterlife. ";}
			else if(player.pers==='brave'){x="There are interesting engravings on the wall. This one reads: the battle trappings of " + player.pname + " lie here with their master for all time. ";}
			else if(player.pers==='powerful'){x="There are interesting engravings on the wall. This one reads: the vast riches of " + player.pname + " rest here. May the gods help thee who disturb them. ";}
			break;
		case 'note4':
			if(player.pers==='benevolent'){x="There are interesting engravings on the wall. This one reads: Here lies " + player.pname + ", our just ruler and savior. ";}
			else if(player.pers==='brave'){x="There are interesting engravings on the wall. This one reads: Here lies " + player.pname + ", our ruler and conqueror of many, who sacrificed for all. ";}
			else if(player.pers==='powerful'){x="There are interesting engravings on the wall. This one reads: Here lies " + player.pname + ", a ruler greatly feared, but loved. ";}
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
			if(player.pers==='benevolent'){x="There are interesting engravings on the wall. This one reads: glory to the kind and generous " + player.pname + ". ";}
			else if(player.pers==='brave'){x="There are interesting engravings on the wall. This one reads: remembrance of " + player.pname + "\'s deeds. ";}
			else if(player.pers==='powerful'){x="There are interesting engravings on the wall. This one reads: the inimitable strength of " + player.pname + ". ";}
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
	else if (x===3) {
		document.getElementById('outputDiv').innerHTML=document.getElementById('outputDiv').innerHTML+"Bad idea - the strange mask was cursed. You meet with an unearthly fate... *YOU HAVE DIED*";
	}
	document.getElementById('retry').style.display='block';
	document.getElementById('gameControls').style.display='none';
}

function master(){ //starts the game
	player = {};
	player['pname']=document.getElementById('nameBox').value;
	player['pers']=document.getElementById('persBox').value.toLowerCase();

	if (player.pname===''){
		document.getElementById('outputDiv').innerHTML='Please type your name into the box.';
	}
	else if(player.pname!==''){
		document.getElementById('namecontrol').style.display = 'none';
		document.getElementById('personality').style.display = 'block';
		if (player.pers==='benevolent' || player.pers==='brave' || player.pers==='powerful'){
			document.getElementById('gameStart').style.display = 'none';
			document.getElementById('gameControls').style.display = 'block'; //hides CONFIRM button if name has been inputted
			document.getElementById('outputDiv').innerHTML = '';
			document.getElementById('outputDiv').innerHTML="Welcome, " + player.pname + ". It is dark in here." //start room is now context sensitive and will only welcome the player once                
			document.getElementById('currentRoom').value='start'; //hidden div in html tells direction functions where the player is on the map. value 'start' is the first room.
		}
		if (player.pers===''){
			document.getElementById('outputDiv').innerHTML = '';
		}
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


function itemno(){ //if item is declined
	document.getElementById('outputDiv').innerHTML="Decided not to take it.";
	document.getElementById('itemConfirm').style.display = 'none';
}

function itemhandler(){ //adds items to array if taken
	document.getElementById('outputDiv').innerHTML="Taken. Check inventory.</br>";
	document.getElementById('itemConfirm').style.display = 'none';
	currentRoom=document.getElementById('currentRoom').value;
	
	if (currentRoom==='swordroom'){
		playerinventory[0]='sword';
	}
	else if (currentRoom==='axeroom'){
		playerinventory[1]='pick-axe';
	}
	else if (currentRoom==='maskroom'){
		playerinventory[2]='strange mask';
		death(3);
	}
	else if (currentRoom==='lightroom'){
		playerinventory[3]='flashlight';
	}
	else if (currentRoom==='start'){
		document.getElementById('outputDiv').innerHTML="The room has become illuminated. On the wall is a brilliant mural depicting yourself, and your loyal animal companions.";
	}
	else {
		return;
	}
}

function inventory() { //shows inventory to player
	if (playerinventory[0]==='sword' && playerinventory[1]!=='pick-axe'){
		alert(playerinventory[0]);
	}
	else if (playerinventory[0]==='sword' && playerinventory[1]==='pick-axe' && playerinventory[3]!=='flashlight') {
		alert(playerinventory[0]+', '+playerinventory[1]);
	}
	else if (playerinventory[0]==='sword' && playerinventory[1]==='pick-axe' && playerinventory[3]==='flashlight') {
		alert(playerinventory[0]+', '+playerinventory[1]+', '+playerinventory[3]);
	}
}

function enemyfight(chance){ //handles enemy encounters
	var chance, enemyChance=Math.floor((Math.random()*chance)+1);
	
	if (enemyChance!==2){
		enemyChance=Math.floor((Math.random()*chance)+1);
		document.getElementById('outputDiv').innerHTML=document.getElementById('outputDiv').innerHTML+'Missed! So close! Attack again?</br>';
	}
	else{
		document.getElementById('outputDiv').innerHTML=document.getElementById('outputDiv').innerHTML+'You defeated it!</br>';
		document.getElementById('progresscontrol').style.display='block';
		document.getElementById('fightConfirm').style.display='none';
	}
}


function peace(){ //if user declines to fight
	document.getElementById('outputDiv').innerHTML="You ran away to fight another day...";
	document.getElementById('fightConfirm').style.display = 'none';
}

function itemcheck(){ //checks that items have been gathered
	currentRoom=document.getElementById('currentRoom').value;
	if (playerinventory[0]!=='sword' && currentRoom==='swordboss') {
		document.getElementById('outputDiv').innerHTML="It's no use... a sword might help!";
		document.getElementById('fightConfirm').style.display='none';
	}
	else if (playerinventory[0]==='sword' && playerinventory[1]!=='pick-axe' && currentRoom==='axeboss') {
		document.getElementById('outputDiv').innerHTML="It's no use... a pick-axe might help!";
		document.getElementById('fightConfirm').style.display='none';
	}
	else {
		return;
	}
}

function enemycheck(){ //decides difficulty of enemies
	currentRoom=document.getElementById('currentRoom').value;
	if (currentRoom==='enemy1'){
		enemyfight(3);
	}
	else if (currentRoom==='enemy2'){
		enemyfight(6);
	}
	else if (currentRoom==='enemy3'){
		enemyfight(7);
	}
	else if (currentRoom==='swordboss'){
		enemyfight(6);
	}
	else if (currentRoom==='axeboss'){
		enemyfight(10);
	}
	else {
		return;
	}
}

function help(x){ //changes help message depending on if game has started or not
	if (x===0) {        
		alert('Enter your name into the first box prompt, and personality (benevolent, brave, or powerful) into the second box prompt and click "CONFIRM" to start. Be aware that there are no continues, and that refreshing the page will erase your progress.');
	}
	else if (x===1) {
		alert('Choose which direction you\'d like to go. Click "INVENTORY" to view the items you have collected on your journey.')
	}
}