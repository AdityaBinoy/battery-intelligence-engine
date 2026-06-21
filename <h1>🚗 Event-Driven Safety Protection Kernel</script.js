/* ==========================
   BATTERY INTELLIGENCE ENGINE
========================== */

function updateBattery()
{
let cells=[];

for(let i=0;i<4;i++)
{
cells.push(3.8 + Math.random()*0.4);
}

document.getElementById("c1").innerHTML=cells[0].toFixed(2)+" V";
document.getElementById("c2").innerHTML=cells[1].toFixed(2)+" V";
document.getElementById("c3").innerHTML=cells[2].toFixed(2)+" V";
document.getElementById("c4").innerHTML=cells[3].toFixed(2)+" V";

let avg=cells.reduce((a,b)=>a+b,0)/4;
let max=Math.max(...cells);
let min=Math.min(...cells);

let imbalance=((max-min)/avg)*100;

let strongest=cells.indexOf(max)+1;
let weakest=cells.indexOf(min)+1;

let status="";
let css="";

if(imbalance<2)
{
status="Healthy";
css="healthy";
}
else if(imbalance<5)
{
status="Minor Imbalance";
css="minor";
}
else if(imbalance<10)
{
status="Critical Imbalance";
css="critical";
}
else
{
status="Pack Failure";
css="failure";
}

document.getElementById("avg").innerHTML=avg.toFixed(2)+" V";
document.getElementById("imb").innerHTML=imbalance.toFixed(2)+" %";
document.getElementById("strong").innerHTML="Cell "+strongest;
document.getElementById("weak").innerHTML="Cell "+weakest;
document.getElementById("status").innerHTML=
`<span class="${css}">${status}</span>`;
}

/* ==========================
   SAFETY PROTECTION KERNEL
========================== */

let relayState=true;
let buzzerState=false;
let lastRelayChange=0;
const relayLockTime=5000;
let previousVoltage=4.0;

function updateSafetyKernel()
{
let voltage=2.8 + Math.random()*1.8;

let state="NORMAL";
let lcd="SYSTEM NORMAL";

const now=Date.now();

let fluctuation=Math.abs(voltage-previousVoltage);

if(voltage<3.0)
{
state="LOW VOLTAGE";
lcd="LOW CELL VOLTAGE";
buzzerState=true;

if(now-lastRelayChange>relayLockTime)
{
relayState=false;
lastRelayChange=now;
}
}
else if(voltage>4.25)
{
state="OVER VOLTAGE";
lcd="OVER VOLTAGE";
buzzerState=true;

if(now-lastRelayChange>relayLockTime)
{
relayState=false;
lastRelayChange=now;
}
}
else if(fluctuation>0.5)
{
state="RAPID FLUCTUATION";
lcd="RAPID VOLTAGE CHANGE";
buzzerState=true;

if(now-lastRelayChange>relayLockTime)
{
relayState=false;
lastRelayChange=now;
}
}
else
{
state="NORMAL";
lcd="SYSTEM NORMAL";
buzzerState=false;

if(now-lastRelayChange>relayLockTime)
{
relayState=true;
}
}

document.getElementById("sysVoltage").innerHTML=
voltage.toFixed(2)+" V";

document.getElementById("relayStatus").innerHTML=
relayState ? "ON" : "OFF";

document.getElementById("buzzerStatus").innerHTML=
buzzerState ? "ON" : "OFF";

document.getElementById("kernelState").innerHTML=
state;

document.getElementById("lcdMessage").innerHTML=
lcd;

document.getElementById("relayProtection").innerHTML=
(now-lastRelayChange<relayLockTime)
? "ACTIVE"
: "READY";

previousVoltage=voltage;
}

updateBattery();
updateSafetyKernel();

setInterval(updateBattery,1000);
setInterval(updateSafetyKernel,1000);
