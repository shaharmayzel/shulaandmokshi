

var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
var gGameS = '';
var gGoing = '😀'
var gLost = '🤯'
var gWon = '😍'
var gLevel = { size: 4, mines: 2 };
var gBoard = null;
var gameOn = false;
var gMinutes = 0;
var gSeconds = 0;
var gInterval = null;
var gLives = 3;
var gID = 0;
var mineClick = false;
var cellsClicked = 0;
var gHeart = '🧡';
var gFirstI = null;
var gFirstJ = null;
var gCurrHint1 = '💡';
var gCurrHint2 = '💡';
var gCurrHint3 = '💡';

function init() {
    gBoard = createBoard();
    console.table(gBoard);
    renderBoard();
}




function setTime() {
    if (gameOn === true) {
        var elTimer = document.querySelector('.timer');
        gInterval = setInterval(changeTimer, 1000);
        console.log('interval: ' + gInterval);
        console.log();
    }

}

function changeTimer() {
    var elTimer = document.querySelector('.timer');
    gSeconds++;
    if (gSeconds === 60) {
        gMinutes++;
        gSeconds = 0;
    }
    var minutesText = (gMinutes < 10) ? ('0' + gMinutes) : gMinutes;
    var secondsText = (gSeconds < 10) ? ('0' + gSeconds) : gSeconds;
    var timeText = minutesText + ':' + secondsText;
    console.log('Minutes:' + gMinutes + ' seconds: ' + gSeconds);

    elTimer.innerText = timeText;
}

function createBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                i: i,
                j: j,
                isFirst: false,
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isClickedMine: false,
                isHint: false,
                isMarked: false,
                isClicked: false
            }
            board[i][j] = cell
        }
    }
    return board;
}

function minesSet() {
    randomMineSet(gLevel.mines);
}

function level2() {
    gGameS = '';
    gLevel.size = 8;
    gLevel.mines = 12;
    init();

}

function level1() {
    gLevel.size = 4;
    gLevel.mines = 2;
    init();

}

function level3() {
    gGameS = '';
    gLevel.size = 12;
    gLevel.mines = 30;
    init();

}

function randomMineSet(howmany) {
    var k = 0
    var counter = 0
    while (k < howmany) {
        counter++
        if (counter > 1000) break;
        var i = getRandomInt(0, gLevel.size);
        var j = getRandomInt(0, gLevel.size);
        if (gBoard[i][j].isMine === true) continue;
        if (gBoard[i][j] === gBoard[gFirstI][gFirstJ]) continue;
        else {
            gBoard[i][j].isMine = true;
            k++

        }
    }
}


function renderBoard() {

    var board = gBoard;
    var strHtml = '';
    for (var i = 0; i < gLevel.size; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < gLevel.size; j++) {

            var cell = board[i][j];
            var cellClass = '';
            var cellText = '';

            if (cell.isHint === true) {
                if (cell.isMine === true) {
                    cellText = '&#128163;';
                }
            }
            else if (cell.isMarked === true) {
                cellClass += ' marked';
                cellText = '🚩';
            }
            else if (cell.isShown === false) {
                cellClass += ' hidden';
                cellText = ' ';
            }
            else if (cell.isMine === true && cell.isShown === true) {
                cellClass += ' ';
                cellText = '&#128163;';
            }
            else if (cell.isMine === true) {
                cellClass += ' mine';
                cellText = '&#128163;';
            }

            else if (cell.isMineClicked === true) {
                cellText = '&#128163;';
            }
            else {
                if(cell.isHint === false) {
                cellText = cell.minesAroundCount;
                }
            }
            // if (cell.isBooked) cell += ' booked'; // just for now, chane later!!!


            strHtml += `<td class="cell ${cellClass}" id="${gID}" `
            // strHtml += '</td>'

            if (cell.isMine === false) {
                strHtml += `onclick="clickCell(${cell.i}, ${cell.j})"`
            }
            if (cell.isMine === true) {
                strHtml += `onclick="clickMine(${cell.i}, ${cell.j})"`
            }

            strHtml += `oncontextmenu="markCell(${cell.i}, ${cell.j})">${cellText}</td>`

        }
        strHtml += '</tr>'

        gID++;
    }

    if (gLives === 3) {
        strHtml += `<div class="heart">lives:${gHeart}</div>`
        strHtml += `<div class="heart">${gHeart}</div>`
        strHtml += `<div class="heart">${gHeart}</div>`
    }
    if (gLives === 2) {
        strHtml += `<div class="heart">lives:${gHeart}</div>`
        strHtml += `<div class="heart">${gHeart}</div>`
    }
    if (gLives === 1) {
        strHtml += `<div class="heart">life:${gHeart}</div>`
    }

    // if (gGameS === 'going') strHtml += `<div class="smiley">${gGoing}</div>`
    // if (gGameS === 'lost') strHtml += `<div class="smiley">${gLost}</div>`
    // if (gGameS === 'won') strHtml += `<div class="smiley">${gWon}</div>`
    // strHtml += `<div class="hints" onclick= "hints(2)">${gCurrHint2}</div>`
    // strHtml += `<div class="hints" onclick= "hints(3)">${gCurrHint3}</div>`

    var elGameBoard = document.querySelector('.board');
    elGameBoard.innerHTML = strHtml;
    console.log(gGameS);

}


