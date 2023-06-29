const canvas = document.getElementById('pingpong');
const ctx = canvas.getContext("2d");

const user ={
    x:10,
    y: canvas.height/2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

const comp ={
    x: canvas.width-20,
    y: canvas.height/2,
    width: 10,
    height: 100,
    color: 'white',
    score: 0
}

const ball ={
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 5,
    velocityx: 5,
    velocityy: 5,
    color: 'white'
}



function drawRect(x,y,h,w,c,){
    ctx.fillStyle = c;
    ctx.fillRect(x,y,h,w);
}

function drawCircle(x,y,r,c){
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fill();
}

function drawText(text,x,y,c){
    ctx.fillStyle = c;
    ctx.font = "70px fantasy";
    ctx.fillText(text,x,y);
}

function render(){
    drawRect(0,0,600,600,"black");
    drawRect(canvas.width/2,0,2,600,"white");
    drawRect(user.x,user.y,user.width,user.height,user.color);
    drawRect(comp.x,comp.y,comp.width,comp.height,comp.color);
    drawCircle(ball.x,ball.y,ball.radius,ball.color);
    drawText(user.score,canvas.width/4,90,'aquamarine');
    drawText(comp.score,canvas.width/2+100,90,'#BAB86C');
}

canvas.addEventListener('mousemove', getmousePos);

function getmousePos(event){
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY;
}

function touchinguser(){
    if(ball.x>user.x&&ball.x<(user.x+user.width)&&
    ball.y>user.y&&ball.y<(user.y+user.height)){
        return true;
    }
    else{
        return false;
    }
}

function touchingcomp(){
  if(ball.x>comp.x&&ball.x<(comp.x+comp.width)&&
  ball.y>comp.y&&ball.y<(comp.y+comp.height)){
      return true;
  }
  else{
      return false;
  }
}

function resetball(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityx = -ball.velocityx;
}

function update(){
    ball.x += ball.velocityx;
  ball.y +=  ball.velocityy;

  if (ball.x<0){
    comp.score+=1;
    resetball()
  }

  else if (ball.x>canvas.width){
    user.score+=1;
    resetball()
  }

  if (ball.y<0){
    ball.velocityy = -ball.velocityy;
  }

  if (ball.y>canvas.height){
    ball.velocityy = -ball.velocityy;
  }

  if (touchinguser()){
    ball.velocityx = -ball.velocityx
  }

  if (touchingcomp()){
    ball.velocityx = -ball.velocityx
  }
  
  comp.y=ball.y -comp.height/2;
}

function game(){
  render();
  update();
}

const fps = 50;

setInterval(game, 1000/fps);