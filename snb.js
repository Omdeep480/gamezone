const playboard=document.querySelector(".playboard");
const scr=document.querySelector("#scr");
const hscr=document.querySelector("#hscr");
let foodX;
let foodY;
let snakeX=7;
let snakeY=10;
let velX=0;
let velY=0;
let snakebody=[];
let gameover=false;
let setIntervalid;
let score=0;
let highscr = localStorage.getItem("highscore") || 0;
    hscr.innerText= `HighScore : ${highscr}`; 
const changefoodpos=() => {
    foodX=Math.floor(Math.random()*20)+1;
       foodY=Math.floor(Math.random()*20)+1;
}

const handlegameover=() => {
    clearInterval(setIntervalid);
    alert("Game Over!!! click OK to play again");
    location.reload();

}

const changedirection = (e) => {
    if(e.key === "ArrowUp" && velY != 1)
  {
    velX=0;
    velY=-1;
  }
  else if(e.key === "ArrowDown" && velY != -1)
  {
    velX=0;
    velY=1;
  }
   else if(e.key === "ArrowRight" && velX != 1)
  {
    velX=1;
    velY=0;
  }
   else if(e.key === "ArrowLeft" && velX != -1)
  {
    velX=-1;
    velY=0;
  }

}

const initGame = () => {
    if(gameover) return handlegameover();
    let htmlMarkup = ` <div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changefoodpos();
        snakebody.push([foodX,foodY]);
        score++;
        highscr = score >= highscr ? score : highscr ;
        localStorage.setItem("highscore",highscr);
        scr.innerText= `Score : ${score}`;
        hscr.innerText= `HighScore : ${highscr}`;    
    }

    for (let i =snakebody.length-1; i > 0; i--) {
        snakebody[i]=snakebody[i-1];
        
    }

snakebody[0]=[snakeX,snakeY];

    snakeX +=velX;
     snakeY +=velY;

    if(snakeX<=0 || snakeX>20 || snakeY<=0 || snakeY>20)
    {
        gameover=true;
    }

     for (let i = 0; i < snakebody.length; i++) {
        if(i === 0){
        htmlMarkup += ` <div class="head" style="grid-area: ${snakebody [i][1]}/${snakebody [i][0]}"></div>`;
        }
        else{
            htmlMarkup += ` <div class="body" style="grid-area: ${snakebody [i][1]}/${snakebody [i][0]}"></div>`;
        }

        if(i !== 0 && snakebody[0][1] === snakebody[i][1]  && snakebody[0][0] === snakebody[i][0])
        {
            gameover = true;
        }
        
     }

    playboard.innerHTML= htmlMarkup;
}
changefoodpos();

setIntervalid=setInterval(initGame,175);

document.addEventListener("keydown",changedirection);


