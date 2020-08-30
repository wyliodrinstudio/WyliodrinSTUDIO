# Wyliodrin STUDIO

Wyliodrin STUDIO is an educational platform for IoT and Embedded Linux systems.

- Connect to devices using TCP/IP or serial port
- Develop software and firmware for IoT in several programming languages
- Shell access to the device
- Import and export Wyliodrin STUDIO projects
- Visual dashboard for displaying sensor data
- Display the hardware schematics
- Manage packages for Python and Javascript
- Task manager for managing the device
- Network connection manager for the device (Ethernet and WiFi)
- Interactive electronics documentation (resistor color code)
- Example projects and firmware

## Supported devices:

- Raspberry Pi and Arduino
- Pico PI iMX8M
- NXP Rapid IoT
- UDOO Neo
- BeagleBone Black

## Supported languages

- Visual Programming (translates to Python)
- Javascript
- Python
- Shell Script (bash)

## Install

### Windows

If there are any errors, run

```cmd
npm install --global --production windows-build-tools
```

For bluetooth
WinUSB driver with Zadig tool

### macOS

Install Xcode

## Build

This section is used for when you want to build application from the source code.

### Dependencies

- [NodeJS](http://www.nodejs.org) version 10 or higher.

### Build Instructions

The application itself can run in 2 modes.

#### Electron

Electron is the preffered way of running the application. The resulting tool starts as a standalone application.

```
npm install
npx electron-rebuild
npm run electron
```

To start the application you can issue:

```
npm start
```

#### Web

Another way of running the application is leveragin your internet browser, [Firefox](https://www.mozilla.org/en-US/firefox/new/) is recommended. Following lines will build all the needed artifacts:

```
npm install
npm run browser
```

Then to run the application enter the `build` folder and run

```
npm install
npm start
```

## Contribute

We would love your help. Click [here](CONTRIBUTING.md) to find out how to contribute.

## Authors

Wyliodrin STUDIO is a product of [Wyliodrin](https://wyliodrin.studio) in partnership with the [Politehnica University of Bucharest](https://www.upb.ro)

- [Alexandru Radovici](https://www.github.com/alexandruradovici) - Maintainer
- [Ovidiu Stoica](https://www.github.com/oviska) - UX / UI
- [Ioana Culic](https://www.github.com/ioanaculic) - Development Manager
- [Marius Aluculesei](https://www.github.com/mariusAlc) - Projects, Application
- [Liviu-Nicolae Moraru](https://github.com/skyplane23) - Embedded Software
- [Cosmin Daniel Radu](https://github.com/cosmindanielradu19) - Embedded Software
- [Calin Dumitru](https://github.com/Dumitru98) - Simulators
- [Diana Ghindaoanu](https://github.com/diana-ghindaoanu) - Notebook, Dashboard, Documentation
- [Teona Severin](https://github.com/teonaseverin) - Web File Systems, Hooks, Statistics

Contributions

- [Ana Marinescu](https://www.github.com/paula-elena) - Pin Layout
- [Andrei Deatcu](https://www.github.com/dosarudaniel) - Resistor Color Code, Schematics
- [Alexandru Vochescu](https://www.github.com/valexandru) - Examples
- [Luis Miguel Capacho Valbuena](https://github.com/lmcapacho) - Translations, WyApp Serial

Wyliodrin is a trademark of Wyliodrin SRL. All rights reserved.

## License

Apache 2.0
