# nodemon + windows-kill

This is a test for a nodemon bugfix that enables SIGINT on Windows.

See https://github.com/remy/nodemon/issues/1720 for more details.

## Installation

### Clone

Clone the nodemon_windows_kill repository to a nice place on your machine via:

```
git clone git@github.com:countzero/nodemon_windows_kill.git
```

### Install nodemon dependency

Navigate into the project directory and install den custom nodemon dependency:

```
npm install
```

## Usage

### Start nodemon

Start the test application with nodemon via:

```
npx nodemon ./index.js
```

### Modify application

Change a comment in the ./index.js file. This should trigger the SIGINT POSIX signal and the app should shut itself down gracefully.
