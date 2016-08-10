#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

# Functiom that prints the latest stable version
version() {
  echo "0.1.0"
}

echo "Downloading latest version from github $(version)"

#download latest
wget https://github.com/PixelSwarm/modepress-admin-hatchery/archive/v$(version).zip
unzip -o "v$(version).zip" "modepress-admin-hatchery-$(version)/*"

# Moves the server folder to the current directory
cp -r modepress-admin-hatchery-$(version)/* .

# Remove modepress-admin folder
if [ -d "modepress-admin-hatchery-$(version)" ]; then
	rm modepress-admin-hatchery-$(version) -R
fi

# Remove the zip file
rm "v$(version).zip"

# All done
echo "Modepress Hatchery Plugin v$(version) successfully downloaded"
exit
} # this ensures the entire script is downloaded #