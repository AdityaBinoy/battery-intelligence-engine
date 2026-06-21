function updateBattery() {

let cells = [];

for(let i=0;i<4;i++){
cells.push((3.8 + Math.random()*0.4));
}

document.getElementById("c1").innerHTML =
cells[0].toFixed(2)+" V";

document.getElementById("c2").innerHTML =
cells[1].toFixed(2)+" V";

document.getElementById("c3").innerHTML =
cells[2].toFixed(2)+" V";

document.getElementById("c4").innerHTML =
cells[3].toFixed(2)+" V";

let avg =
cells.reduce((a,b)=>a+b,0)/4;

let max =
Math.max(...cells);

let min =
Math.min(...cells);

let imbalance =
((max-min)/avg)*100;

let strongest =
cells.indexOf(max)+1;

let weakest =
cells.indexOf(min)+1;

let status;
let css;

if(imbalance < 2){
status="Healthy";
css="healthy";
}
else if(imbalance < 5){
status="Minor Imbalance";
css="minor";
}
else if(imbalance < 10){
status="Critical Imbalance";
css="critical";
}
else{
status="Pack Failure";
css="failure";
}

document.getElementById("avg").innerHTML =
avg.toFixed(2)+" V";

document.getElementById("imb").innerHTML =
imbalance.toFixed(2)+" %";

document.getElementById("strong").innerHTML =
"Cell "+strongest;

document.getElementById("weak").innerHTML =
"Cell "+weakest;

document.getElementById("status").innerHTML =
`<span class="${css}">${status}</span>`;
}

updateBattery();

setInterval(updateBattery,1000);
