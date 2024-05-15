let vidW=160;
let vidH=0.75*vidW;

// Classifier Variable
let classifier;

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confidence;

// variable vi bruger til at tegne bilen
let dir=0; // hvor meget den drejer. den drejer 0 grader
let x=250; // punkets start
let y=250; // punkets start
let a=0; // angle (vinklen bilen drejer med -- 0 betyder straight mod højre)
let s=7; // hastighed (pixels per frame)
let stir = 5; // hvor skarpt den drejer

let bgimg;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier('./model.json');

  bgimg = loadImage("./bane.png");


}

function setup() {

  angleMode(DEGREES);

  createCanvas(1000, 600);
  // Create the video
  video = createCapture(VIDEO);
  video.size(vidW, vidH);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(255);

  image(bgimg,0,0);

  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  rect(vidW/2-27.5,vidH - 20,55,20);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(label, vidW/2 , vidH - 4);
  
  if (label=="left") {
    dir = -1;
    print("left: ", dir);
  }
  
  if (label=="right "){
    dir = 1;
    print("right: ", dir);
  } 

  if (/*confidence<0.95 || */label=="straight") {
    dir=0;
    print("IDK");
  }
 
  print(dir);
  a+=stir*dir
  a = a % 360;


  x+=cos(a)*s;
  y+=sin(a)*s;


  fill(0,0,200);
  ellipse (x,y,30);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  confidence = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}