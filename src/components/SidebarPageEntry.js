import React from 'react';
import useNotes from '../store';
import styles from './Sidebar.module.css';

import { MdOutlineDelete } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

const iconSize = 20;

export default function SidebarPageEntry({page}) {

    const [noteState, noteActions] = useNotes();
    const handleDeletePage = (event, pageId) => {
        event.stopPropagation();
        noteActions.deletePage(pageId);
    }

    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
        isDragging,
    } = useSortable({ id: page.id, animateLayoutChanges: () => false });

    const [isHovered, setIsHovered] = React.useState(false);

    return (

        <div
            style={{
                transition,
                transform: transform && CSS.Transform.toString(transform),
                zIndex: isDragging ? 10 : 'auto',
            }}
            ref={setNodeRef}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
        >
            <div
                onClick={() => noteActions.setCurrentPage(page.id, page.pageName)}
                className={`${styles.row} ${styles.entry} ${noteState.currentPageId === page.id && styles.selectedEntry}`}
                {...listeners} {...attributes}
            >
                <p>{page.pageName}</p>
                <div className={styles.iconDiv}>
                    {
                        isHovered &&
                        <MdOutlineDelete
                            className={styles.addPageIcon}
                            size={iconSize}
                            onClick={(e) => handleDeletePage(e, page.id)}
                        />
                    }
                </div>
            </div>
        </div>
    );
}