// function hints(hintnum) {
//     var i = getRandomInt(0, gLevel.size);
//     var j = getRandomInt(0, gLevel.size);
//     gBoard[i][j].isHint === true;
//     if (hintnum === 1) {
//         gCurrHint1 = '⌛';
//     }
//     else if (hintnum === 2) {
//         gCurrHint2 = '⌛';
//     }
//     else {
//         gCurrHint3 = '⌛';
//     }
//     renderBoard();

//     gInterval = setTimeout(hintint(i, j, hintnum), 300);

//     if (hintnum === 1) {
//         gCurrHint1 = ' ';
//     }
//     else if (hintnum === 2) {
//         gCurrHint2 = ' ';
//     }
//     else {
//         gCurrHint3 = ' ';
//     }
//     renderBoard();

// }
// // 
// function hintint(i, j, hintnum) {
//     // gBoard[i][j].isHint === false;
//     // if (hintnum === 1) {
//     //     gCurrHint1 = '⌛';
//     // }
//     // else if (hintnum === 2) {
//     //     gCurrHint2 = '⌛';
//     // }
//     // else {
//     //     gCurrHint3 = '⌛';
//     // }
//     // renderBoard();
//     // if (hintnum === 1) {
//     //     gCurrHint1 = ' ';
//     // }
//     // else if (hintnum === 2) {
//     //     gCurrHint2 = ' ';
//     // }
//     // else {
//     //     gCurrHint3 = ' ';
//     // }

// }


function markCell(i, j) {
    gameOn = true;

    if (gBoard[i][j].isShown === false && gBoard[i][j].isClicked === false) {
        gBoard[i][j].isMarked = true;
        gBoard[i][j].isClicked = true;
        cellsClicked++;
        renderBoard();
        console.log(cellsClicked);
    }

    gameOver();

}




function clickCell(i, j) {

    if (cellsClicked === 0) {
        gGameS = 'going';
        var smiley = document.querySelector('.smiley');
        smiley.innerText = '😀'
        gameOn = true;
        setTime();
        gFirstI = i;
        gFirstJ = j;
        gBoard[i][j].isShown = true;
        gBoard[i][j].isClicked = true;
        cellsClicked++;
        minesSet();
        setMinesNegsCount();
        renderBoard();
    }

    if (gBoard[i][j].isShown === false && gBoard[i][j].isMarked === false && gBoard[i][j].isClicked === false) {
        gBoard[i][j].isShown = true;
        gBoard[i][j].isClicked = true;
        cellsClicked++;

        renderBoard();
        console.log(cellsClicked);
        gameOver();
    }

}

function gameOver() {
    
    if (cellsClicked === (gLevel.size * gLevel.size) && mineClick === false) {



        //     for (var i = 0; i < gLevel.size; i++) {
        //         for (var j = 0; j < gLevel.size; j++) {
        //             console.log('g');
        //             gBoard[i][j].isMarked === false;
        //             gBoard[i][j].isShown === true;
        //         }
        //     }
        // }
        var smiley = document.querySelector('.smiley');
        smiley.innerText = '😍'
        renderBoard();
        var over = document.querySelector('.over')
        over.innerHTML += `<h1>You Won in ${gSeconds}seconds!</h1>`
        clearInterval(gInterval);
        gameIsOn = false;
        gMinutes = 0;
        gSeconds = -1;
        changeTimer();
    }
}






function lives() {
    gLives--;
    console.log(gLives);
    renderBoard();
}


function clickMine(i, j) {
    lives();
    if (gLives === 0) {
        mineClick = true;
        gBoard[i][j].isShown = true;
        gBoard[i][j].isClicked = true;
        cellsClicked++;
        var smiley = document.querySelector('.smiley');
        smiley.innerText = '🤯'
        renderBoard();
        gameLost(); // not yet
        
    }

}

function gameLost() {
    clearInterval(gInterval);
    gameIsOn = false;
    gMinutes = 0;
    gSeconds = -1;
    changeTimer();
    gameOn = false;
    var over = document.querySelector('.over')
    over.innerHTML += `<h1>are mad at you</h1><h1>YOU LOST...</h1>`

}





function setMinesNegsCount() {
    for (var k = 0; k < gLevel.size; k++) {
        for (var b = 0; b < gLevel.size; b++) {
            var cellI = gBoard[k][b].i;
            var cellJ = gBoard[k][b].j;
            for (var i = cellI - 1; i <= cellI + 1; i++) {
                if (i < 0 || i >= gLevel.size) continue;
                for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                    if (i === cellI && j === cellJ) continue;
                    if (j < 0 || j >= gLevel.size) continue;
                    if (gBoard[i][j].isMine === true) gBoard[cellI][cellJ].minesAroundCount++;
                    // if (gBoard[j][i].isMine === true) gBoard[cellI][cellJ].minesAroundCount++;
                }
            }
        }
    }

}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}