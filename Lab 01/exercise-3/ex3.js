const say = require('say')

say.speak("What's up?", 'Alex', 0.5)

function sorryDave() {
    say.speak('I\'m sorry, Dave!', 'Sorry Msg', 0.5)
}

setTimeout(sorryDave, 5000);