const gameinfo=document.querySelector('.game-info');
const boxes=document.querySelectorAll('.box');
const newgamebtn=document.querySelector('.btn');

let currentplayer;
let gamegrid;

const winningposition=[
    [0,1,2],[3,4,5],
    [6,7,8],[0,3,6],
    [1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

function initgame(){
    currentplayer='x';
    //we are doing empty on gamegrid but we also have to make our ui empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        //initialize box properties with css again
        box.classList=`box box${index+1}`;
    })
    gamegrid=["","","","","","","","",""];
    newgamebtn.classList.remove("active");
    gameinfo.innerHTML=`current player- ${currentplayer}`;
}

initgame();

function swapturn(){
    if(currentplayer==='x'){
        currentplayer='0';
    }
    else{
        currentplayer='x';
    }
    gameinfo.innerText=`current player- ${currentplayer}`
}

function checkgameover(){
let ans="";
winningposition.forEach((position)=>{
    //all 3 boxes should be non empty and have same value
    if((gamegrid[position[0]]!==""||gamegrid[position[1]]!==""||gamegrid[position[2]]!=="")
    && (gamegrid[position[0]]===gamegrid[position[1]])&& (gamegrid[position[1]]===gamegrid[position[2]])){
            if(gamegrid[position[0]]==="x"){
                ans="x";
            }
            else{
                ans="0";
            }
            //if any of them has win then we have to stop so dissable pointerevent
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

    
    //now we know ki after this either x or 0 be the winner
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
        }

});

if(ans!==""){
    gameinfo.innerText=`winner player- ${ans}`;
    newgamebtn.classList.add("active");
    // return;
}

//let check weather there is a tie
let fillcount=0;
gamegrid.forEach((box)=>{
if(box!=="")
fillcount++;
})
if(fillcount==9){
    gameinfo.innerText="match tied";
    newgamebtn.classList.add("active");
}
}

function handleclick(index){
if(gamegrid[index]===""){
    boxes[index].innerText=currentplayer;
    gamegrid[index]=currentplayer;
    // boxes[index].style.pointerEvents="none";
    //now swap the turn of the player
    swapturn();
    //now check weather is anyone won
    checkgameover();
}
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
})

newgamebtn.addEventListener("click",initgame);
