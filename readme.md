# Modepress Admin
A small plugin for the Modepress admin app to manage the various aspects of the hatchery

## Current stable version
* v0.1.0

## Requirements
* Node 6.2
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Installation

1) Make sure the requirements are installed and running
2) Go into your modepress admin project/plugins folder and create a folder where you want to store the hatchery project

```
cd /[LOCATION_OF_ADMIN]/plugins  (you might need to created plugins if it doesnt exist)
mkdir hatchery
cd hatchery
```

3) Run as an admin / or make sure you have write privileges in the folder
```
sudo su
```

4) Download the source code from github

```
curl -o- https://raw.githubusercontent.com/MKHenson/modepress-admin-hatchery/master/install-script.sh | bash
```

This downloads the latest hatchery project into the current folder.

5) Install the build dependencies, and then build the project

```
npm install
gulp install
gulp build
```

This creates a ./dist folder that has the entire built project.

6) Now setup the plugin within the admin app. Currently the modepress server doesn't know about the files - we need to inform it:

Specifically We need to add the "/dist/index.js" as a plugin file in the modepress server config for the admin app

* Open the modepress server config json file
* Find the json block that defines the admin app
* Within the 'paths' section:
 - In the 'plugins' array, add the plugin js file generated in the dist folder (Add this if one doesnt exist)
 - In the 'variables' set a new variable: 'appEngineUrl' and specify the url of where hatchery resides (Add this if one doesnt exist)
```
"servers": [{
		"host": "admin.webinate.dev",
		....
		"paths": [
		{
		  "path": "*",
		  "index": "D:/projects/modepress-admin/dist/index.jade",

		  "plugins": ["/plugins/hatchery/plugin.js"],
		  "variables": { "appEngineUrl" : "http://animate.webinate.dev" }

		}]
	},
```