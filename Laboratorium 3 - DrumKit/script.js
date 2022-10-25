import {KeyToSound} from './Constants/KeyToSound.js';

document.addEventListener('keypress', onKeyPress);
const startStopButton = document.querySelector('#startStopRecordingButton')
startStopButton.addEventListener('click', recordingButtonPressed)
const playSelectedButton = document.querySelector('.playSelectedButton')
playSelectedButton.addEventListener('click', playSelected)

let isRecording = false;
const records = [];
const currentRecording = {
    startTime: 0,
    endTime: 0,
    notes: []
}

function recordingButtonPressed(){
    changeRecordingStatus();
    startRecording();
}

function startRecording(){
    currentRecording.notes = []
    currentRecording.startTime = Date.now()
}

function endRecording(){
    currentRecording.endTime = Date.now()

    if (currentRecording.notes.length>0) {
        const recordingWithTimeStamps = []

        for (let i = 0; i < currentRecording.notes.length; i++) {
            recordingWithTimeStamps.push([currentRecording.notes[i][0], currentRecording.notes[i][1]-currentRecording.startTime])
        }

        records.push(recordingWithTimeStamps)
        displayRecord()
    }
}

function displayRecord(){
    const egzampleRecord = document.querySelector('#egzampleHiddenRecord')
    const newRecord = egzampleRecord.cloneNode(true);
    newRecord.setAttribute('id', `record-${records.length-1}` );
    const newRecordButtonContainer = newRecord.querySelector('.recordContainerButtonsContainer')
    const playButton = newRecordButtonContainer.querySelector('.playRecordButton')
    playButton.setAttribute('id', `play-${records.length-1}`)
    playButton.addEventListener('click', function(){playRecord(event.target.id)})
    const deleteButton = newRecordButtonContainer.querySelector('.deleteRecordButton')
    deleteButton.setAttribute('id', `delete-${records.length-1}`)
    deleteButton.addEventListener('click', deleteRecord)
    const checkBox = newRecordButtonContainer.querySelector('.selectedCheckbox')
    checkBox.setAttribute('id', `select-${records.length-1}`)

    document.querySelector('.recordsContainer').appendChild(newRecord)
}

function changeRecordingStatus(){
    if (isRecording == false){
        isRecording = true;
        startStopButton.setAttribute('class', 'buttonIsRecording' )
    }
    else{
        isRecording = false;
        startStopButton.setAttribute('class', 'buttonIsNotRecording' );
        endRecording()
    }
}

function onKeyPress(ev) {
    const sound = KeyToSound[ev.key]
    if(sound != undefined && isRecording == true){
        recordSound(sound);
    }
}

function recordSound(sound){
    playSound(sound);
    currentRecording.notes.push([sound, Date.now()])
}

function playSound(sound) {
    if (!sound) {
        return
    }
    const audioTag = getSoundById(sound)
    audioTag.currentTime = 0
    audioTag.play()
}

function getSoundById(sound){
    return document.querySelector(`#${sound}`);
}

function deleteRecord(ev){
    const record = document.querySelector(`#record-${(ev.target.id).slice(-1)}`)
    record.remove()
}

function playRecord(id){
    const record = records[(id).slice(-1)]
    record.forEach(element => {
        const delay = element[1]
        setTimeout(function(){playSound(element[0])}, element[1])
    });
    console.log(record)
}

function playSelected(){
    const allCheckbox =  document.querySelectorAll('.selectedCheckbox')
    allCheckbox.forEach(element => {
        if (element.checked) {
            playRecord(element.id.slice(-1))
        }
    });
}