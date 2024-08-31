Plastikit Project
=================

Overview
--------
Plastikit is an innovative project designed to transform recycled plastic bottles into functional 3D printed products. The project combines both hardware and software components to create a comprehensive recycling and 3D printing system, particularly focused on educational outreach and environmental sustainability.

Installation Instructions
--------------------------

Prerequisites
-------------
Before you begin, ensure you have the following:

- Hardware Components:
  - ESP32 Microcontroller
  - HX711 Load Cell
  - 1602 LCD Display with I2C
  - W1209 Temperature Controller
  - 24V DC Gear Motor
  - V6 Volcano Hot End
  - MOSFETs for controlling heating elements and motors
  - Power Supply (24V)

- Software Requirements:
  - Arduino IDE or PlatformIO for programming the ESP32
  - Next.js for the web-based dashboard
  - Node.js and npm for backend services
  - Vercel for deployment of the web interface
  - Git for version control

Step-by-Step Installation
--------------------------
1. Hardware Setup:
   - Assemble the Plastikit machine according to the hardware architecture diagram.
   - Connect the ESP32 microcontroller to the sensors, LCD, and other components.
   - Ensure the MOSFETs are properly connected to control the heating elements and motors.
   - Power the system using a 24V power supply.

2. Software Setup:
   - Clone the repositories from the provided GitHub link: https://github.com/weizmanroy/PlasikitFinal.git.
   - Navigate to the `web-dashboard` directory and install dependencies:
     ```
     cd web-dashboard
     npm install
     ```
   - Deploy the dashboard on Vercel using the following command:
     ```
     vercel --prod
     ```
   - Program the ESP32 microcontroller using Arduino IDE or PlatformIO:
     - Open the ESP32 project in your IDE.
     - Upload the code to the ESP32 via USB connection.

3. Starting the System:
   - Power on the Plastikit machine.
   - Access the web dashboard via the URL [https://www.plastikit.online].



Usage Instructions
------------------
User Roles
----------
- Administrator:
 - Full access to all system features and settings.
 - Manage users, assign roles, and oversee system performance.
 - Handle data management and system maintenance.

- Teacher:

 - Manage student groups and monitor their activities.
 - Oversee recycling competitions and 3D printing requests.
 - Access and integrate educational content into the curriculum.

- Student:

 - Participate in recycling activities and earn points.
 - Request 3D printed items and access educational content.
 - Track personal progress and earning points.


Operating the Plastikit Machine
-------------------------------
1. Recycling Process:
   - Place a plastic bottle into the machine.
   - Press the "Start Process" button to begin cutting and melting the plastic.
   - Manually control the machine to shred, melt, and extrude the plastic into filament.

2. 3D Printing:
   - Choose a 3D model from the dashboard.
   - Load the filament produced by the machine into the 3D printer.
   - Start the printing process and monitor the progress via the dashboard.

3. Monitoring and Maintenance:
   - Use the LCD display and dashboard to monitor the machine’s status, including temperature and filament weight.
   - Perform regular maintenance checks on the hardware components to ensure optimal performance.


Contributions
-------------
- Authors: Koren Halevie, Roy Weizman
- Supervisor: Dr. Michal Chalamish
