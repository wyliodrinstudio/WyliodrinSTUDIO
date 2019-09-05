:orphan:

Getting Started
*****************



In order for you to can start prototyping IoT applications or move to the next level by using our professional solution to develop and deploy Internet of Things systems, we offer you 3 different techniques to **install the Wyliodrin Studio IDE**.

|

Download the application
""""""""""""""""""""""""""

For **Windows** users:

https://wyliodrin.studio/

|

For **Linux** users:

https://wyliodrin.studio/

|

For **Mac OS** users:

https://wyliodrin.studio/

|

Use the web version
""""""""""""""""""""""

YYou also have the possibility to run and use a browser version of Wyliodrin Studio, by copying the following link into your browser address bar:

**beta.wyliodrin.studio**

|

Build from source
""""""""""""""""""""

If you wish to contribute to the improvement of the application or if you want to add your own features or plugins, our code is *open source*, which means that you cand find it on our Github.

To download the source code, you must have a GitHub account. Open a terminal and choose the folder where you’d want to clone our repository. In this case, we’ll use the home directory and run:

.. code-block:: bash

	git clone https://github.com/alexandruradovici/WyliodrinSTUDIO2/tree/plugin-works

|

There are 2 procedures to build the Wyliodrin Studio application:

For the **STANDALONE** version, you will have to run the following commands: 

::

	npm install
	npx electron-rebuild
	npx webpack

For the **BROWSER** edition, you will use: 

::

	npx webpack --config=webpack.browser.config.js

|

Once the application was installed and built, you can make changes, correct or customize our source code, in order to improve it.

|