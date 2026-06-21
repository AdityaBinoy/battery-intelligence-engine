/* ==========================
   EVENT-DRIVEN SAFETY KERNEL
========================== */

let relayState = true;
let buzzerState = false;

let lastRelayChange = 0;
const relayLockTime = 5000;

let previousVoltage = 4.0;

function updateSafetyKernel()
{
let voltage = 2.8 + Math.random()*1.8;

let state = "NORMAL";
let lcd = "SYSTEM NORMAL";

const now = Date.now();

let fluctuation =
Math.abs(voltage - previousVoltage);

if(voltage < 3.0)
{
state = "LOW VOLTAGE";
lcd = "LOW CELL VOLTAGE";

if(now-lastRelayChange > relayLockTime)
{
relayState = false;
lastRelayChange = now;
}

buzzerState = true;
}
else if(voltage > 4.25)
{
state = "OVER VOLTAGE";
lcd = "OVER VOLTAGE";

if(now-lastRelayChange > relayLockTime)
{
relayState = false;
lastRelayChange = now;
}

buzzerState = true;
}
else if(fluctuation > 0.5)
{
state = "RAPID FLUCTUATION";
lcd = "RAPID VOLTAGE CHANGE";

if(now-lastRelayChange > relayLockTime)
{
relayState = false;
lastRelayChange = now;
}

buzzerState = true;
}
else
{
state = "NORMAL";
lcd = "SYSTEM NORMAL";
buzzerState = false;

if(now-lastRelayChange > relayLockTime)
{
relayState = true;
}
}

document.getElementById("sysVoltage").innerHTML =
voltage.toFixed(2)+" V";

document.getElementById("relayStatus").innerHTML =
relayState ? "ON" : "OFF";

document.getElementById("buzzerStatus").innerHTML =
buzzerState ? "ON" : "OFF";

document.getElementById("kernelState").innerHTML =
state;

document.getElementById("lcdMessage").innerHTML =
lcd;

document.getElementById("relayProtection").innerHTML =
(now-lastRelayChange < relayLockTime)
? "ACTIVE"
: "READY";

previousVoltage = voltage;
}

updateSafetyKernel();

setInterval(updateSafetyKernel,1000);
