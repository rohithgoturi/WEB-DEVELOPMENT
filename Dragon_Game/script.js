let score = 0;
let cross = true;

bgm1 = new Audio("bgm.mp3");
audiogo = new Audio("gameover.mp3");

document.onkeydown = function(e){
    console.log("key code is ",e.keyCode);
    if(e.keyCode==38){
        man = document.querySelector(".man");
        man.classList.add("animateMan");
        setTimeout(() => {
            man.classList.remove("animateMan");
        },700);

        man = document.querySelector(".man");
        manX = parseInt(window.getComputedStyle(man,null).getPropertyValue('left'));
        man.style.left = manX + 88 +"px";
        bgm1.play();
    }

    if(e.keyCode==39){
        man = document.querySelector(".man");
        manX = parseInt(window.getComputedStyle(man,null).getPropertyValue('left'));
        man.style.left = manX + 88 +"px";
        
    }

    if(e.keyCode==37){
        man = document.querySelector(".man");
        manX = parseInt(window.getComputedStyle(man,null).getPropertyValue('left'));
        man.style.left = (manX - 112) +"px";
        
    }
}


setInterval(() => {
    let man = document.querySelector(".man");
    let gameOver = document.querySelector(".gameOver");
    let obstacle = document.querySelector(".obstacle");

    // Use getBoundingClientRect() to track real-time positions
    let manRect = man.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    // Calculate the difference in position
    let offSetX = Math.abs(manRect.left - obstacleRect.left);
    let offSetY = Math.abs(manRect.top - obstacleRect.top);

    console.log(offSetX, offSetY);  // Check the offset values

    // Define the collision threshold
    let thresholdX = manRect.width / 2 + obstacleRect.width / 2;
    let thresholdY = manRect.height / 2 + obstacleRect.height / 2;

    // Check for collision
    if (offSetX < thresholdX && offSetY < thresholdY) {
        gameOver.innerText = "GAME OVER!!";
        obstacle.classList.remove("obstacleAni");
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            bgm1.pause();
        }, 1000);

    } else if(offSetX<145 && cross){
        score++;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue("animation-duration"));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + "s";
            console.log("the new animation duration = ",newDur);
        }, 500);
    }
}, 100);

function updateScore(score) {
    let scoreCount = document.getElementById('scoreCont');
    scoreCount.innerHTML = "Your Score: " + score;
}
