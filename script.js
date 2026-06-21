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
   EVENT-DRIVEN SAFETY KERNEL
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

let sensorFault=
(voltage<0 || voltage>5 || isNaN(voltage));

if(sensorFault)
{
state="SENSOR FAULT";
lcd="SENSOR ANOMALY DETECTED";
buzzerState=true;

if(now-lastRelayChange>relayLockTime)
{
relayState=false;
lastRelayChange=now;
}
}
else if(voltage<3.0)
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
/* ==========================
   INTELLIGENT EMBEDDED HMI
========================== */

let currentScreen = 0;

const screens = [
"BATTERY DATA",
"ANALYTICS",
"PROTECTION",
"DIAGNOSTICS"
];

function updateHMI()
{
let screen = screens[currentScreen];

let line1 = "";
let line2 = "";

if(screen === "BATTERY DATA")
{
line1 = "Live Battery Data";
line2 = document.getElementById("avg").innerText;
}
else if(screen === "ANALYTICS")
{
line1 = "Battery Analytics";
line2 = document.getElementById("imb").innerText;
}
else if(screen === "PROTECTION")
{
line1 = "Relay Status";
line2 = document.getElementById("relayStatus").innerText;
}
else
{
line1 = "Diagnostics";
line2 = document.getElementById("kernelState").innerText;
}

if(document.getElementById("kernelState").innerText !== "NORMAL")
{
screen = "FAULT OVERRIDE";

line1 = "CRITICAL FAULT";

line2 =
document.getElementById("kernelState").innerText;

document.getElementById("faultPriority")
.innerHTML = "ACTIVE";
}
else
{
document.getElementById("faultPriority")
.innerHTML = "NONE";
}

document.getElementById("screenName")
.innerHTML = screen;

document.getElementById("lcdLine1")
.innerHTML = line1;

document.getElementById("lcdLine2")
.innerHTML = line2;

currentScreen =
(currentScreen + 1) % screens.length;
}

updateHMI();

setInterval(updateHMI,3000);
/* ==========================
   FAULT-TOLERANT RUNTIME SYSTEM
========================== */

let runtimeFaultCount = 0;

let faultHistory = [];

let previousADC = null;

function logFault(fault)
{
let timestamp =
new Date().toLocaleTimeString();

faultHistory.unshift(
timestamp + " - " + fault
);

if(faultHistory.length > 5)
{
faultHistory.pop();
}

document.getElementById("faultLog")
.innerHTML =
faultHistory.join("<br>");
}

function updateRuntimeSystem()
{
let runtimeMode = "NORMAL";

let sensorStatus = "CONNECTED";

let adcStatus = "HEALTHY";

let relayCheck = "MATCHED";

let latestFault = "NONE";

let adcReading =
Math.floor(Math.random()*1024);

let randomFault =
Math.floor(Math.random()*100);

if(randomFault < 5)
{
sensorStatus = "DISCONNECTED";

runtimeMode = "DEGRADED";

latestFault =
"SENSOR DISCONNECTION";

runtimeFaultCount++;

logFault(latestFault);
}
else if(randomFault < 10)
{
adcStatus = "INVALID";

runtimeMode = "DEGRADED";

latestFault =
"INVALID ADC VALUE";

runtimeFaultCount++;

logFault(latestFault);
}
else if(randomFault < 15)
{
relayCheck = "MISMATCH";

runtimeMode = "FAILSAFE";

latestFault =
"RELAY MISMATCH";

runtimeFaultCount++;

logFault(latestFault);
}
else if(
previousADC !== null &&
adcReading === previousADC
)
{
adcStatus = "FROZEN";

runtimeMode = "FAILSAFE";

latestFault =
"ADC FROZEN";

runtimeFaultCount++;

logFault(latestFault);
}

if(runtimeFaultCount > 10)
{
runtimeMode = "SHUTDOWN";
}

document.getElementById("runtimeMode")
.innerHTML = runtimeMode;

document.getElementById("sensorStatus")
.innerHTML = sensorStatus;

document.getElementById("adcStatus")
.innerHTML = adcStatus;

document.getElementById("relayCheck")
.innerHTML = relayCheck;

document.getElementById("faultCount")
.innerHTML = runtimeFaultCount;

document.getElementById("latestFault")
.innerHTML = latestFault;

previousADC = adcReading;
}

updateRuntimeSystem();

setInterval(updateRuntimeSystem,4000);
