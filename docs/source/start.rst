:orphan:

Getting Started
*****************



In order for you to can start prototyping IoT applications or move to the next level by using our professional solution to develop and deploy Internet of Things systems, we offer you 3 different techniques to **install the Wyliodrin Studio IDE**.

|

Download the application
""""""""""""""""""""""""""

For **Windows** users:

`Wyliodrin STUDIO beta_Windows 64 bit <https://wyliodrin-studio.s3.us-east-2.amazonaws.com/Wyliodrin+STUDIO+Setup+2.0.6-beta.exe>`_

|

For **Linux** users:

`Wyliodrin STUDIO beta_Linux 64 bit <https://wyliodrin-studio.s3.us-east-2.amazonaws.com/Wyliodrin+STUDIO+2.0.6-beta.AppImage>`_

|

For **Mac OS** users:

`Wyliodrin STUDIO beta_macOS <https://wyliodrin-studio.s3.us-east-2.amazonaws.com/Wyliodrin+STUDIO-2.0.6-beta.dmg>`_

|

Use the web version
""""""""""""""""""""""

You also have the possibility to run and use a browser version of Wyliodrin Studio, by copying the following link into your browser address bar:

**beta.wyliodrin.studio**

|

Build from source
""""""""""""""""""""

If you wish to contribute to the improvement of the application or if you want to add your own features or plugins, our code is *open source*, which means you can clone it from our Github.

To download the source code, you must have a GitHub account. Open a terminal, choose the folder where you want to clone our repository and run the following command:

.. code-block:: bash

	git clone https://github.com/alexandruradovici/WyliodrinSTUDIO2/tree/plugin-works

|

There are 2 methods to build the application:

For the **STANDALONE** version, you will have to run the following commands: 

::

	npm install
	npx electron-rebuild
	npx webpack
	npm run electron

For the **BROWSER** edition, you will have to delete the *build* folder, run: 

::

	npx webpack --config=webpack.browser.config.js

Then change the current directory to the newly created *build* folder and run:

::

	npm install
	npm run browser

|

Once the application was installed and built, you can make changes on our source code, in order to improve it.

|