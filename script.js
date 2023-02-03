let turnOrder = randomizeTurnOrder()
let hover = "inactive"

const P1 = 'X';
const P2 = 'O';

function randomizeTurnOrder(){
  if ((Math.round(Math.random())) == 1) {
    console.log("X goes first")
    document.getElementById("X_score").style.background = "rgba(211, 211, 211, 0.5)"
    document.getElementById("O_score").style.background = "none"
    return 'X';
  } else {
    console.log("O goes first")
    document.getElementById("X_score").style.background = "none"
    document.getElementById("O_score").style.background = "rgba(211, 211, 211, 0.5)"
    return 'O';
  }
}

function clearPoints(){
    let Opnts = document.getElementById("Opnts")
    if(Opnts.hasChildNodes()==true){
        Opnts.removeChild(Opnts.firstChild)
        clearPoints()
    }else{
    }

    let Xpnts = document.getElementById("Xpnts")
    if(Xpnts.hasChildNodes()==true){
        Xpnts.removeChild(Xpnts.firstChild)
        clearPoints()
    }else{
    }
}

function clearBoard(){
    board =[
        0,1,2,
        3,4,5,
        6,7,8
    ]
    draw()
}

function animateClearBoard(){
    hover = "inactive"
    let i;
    for (i = 0; i < 9; i++){
        let cell = document.getElementById(i)
        cell.parentNode.classList.remove("cube");
        setTimeout(function(object){
            cell.parentNode.classList.add("cube2")
            cell.parentNode.onanimationend = () => {
                cell.parentNode.classList.remove("cube2");
                cell.innerHTML = ""
                hoverActivate()
            };
        }, (i * 350));
    };
    setTimeout(clearBoard, (i*350))
}

function animateClearBoard2(){
    hover = "inactive"
    let i
    for (i = 0; i < 9; i++){
        let cell = document.getElementById(i)
        cell.parentNode.classList.remove("cube");
        setTimeout(function(object){
            cell.parentNode.classList.add("cube3")
            cell.parentNode.onanimationend = () => {
                cell.parentNode.classList.remove("cube3");
                cell.innerHTML = ""
                hoverActivate()
            };
        }, (i * 350));
    };
    setTimeout(clearBoard, (i*350))
}


function findIndexEmptySquares(){
    emptySquares = []
    for(let i = 0; i <= board.length; i++){
        if(typeof board[i] === 'number'){
            emptySquares.push(i)
        }
    }
    return emptySquares
}

function draw(){
    for (let i = 0; i < 9; i++){
        let cell = document.getElementById(i)
        cell.addEventListener("mouseover", function(object){
            if(hover == "active"){
                if(cell.innerHTML==""){
                    cell.style.backgroundImage = "url(./" + turnOrder + ".svg)"
                    cell.style.opacity = "0.5"
                }
            }
        })
        cell.addEventListener("mouseleave", function(object){
            cell.style.background = "white"
            cell.style.opacity = "1"
        })
    }
    if((document.getElementById("playerO_dropdown").value=="player")&&(document.getElementById("playerX_dropdown").value=="player")){
        hover="active"
    } else if((document.getElementById("playerO_dropdown").value=="bot")&&(document.getElementById("playerX_dropdown").value=="bot")){
        hover="inactive"
    }
}

document.getElementById("playerX_dropdown").addEventListener("change", changeDropdown)
document.getElementById("playerO_dropdown").addEventListener("change", changeDropdown)

function changeDropdown(){
    if(document.getElementById("playerO_dropdown").value=="bot"){
        document.getElementById("OprofileImage").src = "./space-invaders.svg"
        clearPoints()
    }else{
    }
    if(document.getElementById("playerX_dropdown").value=="bot"){
        document.getElementById("XprofileImage").src = "./space-invaders.svg"
        clearPoints()
    }else{
    }
    if(document.getElementById("playerO_dropdown").value=="player"){
        document.getElementById("OprofileImage").src = "./gamepad.svg"
        clearPoints()
    }
    else{
    }
    if(document.getElementById("playerX_dropdown").value=="player"){
        document.getElementById("XprofileImage").src = "./gamepad.svg"
        clearPoints()
    }
    else{
    }
    
    if((turnOrder==P2)&&(document.getElementById("playerO_dropdown").value=="bot")){
        setTimeout(botPlay(), 1000)
    } else if((turnOrder==P1)&&(document.getElementById("playerX_dropdown").value=="bot")){
        setTimeout(botPlay(), 1000)
    } else {
    }
}

