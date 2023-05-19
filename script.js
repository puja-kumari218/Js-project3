let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let grid = document.getElementsByClassName('grid')[0];
let squares = document.querySelectorAll('.square');
let gameMusic = new Audio('./Assets/gameMusic.mp3');
let hitMusic = new Audio('./Assets/hitMusic.mp3');


let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// randomly place mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole');
    })
    let randomSquare = squares[Math.floor(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;

    if(timeLeft === 0){
        // Clears an existing interval timer by passing in the numeric value returned by setInterval(). Some interval timers do not run forever, but need to be stopped at some time (maybe like a countdown, see the first example).
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
        timeLeftH2.innerHTML = `Time Over: 0`;
    }
}


function startGame(){
    score = 0;
    timeLeft = 60;
    gameMusic.play();
    scoreH2.innerHTML = 'Your Score: 0';
    timeLeft.innerHTML = 'Time Left: 60';
    grid.style.display = 'flex';
    //pause button a jai uske lia
    pauseGameButton.style.display = 'inline-block'
    pauseGameButton.innerHTML = 'Pause';
    gameMusic.play();
    // callback function
    // setInterval call function at regular interval
    timerId = setInterval(randomMole, 600);
    randomMoleId = setInterval(countDown, 1000);
}

function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        // clearInterval clears the events call by setInterval;
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGameButton.textContent = 'Pause';
    }
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null){
            if(square.id === hitPosition){
                hitMusic.play();
                setTimeout(() => {hitMusic.pause()}, 1000);
                score++;
                scoreH2.innerHTML = `Your Score ${score}`;
                hitPosition = null;
            }
        }
    })
})
startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);