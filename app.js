const canvas = document.getElementById("jsCanvas"),
    ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.querySelector("#jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave")

canvas.width = 700;
canvas.height = 700;

let painting = "false";
let filling = "false";

ctx.strokeStyle= "#2c2c2c";
ctx.fillStyle= "#2c2c2c";
ctx.lineWidth = "2.5";


function mousemove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting==="false"){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function startPainting(){
    painting = "true";

}
function stopPainting(){
    painting = "false";

}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle=color;
}

function changeLine(event){
    const lineWidth = event.target.value;
    ctx.lineWidth = lineWidth;
}

function handleMode(event){
    if(filling==="true"){
        filling= "false";
        mode.innerHTML = "Fill";
    }else{
        painting="false";
        filling = "true";
        mode.innerHTML = "Paint";
    }
    
}

function handleBg(){
    if(filling==="true"){
        ctx.fillRect(0,0,700,700);
    }
}

function handleSave(){
    const image = canvas.toDataURL("image/png");
    const a =document.createElement("a");
    a.href=image;
    a.download="PaintingJS";
    a.click();
}

function init(){
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    
    Array.from(colors).forEach(a => a.addEventListener("click",changeColor));
    range.addEventListener("mouseup",changeLine);
    if(mode){
        mode.addEventListener("click",handleMode);
    }
    canvas.addEventListener("click", handleBg);
    if(save){
        save.addEventListener("click",handleSave);
    }
}
    
init();