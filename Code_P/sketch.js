//declare all your variables in the global scope
let button; // to play the sounds
let myFont; //helvetica-adjacent typeface to mimic the language of the subway
let music1; // the music files 
let textArray1 = []; //store the x & y positions of all the points along the curves in the text
let volar = [];
let r = 0; //
let selectedAudio; //the variable that stores the audio
const defaultText = "Type the first letter of your first name..."; //to receive text input from the user 
let xPosSlider; //to manipulate the x position of the where the inputted text will appear
let yPosSlider; //to manipulate the y position of the where the inputted text will appear
const size = 700; //the font size
let colorDropdown; // the variable that will store the series of colors that the background can be changed into
// const palette = ['#EE352E', '#00933C', '#0039A6', '#FCCC0A', '#FF6319', '#A7A9AC', '#996633', '#6CBE45'];
const palette = ['#000000', '#FFFFFF'];
let saveButton;
let selectedColor;
let offset;
let vol;
function preload() {
selectedAudio = loadSound("siren.mp3"); //transferring an instance of the sounds into the variable 'selectedAudio'
//transferring an instance of the font file
// myFont = loadFont('BebasNeue.otf');  
myFont = loadFont('Helvetica.otf');
}

function setup() {
  createCanvas(1500, 1000); //set the bounds of the canvas to the postcard dimensions
  textAlign(CENTER, CENTER); //make sure the co-ordinates of the text are at the center not at the top-left
  // angleMode(DEGREES);
  // frameRate(10);
  //create a button that will control the play and pause states of the audio stored in variable 'selectedAudio'
  button = createButton('  ▶ '); 
  button.mousePressed(toggleSong); //callback function that will be accessed the minute the mouse is pressed
  button.position(width / 2, height +80); 
  button.size(60,60);
  button.addClass("myButton"); //adding style to an html element requires assigning it a class so that the css can point to it and decorate it however
  textFont(myFont); 

  // textSize(64);
  saveButton = createButton('Take Snapshot');
  saveButton.position(width-100, height+20);
  saveButton.mousePressed(takeSnapshot);
  
  let audioDropdown = createSelect();
  audioDropdown.position(20, height+20);
  audioDropdown.option("dings", 1);
audioDropdown.option("performance", 2);
audioDropdown.option("siren", 3);
audioDropdown.option("train announcement", 4);
audioDropdown.option("union park murmur", 5);
audioDropdown.changed(updateAudio); // Call the updateAudio function when the dropdown selection changes


  let input = createInput();
  input.position(width/2-200, height+20);
  input.changed(updateText); //callback function that will keep reading the input dialog box to see if there is new information
  
  // music1.loop();
  // selectedAudio = new p5.Amplitude();
  // selectedAudio.setInput(music1);
  
  xPosSlider = createSlider(-100, width+100, width / 2-400, 1);
  xPosSlider.position(50, height+40);
  xPosSlider.input(updateTextPosition); //the interaction with the slider will lead the program to load the updateTextPostiion function 
  
  yPosSlider = createSlider(-100, height+100, height, 1);
  yPosSlider.position(50, height+60);
  yPosSlider.input(updateTextPosition);
  
  colorDropdown = createSelect(); //the DOM element that allows you to choose one option from a range of available options, in this case the color of the background
  colorDropdown.position(width/2-400, height+20);
  colorDropdown.option("#EE352E");
  colorDropdown.option("#00933C");
  colorDropdown.option("#0039A6");
  colorDropdown.option("#FCCC0A");
  colorDropdown.option("#FF6319");
  colorDropdown.option("#A7A9AC");
  colorDropdown.option("#996633");
  colorDropdown.option("#6CBE45");
  colorDropdown.changed(updateTextColor); //if the option that was initially selected changes, then the .changed operator calls the function to deal with it
  
  //   saveButton = createButton("Save");
  // saveButton.position(20, 120);
  // saveButton.mousePressed(saveCanvas);
  
  // size = createSlider(50,1000, 300);
  // size.position(20,150);

  radio = createRadio();
  radio.position(width/2, height + 20);
  radio.option(1);
  radio.option(2);
  radio.option(3);
  radio.option(4);

  amp = new p5.Amplitude(); //initialize amp object with the library that deals with analysing amplitude 
}

function takeSnapshot() {
  saveCanvas('snapshot', 'png'); // Save the canvas as a PNG image with the filename "snapshot.png"
}

function updateText() {
  inputText = this.value(); //the variable inputText was created to store whatever the dialog box receives;
  textArray1 = myFont.textToPoints(inputText, width / 2 - 250, height / 2+200, size, {
    sampleFactor: 0.1,
  
  });
}

function updateTextPosition() {
  let xPos = xPosSlider.value(); //the information from the interaction will be stored in the variables xPos and yPos that can be accessed by the key visual element
  let yPos = yPosSlider.value();
  textArray1 = myFont.textToPoints(inputText, xPos, yPos, size, { //
    sampleFactor: 0.1,
  });
}

function updateAudio() {
  let selectedOption = audioDropdown.value();
  
  // Load the corresponding audio file based on the selected option
  switch (selectedOption) {
    case "1":
      selectedAudio = loadSound("dings.mp3");
      break;
    case "2":
      selectedAudio = loadSound("performance.mp3");
      break;
    case "3":
      selectedAudio = loadSound("siren.mp3");
      break;
    case "4":
      selectedAudio = loadSound("train announcement.mp3");
      break;
    case "5":
      selectedAudio = loadSound("union park murmur.mp3");
      break;
    default:
      selectedAudio = null; // Handle the default case or invalid selection
  }
}

