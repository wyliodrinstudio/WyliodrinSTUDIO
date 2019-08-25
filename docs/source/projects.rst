:orphan:
Projects
========

|

1. _isPathValid(basePath, filePath)
""""""""""""""""""""""""""""""""""""""
Checks if **basePath** can be found in **filePath** and returns *null* otherwise. The function **path.normalize()** is used here to transform a relative path into the absolute path.


2. getLanguage(languageID)
""""""""""""""""""""""""""""
Returns a language object with the following properties: id, title, icons, addons and options.

3. registerLanguage(id, title, icon, options)
"""""""""""""""""""""""""""""""""""""""""""""""""
Updates the **“languages”** array with an object referring to a programming language. The accepted languages are: *javascript*, *python*, *bash* and *visual*. 

.. image:: images/registerLanguage.png
	:align: center

For example, to add the python language, we had to register it in the *index.js* file of the *"language.python"* plugin:

.. code-block:: javascript

	studio.projects.registerLanguage('python', 'Python', 'plugins/language.python/data/img/python.png', python);

where **“python”**, the last parameter, is an object that contains the specifications of the python programming language, mentioned above.

4. registerLanguageAddon(language, board, type, addon = {})
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Adds an addon for an existing programming language.

5. _runLanguageFunction (fn, project, ...params)
""""""""""""""""""""""""""""""""""""""""""""""""""
Runs any function provided by a programming language.
For example, we used it to create new projects: 

.. code-block:: javascript

	this._runLanguageFunction ('createProject', project);


6. registerEditor(name, languages, component, options = {})
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Registers a new text editor.
For example, in the *“projects.editor.ace”* we created an Ace Editor which supports some file types:

.. code-block:: javascript

	studio.projects.registerEditor('EDITOR_ACE',['py','js','json','d','c','h','sh'], Ace);


7. createEmptyProject(name, language)
"""""""""""""""""""""""""""""""""""""""
Creates a new, empty project, having the name and language specified by the user.
We called this function in the *“projects”* plugin (*AddProjectDialog.vue* component):

.. code-block:: javascript

	project = await this.studio.projects.createEmptyProject(this.projectName,this.languageID)
where **projectName** and **languageID** can be modified depending on the user’s preferences.

8. deleteProject(project)
"""""""""""""""""""""""""""
This function deletes all the files related to the project chosen by the user.

9. renameProject(project, newName)
"""""""""""""""""""""""""""""""""""""
Replaces the name of a chosen project with the **“newName”** value, that is selected in the input text area.

10. cloneProject(project, newName)
""""""""""""""""""""""""""""""""""""
Creates a duplicate of the selected project and it names it with the **“newName”** value chosen by the user.

11. importProject(project,extension)
"""""""""""""""""""""""""""""""""""""""
Loads a new project tree from the user’s computer. The achive extension can be *“.zip”*, *“.tar”* (in this case the files will be extracted), or *‘.wylioapp”* (we are creating recursively the project folder).

12. recursiveCreating(necesarry) 
"""""""""""""""""""""""""""""""""""""
Generates the project tree structure with paths and names. **“necessary”** is an object representing the details about every file within the project

	* *necesarry.item* - file item
	* *necessary.item.isdir* - is or not directory
	* *necessary.item.children* - only if it's a directory
	* *necessary.item.name* - name
	* *necessary.item.content* - file content only if it's a file

We are using it in the *importProject* function mentioned before (*.wylioapp* extension)

