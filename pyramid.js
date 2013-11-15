//Melissa Iori & Mackenzie Hummel
//remember: have an f, l, b, r for every room
//switch statement?
//there are four functions as directions
//"rooms" are strings contained within variables
//movement is based on what room (string) you're currently in (displayed).
//items are added to the inventory (array) as they're found
//to do: add a "battle system" using generation of random numbers, add another customization factor, add Story Notes
function master()
{
playerName = document.getElementById('masterBox').value;
noescape='There\'s no getting past it!';
enemy1='A large enemy appeared! A sword would be helpful here!';
enemy2='A second large enemy appeared! A pickaxe would be helpful here!';
enemy3='A third small enemy appears.';
enemy4='A second small enemy appears.';
enemy5='The first small enemy appeared!';
death1='You have fallen into a pit of thorns! *YOU HAVE DIED*';
death2='The walls begin to close in on you and you can\'t stop them. *YOU HAVE DIED*';
item1='There is an ancient-looking sword mounted on the far wall. Will you take it?';
item2='A Strange Mask lies on the floor. Will you take it?';
item3='A pickaxe leans in the corner. Will you take it?';
item4='There is a flashlight on the floor. Will you take it?';
room1='Welcome, ' + playerName + '. It is dark here.';
room2='You come across a small room.';
room3='You find a dark staircase.';
room4='This passage is lit by torches.';
room5='You find a trove of treasure in this room. But it\'s probably cursed, so you leave it alone.';
room6='You feel an ominous sense of danger.';
room7='There is a light ahead of you, but maybe you should check around a bit before you go.';
room8='You find a room full of what appears to be mummified dogs. You feel safe somehow.';
room9='You enter a narrow tunnel lined with gold.';
room10=
room11=
room12=
room13=
room14=
room15=
room16=
room17=
endroom='You made it out okay! Thank you for playing!';
walled='You can\'t go that way.';
pass1='It\'s a passage, so you can\'t go left.';
deadend1='You find a deep, dark staircase spiraling down into inky blackness. You can see that the stairs end, crumbling off into the abyss. It\'s impossible to go any further.';
deadend2='You see the outside for the first time. It\'s a beautiful vista from where you are, but you can\'t go any further.';

if (playerName===''){
document.getElementById('outputDiv').innerHTML='Please type your name into the box.';
}
else {
document.getElementById('outputDiv').innerHTML=room1;
if (fflag == true){
document.getElementById('outputDiv').innerHTML=room2;
}
if (lflag == true){
document.getElementById('outputDiv').innerHTML=room3;
}
if (rflag == true){
document.getElementById('outputDiv').innerHTML=death1;
}
}
}

function help()
{
alert('Enter your name in the box above and click "CONFIRM" to start. Then click the appropriate button for your choice.');
}

function forward()
{
var playerName = document.getElementById('masterBox').value;
var stableOutput;
stableOutput=document.getElementById('outputDiv').innerHTML;
if (stableOutput===room2){
document.getElementById('outputDiv').innerHTML=room4;
}
else if (stableOutput===room4){
document.getElementById('outputDiv').innerHTML=enemy1;
}
else if (stableOutput==='A large enemy appeared! A sword would be helpful here!'){
document.getElementById('outputDiv').innerHTML=noescape;
}
else if (stableOutput===room5){
document.getElementById('outputDiv').innerHTML=room6;
}
else if (stableOutput==='You feel an ominous sense of danger.'){
document.getElementById('outputDiv').innerHTML=enemy2;
}
else if (stableOutput==='A second large enemy appeared! A pickaxe would be helpful here!'){
document.getElementById('outputDiv').innerHTML='There\'s no getting past it!';
}
else if (stableOutput===room7){
document.getElementById('outputDiv').innerHTML=endroom;
}
else if (stableOutput===room8){
document.getElementById('outputDiv').innerHTML=death2;
}
else if (stableOutput===enemy3){
document.getElementById('outputDiv').innerHTML=item2;
}
else if (stableOutput===enemy4){
document.getElementById('outputDiv').innerHTML=item3;
}
else if (stableOutput==='Welcome, ' + playerName + '. It is dark here.'){
fflag = true;
master();
}
else{
document.getElementById('outputDiv').innerHTML=walled;
}
}


