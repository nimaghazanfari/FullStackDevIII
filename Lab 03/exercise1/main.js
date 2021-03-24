var counter = 10;

const interval = setInterval(() => {

    if (counter < 1) {
        console.log('time is up!');
        clearInterval(interval);
    }
    else console.log(counter--);

}, 1000);