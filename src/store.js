import { createStore, createHook } from 'react-sweet-state';

import { generateNewNote } from './helpers';
import NoteStorage from './noteStorage';

const noteStorage = new NoteStorage();
const getPageId = (notes) => notes.length > 0 ? notes[notes.length-1].id : "";
const getPageName = (notes) => notes.length > 0 ? notes[notes.length-1].pageName : "";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    allNotes: noteStorage.notes,
    currentPageId: getPageId(noteStorage.notes),
    currentPageName: getPageName(noteStorage.notes),
  },
  // actions that trigger store mutation
  actions: {
    setNoteTitle: (pageId, noteId, title) => ({setState}) => {
      noteStorage.writeTitle(pageId, noteId, title);
      setState({ allNotes: noteStorage.notes });
    },
    setNoteContent: (pageId, noteId, content) => ({setState}) => {
      noteStorage.writeNote(pageId, noteId, content);
      setState({ allNotes: noteStorage.notes });
    },
    createPage: () => ({setState}) => {
      const newPage = noteStorage.createPage();
      setState({ allNotes: noteStorage.notes, currentPageName: newPage.pageName, currentPageId: newPage.id });
    },
    writePageName: (pageId, newPageName) => ({setState}) => {
      noteStorage.writePageName(pageId, newPageName)
      setState({ allNotes: noteStorage.notes, currentPageName: newPageName });
    },
    deletePage: (deletedPageId) => ({getState, setState}) => {
      let newPageName = getState().currentPageName;
      let newPageId = getState().currentPageId;
      noteStorage.deletePage(deletedPageId);
      if (noteStorage.notes.length === 0) {
        noteStorage.initialise();
      } 
      if (newPageId === deletedPageId) {
        newPageName = getPageName(noteStorage.notes);
        newPageId = getPageId(noteStorage.notes);
      }
      setState({
        allNotes: noteStorage.notes,
        currentPageId: newPageId,
        currentPageName: newPageName,
      });
    },
    createNote: (pageId) => ({setState}) => { noteStorage.createNewNote(pageId, generateNewNote()); setState({ allNotes: noteStorage.notes }); },
    deleteNote: (pageId, noteId) => ({setState}) => { noteStorage.deleteNote(pageId, noteId); setState({ allNotes: noteStorage.notes }); },
    setCurrentPage: (pageId, pageName) => ({setState}) => { setState({ currentPageId: pageId, currentPageName: pageName }); },
    setNewNotesOrder: (pageId, newOrder) => ({setState}) => { noteStorage.setNewNotesOrder(pageId, newOrder); setState({ allNotes: noteStorage.notes }); },
    setNewPageOrder: (newOrder) => ({setState}) => { noteStorage.notes = newOrder; setState({ allNotes: newOrder }); },
  },
});

const useNotes = createHook(Store);
export default useNotes;
