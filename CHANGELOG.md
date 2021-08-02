## Wyliodrin STUDIO 2.4.0
 * **added** new dialogs for connecting to MicroPython
 * **added** GitLab downloader
 * **added** MicroPython flasher with support for ESP8266/32 and Micro:bit V1/2
 * **added** support for some functions of WebSerial API to the SerialPort plugin

## Wyliodrin STUDIO 2.3.2
  * **fixed** default project not found
  * **fixed** project error messages
  * **fixed** Raspberry Pi Simulator LCD example
  * **deleted** deprecated dashboard widgets

## Wyliodrin STUDIO 2.3.1
  * **fixed** emulator download
  * **fixed** Windows installer

## Wyliodrin STUDIO 2.3.0
  * **added** serialport plugin, works in electron and Chrome browser
  * **added** update plugin, handles updates in electron and browser
  * **added** to docs Adafruit CLUE board setup
  * **added** tutorials plugin
  * **added** application deployment documentation
  * **added** patreon link
  * **fixed** schematics and enbled it for browser
  * **fixed** display micropython options after port selection in browser
  * **fixed** schematics image layout
  * **fixed** notebook images display
  * **fixed** language logo images
  * **fixed** notebook fail to sav when moving elements around
  * **fixed** project download for electron version
  * **updated** documentation structure, each board has a folder
## Wyliodrin STUDIO 2.2.1-beta
  * **new** Raspberry Pi images (with docker)
  * **improved** docker deployment 

## Wyliodrin STUDIO 2.2.0-beta
  * **added** Wyliodrin STUDIO CI tests for build, documentation and format
  * **added** support for MicroPython(run, REPL and file manager)
  * **added** deploy (docker) application feature for wyapp devices (Raspberry Pi)
  * **added** console filters API (used by dashboard)
  * **new** plugin folder structure with plugins hierarchy
  * **new** plugin for id, migrated from wyapp-websocket
  * **new** dashboard layout
  * **fixed** console bounce when clicking outside
  * **fixed** monaco editor and dashboard disappearance when not active and window is resided 
  * **update** packages
  * **disabled** Rapid IoT device and simulator 

## Wyliodrin STUDIO 2.1.4-beta
  * **fixed** delay block for libwyliodrin having the same name as in Raspberry Pi
  * **update** editor registering to use extension or regular expressions

## Wyliodrin STUDIO 2.1.3-beta
  * **added** resizable project tree
  * **fixed** display IP address for local web server
  * **fixed** welcome screen appearing every time
  * **fixed** loading issue that sometimes prevents studio to access the filesystem
  * **fixed** visual programming gpiozero and wyliozero blocks for buttons and light (deleted extra tab)
  * **fixed** visual programming gpiozero and wyliozero empty function declaration
  * **update** browser loading speedup by asynchronous plugin loading
  * **update** monaco editor version to 0.19

## Wyliodrin STUDIO 2.1.2-beta
  * **added** electron auto-update version (windows only)
  * **fixed** social email blocks
  
## Wyliodrin STUDIO 2.1.1-beta
  * **added** Adafruit LCD visual programming blocks
  * **added** folder template for opcua model
  * **added** Raspberry Pi 1 and Zero emulator (QEMU)
  * **added** Raspberry Pi Simulator (NodeJS only)
  * **added** npm package for the web version (wstudio-web)
  * **fixed** device buttons not showing up for websocket (requires studio-supervisor update)
  * **fixed** multiple instance popup appearing multiple times
  * **fixed** gutter background color in electron
  * **fixed** image error from RPK simulator
  * **fixed** display of extra brace at device os version
  * **fixed** monaco editor workers build in the plugin folder
  * **fixed** project tree display
  * **fixed** MIMEMultipart import for social email block
  * **fixed** use only lowercase session id (issue #3)
  * **fixed** websocket server link for electron (use https://beta.wyliodrin.server/socket/remote)
  * **update** electron to version 7
  * **update** serialport to version 8
  * **update** new color for opcua model folder

## Wyliodrin STUDIO 2.0.10-beta

  * **added** social (email, facebook twitter and twilio) visual programming blocks
  * **added** Adafruit DHT sensor visual programming blocks for Raspberry Pi and BeagleBone Black
  * **added** delay block to visual programming blocks
  * **feature** Wyapp PackageManager search with any case
  * **fixed** Wyapp FileManager displaying double names
  * **fixed** (partially) scroll bug in Firefox (temporary fix)

## Wyliodrin STUDIO 2.0.9-beta

*First Release*
