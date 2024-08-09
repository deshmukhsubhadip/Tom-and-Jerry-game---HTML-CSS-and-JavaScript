let score = 0;
let cross = true;
let gameOver = false;

document.onkeydown = function(e) {
    if (gameOver) return; 

    console.log("KeyCode is: ", e.keyCode);
    let Jerry = document.querySelector('.Jerry');

    if (e.keyCode == 38) {
        Jerry.classList.add('animateJerry');
        setTimeout(() => {
            Jerry.classList.remove('animateJerry');
        }, 900);
    }

    if (e.keyCode == 39) {
        let JerryX = parseInt(window.getComputedStyle(Jerry, null).getPropertyValue('left'));
        Jerry.style.left = JerryX + 400 + "px";
    }

    if (e.keyCode == 37) {
        let JerryX = parseInt(window.getComputedStyle(Jerry, null).getPropertyValue('left'));
        Jerry.style.left = (JerryX - 200) + "px";
    }
}

setInterval(() => {
    let Jerry = document.querySelector('.Jerry');
    let gameover = document.querySelector('.gameover');
    let Tom = document.querySelector('.Tom');

    let dx = parseInt(window.getComputedStyle(Jerry, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(Jerry, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(Tom, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(Tom, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // Fast Game Over Check
    if (offsetX < 113 && offsetY < 150) {
        gameover.style.visibility = 'visible';
        Tom.classList.remove('animateTom');
        gameOver = true;
    }

    // Score Increment Logic
    if (!gameOver && offsetX > 113 && offsetX < 200 && cross) { // Jerry has crossed Tom
        score += 1;
        updateScore(score);
        cross = false;

        // Reactivate crossing after a delay
        setTimeout(() => {
            cross = true;
        }, 1000);

        // Increase Tom's speed after each cross
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(Tom, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.2;
            Tom.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    document.getElementById('scoreCont').innerHTML = "Your score: " + score;
}
