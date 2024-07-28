import useNotes from '../store';
import styles from './Sidebar.module.css';
import SidebarPageEntry from './SidebarPageEntry';

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
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function SidebarPageEntries() {
    
    const [noteState, noteActions] = useNotes();

    const sensors = useSensors(
        useSensor(PointerSensor,
            { activationConstraint: { distance: 10} }  // so that we can still interact with handle
        ),
    );

    const allNotes = noteState.allNotes;
    
    const handleDragStart = (event) => {};
    
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = allNotes.findIndex(page => page.id === active.id);
            const newIndex = allNotes.findIndex(page => page.id === over.id);
            noteActions.setNewPageOrder(arrayMove(allNotes, oldIndex, newIndex));
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={styles.sidebarDiv}>
                
                <SortableContext items={allNotes} strategy={verticalListSortingStrategy}>
                {
                    allNotes.map((page) => {
                        return (
                            <SidebarPageEntry
                                key={page.id}
                                page={page}
                            />
                        )
                    })
                }
                </SortableContext>
            </div>
        </DndContext>
    );
}