.. code-block:: javascript

	for (let item of projectImport.tree) {
        await this.recursiveCreating({
            item: item,
            prev: item,
            folder: workspacePath
        });


13. exportProject(project,savePath)
"""""""""""""""""""""""""""""""""""""
Exports a project archive (*.zip* extension format) to the user’s computer, where **savePath** it the destination path selected by the user.

14. newFolder(project, name)
"""""""""""""""""""""""""""""""
Creates a new folder in the current project.

* “project” = the current project object”
* “name” = path to where to create the new folder. 

This option is valid only in the *Advanced Mode*.

15. newFile(project, name, data = '')
""""""""""""""""""""""""""""""""""""""""
Creates a new file in the current project.

* “project” = the current project object”,
* “name” = path to where to create the new folder
* “data” =  data that will be written in the new file

This option is valid only in the *Advanced Mode*.

16. renameObject(project, newName, pathTo)
"""""""""""""""""""""""""""""""""""""""""""
Renames the selected file/ folder.

* “project” = the project object
* “newName” = the new name of the project, chosen by the user
* "pathTo" = path to existing file/folder


17. deleteFile(project, pathTo)
"""""""""""""""""""""""""""""""""
Deletes the current file of a project tree.

* “project” = the project object
* “pathTo” = the path to the selected file


18. deleteFolder(project, pathTo)
""""""""""""""""""""""""""""""""""""
Deletes the selected folder of a project tree.

* “project” = the project object
* “pathTo” = the path to the folder

19. loadProjects()
""""""""""""""""""""""
Loads the existing projects.
We are using this function after each change that was made on the **Projects library**: *renameProject*, *cloneProject*, *importProject*.


20. selectCurrentProject(project)
""""""""""""""""""""""""""""""""""
Selects a project when the user clicks on it and it loads the data in the Application tab.

21. loadPreviousSelectedCurrentProject()
""""""""""""""""""""""""""""""""""""""""""""
Loads the last selected project from the local files.

22. saveFile(project, name, buffer)
""""""""""""""""""""""""""""""""""""""
Saves an edited file.

* “project” = the project object
* “name” = the path to the file
* “buffer” = the file buffer that will actually be saved

23. loadFile(project, name)
"""""""""""""""""""""""""""""
Loads a file. It returns a string that represents the file content.

* “project” = the project object
* “name” = the full file name, including its path

24. changeFile(name)
""""""""""""""""""""""
Changes the current file in the store.

* “name”=path to the file

25. saveSpecialFile(project, name, content)
""""""""""""""""""""""""""""""""""""""""""""""
Saves a special settings file.

* “project” = the current project object
* “name” = the special file name
* “context” = the contect that will be saved in the special file

For example, in order to save our notes written in the *“Notebook”* tab (*“notebook”* plugin), notes that are different for each project, we called this function. It created a special **“notebook.json”** file, where we keep the explicit data notes for every project.

.. code-block:: javascript

	this.studio.projects.saveSpecialFile(this.currentProject,'notebook.json', JSON.stringify (this.elements));

where **this.elements** represents an array of notes that we create in the Notebook.

.. image:: images/saveSpecialFiles.png
	:align: center
	:height: 250px

26. loadSpecialFile(project, name)
""""""""""""""""""""""""""""""""""""
Loads a special settings file.

* “project” = the current project object
* name” = the special file name

Given the example above, we call this function each time we are changing the project, so the Notebook can load its specific content for each project apart. 

.. code-block:: javascript

	data = await this.studio.projects.loadSpecialFile(this.currentProject,'notebook.json');

27. recursiveGeneration(project, file)
"""""""""""""""""""""""""""""""""""""""""
Recursively generates a deep object with all the contents of a project and returns an object, which is the root of the folder with all its contents.

* "project" = Project object
* "file" = File object

28. generateStructure(project, isRoot=true)
""""""""""""""""""""""""""""""""""""""""""""""
Generates the tree structure of a project and it returns the tree structure with items of type **recursiveGeneration** (explained above).


29. getCurrentProject()
""""""""""""""""""""""""""""
Returns a project object loaded from the store.
For example, we used this function to check if there is a project open, so we know if we should enable the “Notebook” tab.

.. code-block:: javascript

	studio.workspace.registerTab('PROJECT_NOTEBOOK', 300, Notebook, {
        enabled () {
            return !!studio.projects.getCurrentProject ();
        }
    });

30. getDefaultFileName(project)
"""""""""""""""""""""""""""""""""
Returns the default file name for a specified project, using the **_runLanguageFunction**.
For example, in the *“language.python”* plugin, we create a *“python”* object, to which we associate the default file name *‘/main.py’*.

.. code-block:: javascript

	getDefaultFileName() {
            return '/main.py';
        }


31. getDefaultRunFileName(project)
"""""""""""""""""""""""""""""""""""""""
Returns the default run file name for a specified project, using the **_runLanguageFunction**.
Same as the **getDefaultFileName** function above,, in the *“language.python”* plugin, inside the *“python”* object we created, we associate the default run file name *‘/main.py’*.

.. code-block:: javascript

	getDefaultRunFileName() {
            return '/main.py';
        }

32. getMakefile(project, filename)
""""""""""""""""""""""""""""""""""""""
Similar to the 2 functions above, returns the makefile for the **“filename”** of a **“project”**.
An example of use of this function can also be found in the *“language.python”* plugin:

.. code-block:: javascript

	getMakefile(project, filename) {
            if (filename[0] === '/') filename = filename.substring (1);
            // TODO add filename
            return 'run:\n\tpython main.py';
        }

33. languageSpecificOption (project, option)
"""""""""""""""""""""""""""""""""""""""""""""""
Gets the default run file name of a language.
We used it in the *“projects.editor.visual”* plugin, to obtain the source language of a specific project.

.. code-block:: javascript

	sourceLanguage = this.studio.projects.languageSpecificOption (this.currentProject, 'sourceLanguage');


34. getFileCode(project, pathTo)
""""""""""""""""""""""""""""""""""
Gets the file code of a project.

35. getCurrentFileCode()
"""""""""""""""""""""""""""
Get the current file code.

