export class Note {
    constructor()
    {

    }

    SaveNote(note){
        note.id = this.GetNewId()
        console.log(note)
        const notes = this.GetNotes()
        notes.push(note)
        console.log(note)
        localStorage.setItem("notes", JSON.stringify(notes))
        return note
    }

    DeleteNote(id){

    }

    GetNotes(){
        const notes = JSON.parse(localStorage.getItem('notes'));
        if (notes == null) {
            return []
        }
        return notes
    }

    GetNote(id){

    }

    GetNewId(){
        const notes = this.GetNotes();
        let biggestId = 0;
        notes.forEach(element => {
            if (element.id > biggestId) {
                biggestId = element.id
            }
        });
        return biggestId + 1;
    }

}