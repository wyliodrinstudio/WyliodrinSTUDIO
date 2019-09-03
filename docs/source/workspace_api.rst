:orphan:

Workspace plugin API
=======================

|

“Workspace” is the main plugin in our application. It exports the *"workspace”* object, containing a series of functions that we use in every other plugin.

|

Data Types
""""""""""

.. autoclass:: Device

|

.. autofunction:: disposable

|

=========

Tabs
"""""""""

.. autofunction:: registerTab

|

.. autofunction:: registerMenuItem

|

.. autofunction:: renameMenuItem

|

.. _registerDeviceToolButton:

.. autofunction:: registerDeviceToolButton

|

Status Bar
""""""""""

.. autofunction:: registerStatusButton

|

.. autofunction:: openStatusButton

|

.. autofunction:: closeStatusButton

|

Data Store
""""""""""

.. autofunction:: registerStore

|

.. autofunction:: getFromStore

|

.. autofunction:: dispatchToStore

|

Vue
"""""""

.. autofunction:: registerComponent

|

.. autofunction:: setWorkspaceTitle

|

Device Drivers
""""""""""""""

.. _registerDevice:

.. autofunction:: registerDeviceDriver

|

.. _updateDevices:

.. autofunction:: updateDevices

|

.. autofunction:: connect

|

.. autofunction:: getDevice

|

.. autofunction:: getStatus

|

.. autofunction:: disconnect
