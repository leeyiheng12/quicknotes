import { deepcopy, generateNewNote, uuidv4 } from "./helpers";

const defaultNotes = [
    {
        "id": uuidv4(),
        "pageName": "Personal",
        "notes": [
            {
                "id": uuidv4(),
                "title": "To-Do",
                "content": "- Buy milk\n- Walk the dog\n- Dinner at 7pm",
            },
            {
                "id": uuidv4(),
                "title": "Something else",
                "content": "Write anything here!",
            }
        ]
    },
    {
        "id": uuidv4(),
        "pageName": "Work",
        "notes": [
            {
                "id": uuidv4(),
                "title": "Project 1",
                "content": "- Finish the report\n- Send the email",
            },
            {
                "id": uuidv4(),
                "title": "Meeting xxx",
                "content": "I don't know what to write here!",
            }
        ]
    }
]

const localStorageName = 'quicknotes';

class NoteStorage {

    // constructor: initialise the notes storage and track the notes
    constructor() {
        this.initialise();
    }

    initialise() {
        const notes = this.readFromLocalStorage();
        if (!notes || notes.length === 0) {
            this.writeToLocalStorage(defaultNotes);
        }
        this.notes = this.readFromLocalStorage();
    }

    readFromLocalStorage() {
        return JSON.parse(localStorage.getItem(localStorageName));
    }

    writeToLocalStorage(notes) {
        localStorage.setItem(localStorageName, JSON.stringify(notes));
    }

    writeTitle(pageId, noteId, title) {
        const newNotes = deepcopy(this.notes).map(page => ({
            id: page.id,
            pageName: page.pageName,
            notes: (page.id === pageId
                ? page.notes.map(note => (note.id === noteId ? { ...note, title: title } : note))
                : page.notes
            )
        }));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

    writeNote(pageId, noteId, content) {
        const newNotes = deepcopy(this.notes).map(page => ({
            id: page.id,
            pageName: page.pageName,
            notes: (page.id === pageId
                ? page.notes.map(note => (note.id === noteId ? { ...note, content: content} : note))
                : page.notes
            )
        }));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

    createNewNote(pageId, newNote) {
        const newNotes = deepcopy(this.notes).map(page => ({
            id: page.id,
            pageName: page.pageName,
            notes: page.id === pageId ? [...page.notes, newNote] : page.notes
        }));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

    deleteNote(pageId, noteId) {
        const newNotes = deepcopy(this.notes).map(page => ({
            id: page.id,
            pageName: page.pageName,
            notes: page.id === pageId ? page.notes.filter(note => note.id !== noteId) : page.notes
        }));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

    writePageName(pageId, newPageName) {
        const newNotes = deepcopy(this.notes).map(page => ({
            id: page.id,
            pageName: page.id === pageId ? newPageName : page.pageName,
            notes: page.notes
        }));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

    createPage() {
        let pageNo = 0;
        while (this.notes.find(page => page.pageName === `Page ${pageNo + 1}`)) {
            pageNo++;
        }
        const newPageName = `Page ${pageNo + 1}`;
        const newPage = {
            id: uuidv4(),
            pageName: newPageName,
            notes: [generateNewNote()],
        }
        const newNotes = [...deepcopy(this.notes), newPage];
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
        return newPage;
    }

    deletePage(pageId) {
        const newNotes = deepcopy(this.notes.filter(page => page.id !== pageId));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

    setNewNotesOrder(pageId, newOrder) {
        const newNotes = deepcopy(this.notes).map(page => ({
            id: page.id,
            pageName: page.pageName,
            notes: page.id === pageId ? newOrder : page.notes
        }));
        this.writeToLocalStorage(newNotes);
        this.notes = newNotes;
    }

}

export default NoteStorage;
