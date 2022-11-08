import { Note } from "./note.js";

document.addEventListener("DOMContentLoaded", function(){
    AddAllNotesToView()
});

document.querySelector("#AddNoteHeaderButton").addEventListener('click', AddNewNote);
document.querySelector('#DetailNoteCancelButton').addEventListener('click', HideNoteCreator)
document.querySelector('#DetailNoteSaveButton').addEventListener('click', NoteCreatorSaveNote)
document.querySelector('#DetailNoteDeleteButton').addEventListener('click', NoteCreatorDeleteNote)
document.querySelector('#colorpicker').addEventListener('input', ChangeNoteCreatorColor)

let IdOfNoteToEditOrDelete

function ChangeNoteCreatorColor(){
    document.querySelector('.DetailNoteContainer').style.backgroundColor = document.querySelector('#colorpicker').value
}


function AddNewNote(){
    IdOfNoteToEditOrDelete = 0
    document.querySelector('#DetailNoteTitle').value = ""
    document.querySelector('#textContent').value = ""
    document.querySelector('#colorpicker').value = 'd1de5d'
    document.querySelector('#DetailNotePinned').checked = false
    document.querySelector('.DetailNoteContainer').style.backgroundColor = '#d1de5d'
    ShowNoteCreator()
}

function ShowNoteCreator(){
    document.querySelector('.DetailNoteBG').style.visibility = "visible";
}

function HideNoteCreator(){
    document.querySelector('.DetailNoteBG').style.visibility = "hidden";
}

function NoteCreatorSaveNote(){
    if (IdOfNoteToEditOrDelete == 0) {
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
    else{
        const note = new Note()
        note.id = IdOfNoteToEditOrDelete
        note.title = document.querySelector('#DetailNoteTitle').value
        note.content = document.querySelector('#textContent').value
        note.colour = document.querySelector('#colorpicker').value
        note.pinned = document.querySelector('#DetailNotePinned').checked

        const newNote = note.UpdateNote(note)
        HideNoteCreator()
        RemoveNoteFromView()
        AddNoteToView(newNote)
    }
}

function NoteCreatorEditNote(ev){
    const fullId = ev.target.id
    const id = parseInt(fullId.split('-')[1])
    IdOfNoteToEditOrDelete = id
    const egNote = new Note()
    const note = egNote.GetNote(id)

    document.querySelector('#DetailNoteTitle').value = note.title
    document.querySelector('#textContent').value = note.content
    document.querySelector('#colorpicker').value = note.colour
    document.querySelector('#DetailNotePinned').checked = note.pinned
    document.querySelector('.DetailNoteContainer').style.backgroundColor = note.colour

    ShowNoteCreator()

}

function NoteCreatorDeleteNote(){
    if (IdOfNoteToEditOrDelete != 0) {
        const egNote = new Note()
        egNote.DeleteNote(IdOfNoteToEditOrDelete)
        RemoveNoteFromView()

        HideNoteCreator()
    }
}

function AddAllNotesToView(){
    const egNote = new Note()
    const notes = egNote.GetNotes()
    notes.forEach(note => {
        AddNoteToView(note)
    });
}

function RemoveNoteFromView(){
    let node = document.getElementById(`note-${IdOfNoteToEditOrDelete}`);
    if (node.parentNode) {
    node.parentNode.removeChild(node);
    }
}

function AddNoteToView(note){
    const egzamplenote = document.querySelector('#egzampleHiddenNote')
    const newNote = egzamplenote.cloneNode(true);
    newNote.style.backgroundColor = note.colour;
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
    newNote.addEventListener('click', NoteCreatorEditNote)
}