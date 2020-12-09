TockOS
***************

This will show how to set up the TockOS development enviroment. 

|

Development Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You will have to install:
	* `VirtualBox <https://www.virtualbox.org/>` - virtualization tool for x86 and x86-64 hardware
		- `Extension Pack <https://download.virtualbox.org/virtualbox/6.1.12/Oracle_VM_VirtualBox_Extension_Pack-6.1.12.vbox-extpack>` - you will be able to see you USB devices in guest virtual machine
	* `Visual Studio Code <https://code.visualstudio.com/>` - a powerfull source code editor
	* `TockOS VM <TODO>` - a Linux environment with the WyliodrinSupervisor for local development
		- Windows: Make sure you select Allow when you get a question from the Firewall

`VirtualBox <https://www.virtualbox.org/>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	1. Install the `VirtualBox <https://www.virtualbox.org/>` on your computer
	2. Install the `Extension Pack <https://download.virtualbox.org/virtualbox/6.1.12/Oracle_VM_VirtualBox_Extension_Pack-6.1.12.vbox-extpack>` for VirtualBox
	3. Import Appliance `TockOS VM <TODO>`

`Visual Studio Code <https://code.visualstudio.com/>`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	1. Install `Visual Studio Code <https://code.visualstudio.com/>` on your computer
	
Kernel
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	* Create a Kernel project
	1. Start the `TockOS VM <TODO>` in the VirtualBOX
	2. Open WyliodrinStudio App
	3. Click on 'Projects Library'
	4. Click on 'CREATE NEW APPLICATION'
	5. Give your project a name, for example 'MyKernel'
	6. Select 'TockOS Kernel'
	7. Click 'CREATE PROJECT'
	8. Select the Tock Release you want to use
	9. Select the Board you want to use
	10. Click 'SELECT'
	11. Wait for the app to download the kernel files
	12. Click on you project from 'Projects Library'
	13. (OPTIONAL) If you want to see all kernel files click on 'Menu' and select 'Use Advanced Mode'
	
	*Flash Kernel on the board
		1. Connect to StudioSupervisor
			- Locally (works only with WyliodrinStudio app)
				1. Make sure that the `TockOS VM <TODO>` is running
				2. Go to WyliodrinStudio app
				3. Click on 'CONNECT'
				4. Click on 'IP Address'
				5. You will need to complete the 'Network Connection' informations as following:
					- IP: localhost
					- Port: 2000
					- Username: tock
					- Password: tock
				6. Click on 'CONNECT'
				7. Connect your device to the computer
				8. Go to VirtualBOX
				9. Right click on the USB Icon (bottom right corner of VirtualBOX)
				10. Select your device from the list
				11. Go to WyliodrinStudio app
				12. Click on 'RUN'
			- Over the internet (works with both WyliodrinStudio versions browser/app)
				1. Make sure that the `TockOS VM <TODO>` is running
				2. Go to WyliodrinStudio app
				3. Click on 'CONNECT'
				4. Click on 'Add Web Device'
				5. Select from 'Device' list 'Tock VM'
				6. Give your device a name, for example 'TockOS'
				7. Copy the JSON
				8. Open you browser and go to http://localhost:2080/
				9. Paste the JSON in the text area and click 'Send JSON'
				10. If the JSON was uploaded successfully you will see a sugestive message
				11. Go to WyliodrinStudio Browser/App
				12. Click on 'CONNECT'
				13. Click on your device
				14. Go to VirtualBOX
				15. Right click on the USB Icon (bottom right corner of VirtualBOX)
				16. Select your device from the list
				17. Go to WyliodrinStudio app
				18. Click on 'RUN'
				
