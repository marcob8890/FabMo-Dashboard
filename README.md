FabMo-Dashboard
===============
The FabMo dashboard is a desktop application for communicating with the FabMo CNC environment.  It allows you to connect to your FabMo capable tool, execute G-Code and OpenSBP files, and run FabMo apps, which are special purpose CNC softwares designed for performing fabrication tasks.

Getting the FabMo Dashboard
---------------------------
There currently aren't any "official" binary builds of the FabMo dashboard, but the dashboard is easy to run from source, as described below.

Running from Source
-------------------
To run the dashboard, you need node.js and the FabMo-Dashboard source.  From the `src` directory, you can install the dependencies with: 

```
npm install
```

Once the dependencies are successfully installed, run the dashboard (from the `src` directory) with:

```
npm start
```

Documentation
-------------
Source code documentation is available at http://shopbottools.github.io/FabMo-Dashboard/

You can rebuild the documentation from source by running:

```
grunt doc
```

from the `src` directory.
