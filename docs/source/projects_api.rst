:orphan:

Projects plugin API
====================

|

The **"projects"** plugin is the second most important component in our application. Same as *"workspace"*, it has its own store, where we register the applications the user creates, in order to manage properly his activity.

|

===========

Data Types
""""""""""

|

.. autoclass:: Project

|

.. autoclass:: Language

|

.. autofunction:: disposable

======================

Programming Languages
"""""""""""""""""""""""
|

.. autofunction:: getLanguage

|

.. _registerLanguage:

.. autofunction:: registerLanguage

|

.. _registerLanguageAddon:

.. autofunction:: registerLanguageAddon

|

.. autofunction:: registerEditor

|

.. autofunction:: languageSpecificOption

===========

Projects
""""""""

|

.. autofunction:: createEmptyProject

|

.. autofunction:: deleteProject

|

.. autofunction:: renameProject

|

.. autofunction:: cloneProject

|

.. autofunction:: importProject

|

.. autofunction:: recursiveCreating

|

.. autofunction:: exportProject

|

.. autofunction:: recursiveGeneration

|

.. autofunction:: loadProjects

|

.. autofunction:: selectCurrentProject

|

.. autofunction:: loadPreviousSelectedCurrentProject

|

.. autofunction:: generateStructure

|

.. autofunction:: getCurrentProject

|

====================

Files and Folders
""""""""""""""""""

|

.. autofunction:: newFile

|

.. autofunction:: deleteFile

|

.. autofunction:: saveFile

|

.. autofunction:: loadFile

|

.. autofunction:: changeFile

|

.. autofunction:: saveSpecialFile

|

.. autofunction:: loadSpecialFile

|

.. autofunction:: getDefaultFileName

|

.. autofunction:: getDefaultRunFileName

|

.. autofunction:: getMakefile

|

.. autofunction:: getFileCode

|

.. autofunction:: getCurrentFileCode

|

.. autofunction:: newFolder

|

.. autofunction:: deleteFolder

|

.. autofunction:: renameObject