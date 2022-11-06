import { Note } from "./note.js";

document.addEventListener("DOMContentLoaded", function(){
    AddAllNotesToView()
});

document.querySelector("#AddNoteHeaderButton").addEventListener('click', AddNewNote);
document.querySelector('#DetailNoteCancelButton').addEventListener('click', HideNoteCreator)
document.querySelector('#DetailNoteSaveButton').addEventListener('click', NoteCreatorSaveNote)
//document.querySelector('#DetailNoteSaveButton').addEventListener('click', OpenSaveNote)

function AddNewNote(){
    document.querySelector('#DetailNoteTitle').value = ""
    document.querySelector('#textContent').value = ""
    document.querySelector('#colorpicker').value = '#0000ff'
    document.querySelector('#DetailNotePinned').checked = false
    ShowNoteCreator()
}

function ShowNoteCreator(){
    document.querySelector('.DetailNoteBG').style.visibility = "visible";
}

function HideNoteCreator(){
    document.querySelector('.DetailNoteBG').style.visibility = "hidden";
}

function NoteCreatorSaveNote(){
    const note = new Note()
    note.title = document.querySelector('#DetailNoteTitle').value
    note.content = document.querySelector('#textContent').value
    note.colour = document.querySelector('#colorpicker').value
    note.pinned = document.querySelector('#DetailNotePinned').checked
    note.date = new Date().toISOString()
    const newNote = note.SaveNote(note)
    HideNoteCreator()
    AddNoteToView(newNote)

}

function AddAllNotesToView(){
    const notes = Note.GetNotes()
    notes.forEach(note => {
        AddNoteToView(note)
    });
}

function AddNoteToView(note){
    const egzamplenote = document.querySelector('#egzampleHiddenNote')
    const newNote = egzamplenote.cloneNode(true);
    newNote.setAttribute('id', `note-${note.id}` );
    newNote.querySelector('.NoteTitle').innerText = note.title
    newNote.querySelector('.NoteDate').innerText = note.date
    newNote.querySelector('.NoteContent').innerText = note.content
    if (note.pinned) {
        document.querySelector('#PinnedNotesContainer').appendChild(newNote)
    }
    else{
        document.querySelector('#RegularNotesContainer').appendChild(newNote)
    }
}