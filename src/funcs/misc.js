// WAIT FOR GIVEN MILLISECONDS
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

// KILL APPLICATION
function terminate() {
   process.exit(1);
}

export {
   sleep,
   terminate
}