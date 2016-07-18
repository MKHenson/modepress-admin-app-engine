#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

echo "Downloading dev version from github"

#download latest
wget https://github.com/MKHenson/modepress-admin-app-engine/archive/dev.zip
unzip -o "dev.zip" "modepress-admin-app-engine-dev/*"

# Moves the server folder to the current directory
cp -r modepress-admin-app-engine-dev/* .

# Remove modepress-admin folder
if [ -d "modepress-admin-app-engine-dev" ]; then
	rm modepress-admin-app-engine-dev -R
fi

# Remove the zip file
rm "dev.zip"

# All done
echo "Modepress App-engine Plugin (dev) successfully downloaded"
exit
} # this ensures the entire script is downloaded #