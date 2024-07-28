
export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

const defaultNote = {
  "title": "Some title",
  "content": "This is the content of the new note."
}

export function generateNewNote() {
  return {
      "id": uuidv4(),
      "title": defaultNote.title,
      "content": defaultNote.content
  }
}

export function deepcopy(notes) {
  return [...notes.map(page => ({...page, notes: [...page.notes]}))];
}
