# Battery Intelligence & Event-Driven Safety Protection Suite

## Overview

This project combines two automotive battery management modules:

1. Adaptive Multi-Cell Battery Intelligence Engine
2. Event-Driven Safety Protection Kernel

Together, these modules simulate the core monitoring and safety functions commonly used in Battery Management Systems (BMS) for electric vehicles, energy storage systems, and embedded battery-powered applications.

---

# Module 1: Adaptive Multi-Cell Battery Intelligence Engine

## Objective

Monitor a simulated 4-cell lithium-ion battery pack in real time and generate battery health insights.

## Features

- Real-time cell voltage monitoring
- Pack average voltage calculation
- Cell imbalance detection
- Strongest cell identification
- Weakest cell identification
- Battery health classification
- Continuous dashboard updates

## Parameters Monitored

- Cell 1 Voltage
- Cell 2 Voltage
- Cell 3 Voltage
- Cell 4 Voltage
- Average Pack Voltage
- Imbalance Percentage
- Strongest Cell
- Weakest Cell
- Health Status

## Battery Health Classification

| Imbalance % | Status |
|------------|----------|
| < 2% | Healthy |
| 2% – 5% | Minor Imbalance |
| 5% – 10% | Critical Imbalance |
| > 10% | Pack Failure |

## Formulae

### Average Voltage

Vavg = (V1 + V2 + V3 + V4) / 4

### Imbalance Percentage

Imbalance % = ((Vmax − Vmin) / Vavg) × 100

---

# Module 2: Event-Driven Safety Protection Kernel

## Objective

Implement an automotive-grade safety controller using a fully non-blocking event-driven architecture.

## Features

- Weak cell voltage detection
- Over-voltage detection
- Rapid voltage fluctuation detection
- Event-driven state machine
- Relay cutoff protection
- Buzzer alert system
- LCD warning messages
- Anti-relay chatter protection
- Recovery logic
- Stable state management

## Safety States

### NORMAL

System operating normally.

### LOW VOLTAGE

Triggered when voltage falls below safety threshold.

### OVER VOLTAGE

Triggered when voltage exceeds safe operating limit.

### RAPID FLUCTUATION

Triggered when sudden voltage variations are detected.

### SENSOR FAULT

Triggered when abnormal sensor behavior is detected.

---

# Event-Driven Architecture

Sensor Input
↓
Fault Detection Engine
↓
State Machine Controller
↓
Relay Control
↓
Buzzer Alerts
↓
LCD Warning Messages

---

# Anti-Relay Chatter Protection

The relay state is protected using lockout timing logic to prevent rapid switching caused by unstable sensor readings.

Benefits:

- Increased relay life
- Stable system operation
- Reduced electrical stress

---

# Recovery Logic

The system automatically restores normal operation when fault conditions disappear and remain stable for the recovery period.

Recovery Actions:

- Relay re-enabled
- Buzzer disabled
- LCD returns to NORMAL state
- System state reset

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Embedded Systems Concepts
- Event-Driven Programming
- State Machine Design
- GitHub Pages

---

# Dashboard Features

The live dashboard displays:

### Battery Intelligence Engine

- Cell Voltages
- Average Voltage
- Imbalance Percentage
- Strongest Cell
- Weakest Cell
- Health Status

### Safety Protection Kernel

- System Voltage
- Relay Status
- Buzzer Status
- Current State
- LCD Warning Message
- Relay Protection Status

# Module 3: Intelligent Embedded HMI & Diagnostic Interface

## Features

- Automatic LCD screen rotation
- Live battery diagnostics
- Battery analytics display
- Protection status monitoring
- Fault diagnostic visualization
- Optimized refresh handling
- Fault-priority screen override
- Embedded HMI simulation

## HMI Screens

### Battery Data
Displays live battery metrics.

### Analytics
Displays imbalance and health analytics.

### Protection
Displays relay and protection status.

### Diagnostics
Displays fault information and system state.

### Fault Override Mode

When a critical fault occurs, the HMI automatically overrides normal screen rotation and displays fault information with highest priority.

# Module 4: Fault-Tolerant Embedded Runtime System

## Objective

Develop a fault-tolerant runtime subsystem capable of detecting hardware and software failures while maintaining stable operation of healthy modules.

## Features

- Sensor disconnection detection
- Invalid ADC value detection
- Frozen ADC detection
- Relay mismatch detection
- Autonomous fault isolation
- Runtime mode management
- Structured fault logging
- Recovery-oriented architecture

## Runtime Modes

### NORMAL
System operating normally.

### DEGRADED
Non-critical fault detected.
Healthy modules continue running.

### FAILSAFE
Critical fault detected.
Protective actions activated.

### SHUTDOWN
Repeated critical faults detected.
System enters safe shutdown state.

## Fault Logging

The system maintains timestamped fault logs and tracks fault history for diagnostic analysis.

## Fault Types

- Sensor Disconnection
- Invalid ADC Reading
- Frozen ADC Condition
- Relay Mismatch

## Recovery Strategy

Faulty subsystems are isolated while healthy subsystems continue operating independently.
---

---

# Author

Aditya Binoy
