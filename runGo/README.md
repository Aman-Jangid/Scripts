### `runGo`
runs a go file whenever it is saved.

#### Requirements

  Ubuntu/Debian:
   ```sh
   sudo apt-get update
   sudo apt-get install git golang-go inotify-tools
   ```

  Fedora:
   ```sh
   sudo dnf install git golang inotify-tools
   ```

  Arch Linux:
   ```sh
   sudo pacman -S git go inotify-tools
   ```

#### Installation

**Clone the repository:**

   ```sh
   git clone https://github.com/Aman-Jangid/Scripts.git
   ```

**Cd into the cloned directory and Give executable permissions**

   ```sh
   cd Scripts && chmod +x runGo.sh
   ```

**Copy/Move the script to a recommended path (e.g., /usr/local/bin/)**
   ```sh
   sudo cp runGo /usr/local/bin/
   ```

**Add an alias then Source the config to apply the alias**
  
  Bash:
   ```sh
   echo 'alias watchgo="/usr/local/bin/runGo"' >> ~/.bashrc && source ~/.bashrc
   ```

  Zsh:
   ```sh
   echo 'alias watchgo="/usr/local/bin/runGo"' >> ~/.zshrc && source ~/.zshrc
   ```
