# Hello Frelard Example

This is an extremely simple extension which just demonstrates initializing an extension and getting the name of the dashboard it is running in.

### Pre-requisites
* You must have Node.js or Python installed (or other software which can serve the contents of this folder over http). You can get Node.js from http://nodejs.org and Python from https://www.python.org/downloads/

### Setup
1. Copy the `.trex` files from `.\Extensions` to `~\Documents\My Tableau Repository (Beta)\Extensions` so they are available to Tableau.
2. Open a command prompt window to the location where you cloned this repo.
3. Make sure you're in the `.\Examples\HelloFrelard` directory.
4. Start a simple file hosting server:
	* Python 2.x : `python -m SimpleHTTPServer 8765`
	* Python 3.x : `python -m http.server 8765`
	* Node.js : First run `npm install http-server -g` (only the first time) then `http-server -p 8765`
5. Launch Tableau, open or create a new dashboard, and drag the extension onto it
