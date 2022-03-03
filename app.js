const canvas=document.getElementById("js-canvas");
const colors=document.getElementById("js-colors");
const range=document.getElementById("js-range");
const input=range.getElementsByTagName("input");
const mode=document.getElementById("js-mode");
const saveBtn=document.getElementById("js-save");

const CANVAS_SIZE=500;
const DEFAULT_COLOR="rgb(24, 21, 21)";
const ctx=canvas.getContext('2d');


canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.strokeStyle=DEFAULT_COLOR;
ctx.fillStyle="white";
ctx.fillRect(0,0,500,500)
ctx.lineWidth=2.5;

let painting=false;
let clickMode=false;

function PourAll(event){
    if(clickMode==true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handlePour(event){
    if(clickMode==false){
        clickMode=true;
        mode.innerText="Draw";
        
    }else{
        clickMode=false;
        mode.innerText="Pour"
    }

}


if(mode){
    mode.addEventListener("click",handlePour);
}



function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
        
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();

    }
}

function startPainting(event){
    painting=true;
}
function stopPainting(event){
    painting=false;
}

function colorPicker(event){
    const clickedBtn=event.target;
    const pickedColor=clickedBtn.style.backgroundColor;
    ctx.strokeStyle=pickedColor;
    ctx.fillStyle=pickedColor;
}

function resizeStroke(event){
    const curLineWidth=event.target.value;
    ctx.lineWidth=curLineWidth;
}

function handleCtxmMenu(event){
    event.preventDefault();
}

function saveImg(){
    const imgUrl=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=imgUrl;
    link.download="Paint[🎨]"
    link.click();
}
if(saveBtn){
    saveBtn.addEventListener("click",saveImg)
}
if(canvas){ 
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",PourAll);
    canvas.addEventListener("contextmenu",handleCtxmMenu)
}

if(colors){
    colors.addEventListener("click",colorPicker);
}



if(range){
    // range.addEventListener("mouseleave",resizeStroke); 내가 쓴 코드 
    range.addEventListener("input",resizeStroke)
}

 // Nico 가 쓴 코드_일단 html의 모든 color들에 class명(js-color) 추가함 
    /* 
    const colors=document.getElementById("js-color"); 
    Array.from(colors).forEach(color=> color.addEventListener(clicked,colorPicker)); <- colors를 배열로 만들어줌.  
    배열.forEach() 주어진 함수를 배열요소 각각에 대해 실행 (배열요소 각각에 addEventListener한 것, 뒤에 실행되는 함수 colorPicker은 내가 만든 것과 동일)
    여기세어 color은 potato가 되도 된다. 그저 배열에 담긴 요소 하나하나를 말하는 것일뿐!
    
    */