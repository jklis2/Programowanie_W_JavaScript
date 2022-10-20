document.addEventListener('keypress', onKeyPress)

function onKeyPress(event) {
    console.log(event);
    const key = event.key
    // swich
    const audioId = 'clap'
    playSound(audioId)
}

function playSound(sound) {
    const audioTag = document.querySelector('#' + sound)
    audioTag.currentTime = 0
    audioTag.play()
}

//Date.now()