function updateTextColor() {
  let selectedColor = colorToHex(colorDropdown.value());
  let colorHex = colorToHex(selectedColor);
  stroke(colorHex);
}

function colorToHex(colorName) {
  switch (colorName) {
    case "Red":
      return "#EE352E";
    case "SubwayGreen":
      return "#00933C";
    case "SubwayBlue":
      return "#0039A6";
    case "SubwayYellow":
      return "#FCCC0A";
    case "SubwayOrange":
      return "#FF6319";
    case "SubwayGray":
      return "#A7A9AC";
    case "SubwayBrown":
      return "#996633";
    case "SubwayLime":
      return "#6CBE45";
    default:
      return "#6CBE45";
  }
}

function toggleSong(){
  if (selectedAudio.isPlaying()){ //if the mouse is pressed and you do hear audio
    selectedAudio.pause(); //it will be paused 
    button.html("| |");
  }
  else{
    selectedAudio.play(); //default state if the mouse is pressed and you don't hear any audio, it will play
    button.html('▶');
  }
}

function makeMonster(){
  beginShape()
  for(let i = 0; i < textArray1.length;i++){
  noFill();
  push();
  strokeWeight(5);
  stroke(palette[Math.floor(Math.random()*palette.length)]);
  translate(textArray1[i].x, textArray1[i].y);
  rotate(r);
    // r = r+noise(1);
    r++;
    // bezier(-20, -20,30,20+offset,10,10, 20, 20);
    bezier(-20, -20,30,offset,10,10, 20, 20);

  pop();

// for(let i = 0; i < textArray1.length;i++){
//   push()
//   noFill();
//   stroke(palette[Math.floor(Math.random()*palette.length)]);
//   strokeWeight(2);
// circle(textArray1[i].x, textArray1[i].y, offset);
//   pop();
// }
}
}

function makeHairlines(){
  beginShape();
  for (let i = 0; i < textArray1.length; i++) {
 let colorValue = map(i, 0, textArray1.length, 290, 260); // map the index of the position to a color value
 stroke(palette[Math.floor(Math.random()*palette.length)]);
     push();
     noFill();
     stroke(palette[Math.floor(Math.random()*palette.length)]);
      strokeWeight(5);
      translate(textArray1[i].x, textArray1[i].y);
      rotate(220);
      // r++;
      line( 5, 5, 15, 15+3*(-offset)/2);
      pop();
  }
}

function makeChaos(){
//   beginShape()
//     for(let i = 0; i < textArray1.length;i++){
//       noFill();
//     push();
//     strokeWeight(5);
//     stroke(palette[Math.floor(Math.random()*palette.length)]);
//     translate(textArray1[i].x, textArray1[i].y);
//     rotate(r);
//     r = r+0.1;
//     // bezier(-20, -20,slider1.value(),slider1.value(),10,10, 20, 20);
//     // bezier(-20, -20,30,offset,10,offset, 20, offset);
//     bezier(-20, -20,30,offset,10,offset, 20, offset);

//     pop();
// }
for(let i = 0; i < textArray1.length;i++){
push();
noFill();
stroke(palette[Math.floor(Math.random()*palette.length)]);
strokeWeight(5);
translate(textArray1[i].x, textArray1[i].y);
rotate(r);
r++;
bezier(-20, -20,offset,offset,20,20, 20, 20);
pop();
}
}

function makeJitters(){
  for (let i = 0; i < textArray1.length; i++) {
    push();
    strokeWeight(5);
    stroke(palette[Math.floor(Math.random()*palette.length)]);
    translate(textArray1[i].x, textArray1[i].y);
    rotate(r);
    r++;
    line(-10, -10, 10, 10);
    pop();
}
}

function backCover(){
  push()
  translate(width/2,height/2)
  beginShape()
  for(let i = 0; i<360; i++){
   let a = map(volar[i], 0,1, 400,1000)
    let x = a * cos(i);
    let y = a * sin(i);
noStroke();
fill(palette[Math.floor(Math.random()*palette.length)]);
circle(x, y,10);
// line(x,y,x+20,y+20)
// vertex(x, y);
  }
  endShape();
if(volar.length>360) {
  volar.splice(0,1)
}
pop();
}

function draw() {
  selectedColor = colorDropdown.value();
  background(selectedColor);
 vol = amp.getLevel(); //a variable that stores the amplitude values of the playing audio
 volar.push(vol);
offset = map(vol,0,1,20,500);
let val = radio.value();
// noStroke();
// fill(selectedColor);
// circle(width/2,height/2,800);
backCover();


if (val == 1) {
  makeChaos();
}

if (val == 2) {
  makeMonster();
}

if (val == 3) {
  makeHairlines();
}

if (val == 4) {
  makeJitters();
}


}
// push()
// stroke(255);
// noFill();
// translate(width / 2, height / 2);
// beginShape();
// for (var i = 0; i < 360; i++) {
//   var r = map(volar[i], 0, 1, 100, 400);
//   var x = r * cos(i);
//   var y = r * sin(i);
//   vertex(x, y);
// }
// endShape();

// if (volar.length > 360) {
//   volar.splice(0, 1);
// }
// pop();
