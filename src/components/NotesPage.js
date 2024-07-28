import styles from './NotesPage.module.css';
import Note from './Note';
import useNotes from '../store';

import { FaPlus } from "react-icons/fa";

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
} from "@dnd-kit/sortable";


// https://codesandbox.io/s/dndkit-grid-with-drag-handle-example-x9w71?file=/src/App.js:1864-1872

export default function NotesPage() {
    
    const [noteState, noteActions] = useNotes();
    const currentPage = noteState.allNotes.find(note => note.id === noteState.currentPageId);
    const currentPageNotes = currentPage.notes;
    const currentPageId = currentPage.id;

    const sensors = useSensors(
        useSensor(PointerSensor,
            { activationConstraint: { distance: 10} }  // so that we can still interact with handle
        ),
    );
    
    const handleDragStart = (event) => {};
    
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = currentPageNotes.findIndex(note => note.id === active.id);
            const newIndex = currentPageNotes.findIndex(note => note.id === over.id);
            noteActions.setNewNotesOrder(noteState.currentPageId, arrayMove(currentPageNotes, oldIndex, newIndex));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div style={{ padding: "20px", display: "flex", gap: "10px", flexWrap: "wrap", width: "100%" }}>
                <SortableContext items={currentPageNotes}>
                    {
                        currentPageNotes.map((note) => (
                            <Note
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                onTitleChange={(title) => noteActions.setNoteTitle(currentPageId, note.id, title)}
                                content={note.content}
                                onContentChange={(content) => noteActions.setNoteContent(currentPageId, note.id, content)}
                                deleteNote={() => noteActions.deleteNote(noteState.currentPageId, note.id)}
                            />
                        ))
                    }
                </SortableContext>
                <div
                    className={styles.addNote}
                    onClick={() => noteActions.createNote(noteState.currentPageId)}
                >
                    <FaPlus size={50} />
                </div>
            </div>
        </DndContext>
    );
}