function left()
{
playerName = document.getElementById('masterBox').value;
var stableOutput;
stableOutput=document.getElementById('outputDiv').innerHTML;
if (stableOutput==='Welcome, ' + playerName + '. It is dark here.'){
lflag = true;
master();
}
else if (stableOutput==='You find a dark staircase.'){
document.getElementById('outputDiv').innerHTML=item1;
    if (document.getElementById('masterBox').value==='take sword')
        document.getElementById('outputDiv').innerHTML='Sword taken.';
        inventory[0]='sword';
}
else if (stableOutput==='You come across a small room.'){
document.getElementById('outputDiv').innerHTML=enemy5;
}
else if (stableOutput==='This passage is lit by torches.'){
document.getElementById('outputDiv').innerHTML=pass1;
}
else if (stableOutput==='success enemy placeholder'){
document.getElementById('outputDiv').innerHTML=deadend1;
}
else if (stableOutput==='You find a trove of treasure in this room. But it\'s probably cursed, so you leave it alone.'){
document.getElementById('outputDiv').innerHTML=room9;
}
else if (stableOutput==='You enter a narrow tunnel lined with gold.'){
document.getElementById('outputDiv').innerHTML='A second small enemy appeared!';
}
else if (stableOutput==='You feel an ominous sense of danger.'){
document.getElementById('outputDiv').innerHTML=deadend2;
}
else if (stableOutput==='There is a light ahead of you, but maybe you should check around a bit before you go.'){
document.getElementById('outputDiv').innerHTML='There is a flashlight on the floor. Will you take it?';
    if (document.getElementById('masterBox').value==='take flashlight')
        document.getElementById('outputDiv').innerHTML='Flashlight taken.';
        inventory[4]='flashlight';
}
else if (stableOutput==='There is a flashlight on the floor. Will you take it?' || 'Flashlight taken.'){
document.getElementById('outputDiv').innerHTML='Secret Room of True Origin';
}
else{
document.getElementById('outputDiv').innerHTML='You can\'t go that way.';
}
}


function right()
{
playerName = document.getElementById('masterBox').value;
var stableOutput;
stableOutput=document.getElementById('outputDiv').innerHTML;
if (stableOutput==='Welcome, ' + playerName + '. It is dark here.'){
rflag = true;
master();
}
else if (stableOutput==='You come across a small room.'){
document.getElementById('outputDiv').innerHTML='There\'s a NOTE carved into this wall. NOTE 1';
}
else if (stableOutput==='This passage is lit by torches.'){
document.getElementById('outputDiv').innerHTML='It\'s a passage, so you can\'t go right.';
}
else if (stableOutput==='A large enemy appeared! A sword would be helpful here!'){
document.getElementById('outputDiv').innerHTML='There\'s a NOTE carved into this wall. NOTE 2';
}
else if (stableOutput==='You find a trove of treasure in this room. But it\'s probably cursed, so you leave it alone.'){
document.getElementById('outputDiv').innerHTML='It\'s filled with deadly snakes. *YOU HAVE DIED*';
}
else if (stableOutput==='You feel an ominous sense of danger.'){
document.getElementById('outputDiv').innerHTML='The third small enemy appears!';
}
else if (stableOutput==='Passed the Strange Mask up. It disintegrates. Good thing, too - it was cursed.'){
document.getElementById('outputDiv').innerHTML='There\'s a NOTE carved into this wall. NOTE 3';
}
else if (stableOutput==='There is a light ahead of you, but maybe you should check around a bit before you go.'){
document.getElementById('outputDiv').innerHTML='You find a room full of what appears to be mummified dogs. You feel safe somehow.';
}
else if (stableOutput==='Sword taken.'){
document.getElementById('outputDiv').innerHTML='You find a dark staircase.';
}
else{
document.getElementById('outputDiv').innerHTML='You can\'t go that way.';
}
}

function back()
{
var playerName = document.getElementById('masterBox').value;
var stableOutput;
stableOutput=document.getElementById('outputDiv').innerHTML;
if (stableOutput==='Welcome, ' + playerName + '. It is dark here.'){
fflag = true;
master();
}
}

function inventory()
{
inventory=[];
alert(''+inventory+'');
}