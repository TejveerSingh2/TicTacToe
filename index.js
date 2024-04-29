
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newBtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let btnclicks=0;
let turn0=true;
const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const resetGame=()=>{
    let turn0=true;
    enableBtns();
    msgcontainer.classList.add('hide');
    btnclicks=0;
}

const enableBtns=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText='';
    }
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);


boxes.forEach((box)=> {
    box.addEventListener("click",()=>{
        if(turn0){
            turn0=false;
            box.innerText='0'; 
            box.classList.add('color1');
            box.classList.remove('color2');    
        }
        else{
            turn0=true;
            box.innerText='X';
            box.classList.remove('color1');
            box.classList.add('color2');    
        }
        box.disabled=true;
        btnclicks++;

        let winner=checkWinner();
        if(btnclicks==9 && !winner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game was a Draw`;
    msgcontainer.classList.remove("hide");
    disableBtns();
}

const checkWinner=()=>{
    for(let pattern of winPatterns ){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!='' && pos2Val!='' && pos3Val!=''){
            if(pos1Val==pos2Val && pos1Val==pos3Val){
                // console.log("winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

const showWinner=(winner)=>{
    msg.innerText=`Congratulations! , Winner is ${winner}`;
    msgcontainer.classList.remove('hide');
    disableBtns();
};

const disableBtns=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
