function setup(){
createCanvas(400,400);
}

function draw(){
  for (let i=0;i<4;i+=1){

    
    for (let j=0;j<4;j+=1){
      fill(50*(i+j),50*(i+j),50*(i+j));
      rect(i*100,j*100,100,100);
    }
  }
  noLoop();
}
