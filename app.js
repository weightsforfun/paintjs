const canvas = document.getElementById("jsCanvas");
const  ctx= canvas.getContext("2d");
const colors =document.getElementsByClassName("jsColor")
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveButton=document.getElementById("jsSave");
canvas.height=document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.width=document.getElementsByClassName("canvas")[0].offsetHeight;
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height); 
ctx.strokeStyle="#2c2c2c";
ctx.fillStyle="#2c2c2c";
ctx.lineWidth=2.5;
let painting= false;
let filling =false;
function onMouseMove(event){
    const x= event.offsetX;
    const y= event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
function startPainting(event){
    painting = true;
}
function stopPainting(){
    painting =false;
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting); 
    canvas.addEventListener("mouseup",stopPainting); 
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handlCanvasClick);
    canvas.addEventListener("contextmenu",handleContextmenu);
}
function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color; 
    ctx.fillStyle=color

}
function handleRangeChange(event){
    ctx.lineWidth=event.target.value;
}
function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }
    else{
        filling=true;
        mode.innerText="Paint";
        
    }
}
function handlCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    } 
}
function handleContextmenu(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image=canvas.toDataURL("image/jpeg");
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS";
    link.click();   
}
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(saveButton){
    saveButton.addEventListener("click",handleSaveClick);
}