function changeTurn(){
    //change player indicator
    if(turnOrder=="X"){
        turnOrder="O"
        document.getElementById("X_score").style.background = "none"
        document.getElementById("O_score").style.background = "rgba(211, 211, 211, 0.5)"
    } else {
        turnOrder="X"
        document.getElementById("O_score").style.background = "none"
        document.getElementById("X_score").style.background = "rgba(211, 211, 211, 0.5)"
    }

    //
    if((turnOrder==P2)&&(document.getElementById("playerO_dropdown").value=="bot")){
        botPlay()
        if(checkWinner()==true){animateClearBoard2()}
    }
    if((turnOrder==P1)&&(document.getElementById("playerX_dropdown").value=="bot")){
        botPlay()
        if(checkWinner()==true){animateClearBoard2()}
    }
}

function hoverActivate(){
    if((document.getElementById("playerX_dropdown").value=="bot")&&(document.getElementById("playerO_dropdown").value=="bot")){
    hover = "inactive"
    } else {
    hover = "active"
    }

    if((turnOrder==P2)&&(document.getElementById("playerO_dropdown").value=="bot")){
        hover = "inactive"
    }
    if((turnOrder==P1)&&(document.getElementById("playerX_dropdown").value=="bot")){
        hover = "inactive"
    }
} 

function botPlay(){
    let cell = document.getElementById(bestSpot())
    if((cell == undefined)&&(document.getElementById("playerX_dropdown").value == "bot")&&(turnOrder==P1)){
        animateClearBoard2()
        setTimeout(function(){
            cell = document.getElementById(bestSpot())
            place(cell)
            hoverActivate()
        }, 3200)
    } else if((cell == undefined)&&(document.getElementById("playerO_dropdown").value == "bot")&&(turnOrder==P2)){
        animateClearBoard2()
        setTimeout(function(){
            cell = document.getElementById(bestSpot())
            place(cell)
            hoverActivate()
        }, 3200)
    } else if((document.getElementById("playerO_dropdown").value == "bot")&&(turnOrder==P2)){
        setTimeout(function(){
            place(cell)
            hoverActivate()
        }, 1000)
    } else if((document.getElementById("playerX_dropdown").value == "bot")&&(turnOrder==P1)){
        setTimeout(function(){
            place(cell)
            hoverActivate()
        }, 1000)
    } else {
    }
}

function place(cell){
    if(cell.innerHTML==""){
            //Animate
           cell.parentNode.classList.add("cube")
           cell.parentNode.onanimationend = () => {cell.parentNode.classList.remove("cube")};
           //Place IMG
           let img = document.createElement("img")
           img.src = "./" + turnOrder + ".svg"
           cell.appendChild(img)
           //Update board array
           board[cell.id] = turnOrder
           if(checkWinner()==true){animateClearBoard2()}
            changeTurn()
    }
}

function checkWinner(player){
    if(!player){
        player = turnOrder
    }else{

    }
    if  (((board[0] == player)&&(board[1] ==  player)&&(board[2]==player))||
         ((board[3] == player)&&(board[4] ==  player)&&(board[5]==player))||
         ((board[6] == player)&&(board[7] ==  player)&&(board[8]==player))||
         ((board[0] == player)&&(board[3] ==  player)&&(board[6]==player))||
         ((board[1] == player)&&(board[4] ==  player)&&(board[7]==player))||
         ((board[2] == player)&&(board[5] ==  player)&&(board[8]==player))||
         ((board[0] == player)&&(board[4] ==  player)&&(board[8]==player))||
         ((board[2] == player)&&(board[4] ==  player)&&(board[6]==player))){
            let img = document.createElement("img")
            img.src = "./one-up.svg"
            document.getElementById(turnOrder + "pnts").appendChild(img)
            return true
         }else if(board.filter(item => typeof item === 'number').length == 0){
            return true
        } else {
            return false
        }
}


///WORKS

function minimax(newBoard, player) {
	var availSpots = findIndexEmptySquares();
	if (checkWin(newBoard, P1)) {
		return {score: -10};
	} else if (checkWin(newBoard, P2)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == P2) {
			var result = minimax(newBoard, P1);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, P2);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}
	var bestMove;
	if(player === P2) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

function bestSpot() {
	return minimax(board, turnOrder).index;
}

function checkWin(board, player) {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

animateClearBoard()