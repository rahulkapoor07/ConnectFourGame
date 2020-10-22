const width = 7;
const height = 6;
let gameStart = true;
let currPlayer = 1;
const gameDiv = document.querySelector('.game');
const table = document.querySelector('.board');


function createHtmlBoard(){
    //top row
    const topRow = document.createElement('tr');
    topRow.setAttribute('id', 'top-column');
    topRow.style.cursor = 'pointer';
    topRow.addEventListener('click', handleClick);

    //top cells
    for (let i = 0; i < width; i++){
        const topCell = document.createElement('td');
        topCell.className = 'top-cells';
        topRow.appendChild(topCell);
    }
    table.appendChild(topRow);

    for (y = 0; y < height; y++){
        const rows = document.createElement('tr');
        for (let x = 0; x < width; x++){
            const cells = document.createElement('td');
            cells.setAttribute('id', `${y}-${x}`);
            cells.className = 'cells';
            rows.appendChild(cells);
        }
        table.appendChild(rows);
    }
}
createHtmlBoard();



// CHange Color of each cell to White and insert circle with white color
function changeColorOfCellsToWhite(){
    for(let y = 0; y < height; y++){
        for (let x = 0; x < width; x++){
            document.getElementById(`${y}-${x}`).style.backgroundColor = 'white';
            const div = document.createElement('div');
            div.className = 'circle';
            div.className = `${y}-${x}`;
            document.getElementById(`${y}-${x}`).appendChild(div);
        }
    }
}
changeColorOfCellsToWhite()



//click handler function...
function handleClick(e){
    if(gameStart){
        const targetX = e.target.cellIndex;
        arr = [];
        for(let y = 5; y > -1; y--){
            if(document.getElementById(`${y}-${targetX}`).style.backgroundColor === 'white'){
                arr.push(document.getElementById(`${y}-${targetX}`));
                if(currPlayer === 1){
                    arr[0].style.backgroundColor = '#f1f6f9';
                    arr[0].firstElementChild.classList.remove('circle');
                    arr[0].firstElementChild.classList.remove(`${y}-${targetX}`);
                    arr[0].firstElementChild.classList.add('circle-red');
                    if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2() ){
                        document.querySelector('.turn').textContent = 'Player 1 is Winner!';
                        document.querySelector('.turn').style.color = 'red';
                        document.querySelector('.turn').style.fontSize = '2rem';
                        gameStart = false;
                        return alert('Player 1 Winner!');
                    }else if(checkForTie()){
                        document.querySelector('.turn').textContent = 'It\'s a Tie!';
                        document.querySelector('.turn').style.color = 'white';
                        gameStart = false;
                        return alert('It\'s a Tie!');
                    }else{
                        document.querySelector('.turn').textContent = 'Player 2\'s turn';
                        return currPlayer = 2;
                    }
                        
                    
                }else{
                    arr[0].style.backgroundColor = '#f1f6f9';
                    arr[0].firstElementChild.classList.remove('circle');
                    arr[0].firstElementChild.classList.remove(`${y}-${targetX}`);
                    arr[0].firstElementChild.classList.add('circle-blue');
                    if(horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2() ){
                        document.querySelector('.turn').textContent = 'Player 2 is Winner!';
                        document.querySelector('.turn').style.color = 'Blue';
                        document.querySelector('.turn').style.fontSize = '2rem';
                        gameStart = false;
                        return alert('Player 2 Winner!');
                    }else if(checkForTie()){
                        document.querySelector('.turn').textContent = 'It\'s a Tie!';
                        document.querySelector('.turn').style.color = 'white';
                        gameStart = false;
                        return alert('It\'s a Tie!');
                    }else{
                        document.querySelector('.turn').textContent = 'Player 1\'s turn';
                        return currPlayer = 1;
                    }

                }
            }
        }
    }

}


//Color match check..

function colorMatchCheck(one, two, three, four){
    if((one === two) && (one === three) && (one === four)){
        return true;
    }
}

function horizontalCheck(){
    for(let y = 0; y < height; y++){
        for(let x = 0; x < 4; x++){
            if(colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y}-${x + 1}`).firstElementChild.className, 
            document.getElementById(`${y}-${x + 2}`).firstElementChild.className, document.getElementById(`${y}-${x + 3}`).firstElementChild.className)){
                document.getElementById(`${y}-${x}`).style.border = '4px solid';
                document.getElementById(`${y}-${x + 1}`).style.border = '4px solid';
                document.getElementById(`${y}-${x + 2}`).style.border = '4px solid';
                document.getElementById(`${y}-${x + 3}`).style.border = '4px solid';
                return true;
            }
        }
    }
}

function verticalCheck(){
    for(let x = 0; x < width; x++){
        for(let y = 0; y < 3; y++){
            if(colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y + 1}-${x}`).firstElementChild.className,
            document.getElementById(`${y + 2}-${x}`).firstElementChild.className, document.getElementById(`${y + 3}-${x}`).firstElementChild.className)){
                document.getElementById(`${y}-${x}`).style.border = '4px solid';
                document.getElementById(`${y + 1}-${x}`).style.border = '4px solid';
                document.getElementById(`${y + 2}-${x}`).style.border = '4px solid';
                document.getElementById(`${y + 3}-${x}`).style.border = '4px solid';
                return true;
            }
        }
    }
}

function diagonalCheck1(){
    for (let x = 0; x < 4; x++){
        for(let y = 0; y < 3; y++){
            if(colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y + 1}-${x + 1}`).firstElementChild.className,
            document.getElementById(`${y + 2}-${x + 2}`).firstElementChild.className, document.getElementById(`${y + 3}-${x + 3}`).firstElementChild.className)){
                document.getElementById(`${y}-${x}`).style.border = '4px solid';
                document.getElementById(`${y + 1}-${x + 1}`).style.border = '4px solid';
                document.getElementById(`${y + 2}-${x + 2}`).style.border = '4px solid';
                document.getElementById(`${y + 3}-${x + 3}`).style.border = '4px solid';
                return true;

            }
        }
    }
}

function diagonalCheck2(){
    for (let x = 0; x < 4; x++){
        for (let y = 5; y > 2; y--){
            if(colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y - 1}-${x + 1}`).firstElementChild.className,
            document.getElementById(`${y - 2}-${x + 2}`).firstElementChild.className, document.getElementById(`${y - 3}-${x + 3}`).firstElementChild.className)){
                document.getElementById(`${y}-${x}`).style.border = '4px solid';
                document.getElementById(`${y - 1}-${x + 1}`).style.border = '4px solid';
                document.getElementById(`${y - 2}-${x + 2}`).style.border = '4px solid';
                document.getElementById(`${y - 3}-${x + 3}`).style.border = '4px solid';
                return true;

            }
        }
    }
}

function checkForTie(){
    let arr = [];
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            if(document.getElementById(`${y}-${x}`).style.backgroundColor !== 'white'){
                arr.push(document.getElementById(`${y}-${x}`));
            }
        }
    }
    if (arr.length === 42){
        return true;
    }
}



// //Reset Button++++++++++++++++++++
document.querySelector('.reset').addEventListener('click',() => location.reload());