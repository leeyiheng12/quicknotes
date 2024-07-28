import React from 'react';
import styles from './Note.module.css';

import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

export default function Note({id, title, content, onTitleChange, onContentChange, deleteNote}) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transition,
        transform,
        isDragging,
      } = useSortable({ id: id, animateLayoutChanges: () => false });
    
    const [expanded, setExpanded] = React.useState(false);
    const [canEditTitle, setCanEditTitle] = React.useState(false);

    const handleHover = () => {
        setExpanded(true);
    }

    const handleLeave = () => {
        setExpanded(false);
    }

    const titleRef = React.useRef(null);

    // Effect to focus the input when shouldFocus state changes
    React.useEffect(() => {if (canEditTitle && titleRef.current) titleRef.current.focus()}, [canEditTitle]);

    const [titleVal, setTitleVal] = React.useState(title);
    const [contentVal, setContentVal] = React.useState(content);

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        if (newTitle.length > 20) return;
        setTitleVal(newTitle);
        onTitleChange(newTitle);
    }

    const handleContentChange = (event) => {
        setContentVal(event.target.value);
        onContentChange(event.target.value);
    }

    return (
        <div
            className={styles.container}
            style={{
                transition,
                transform: CSS.Transform.toString(transform),
                zIndex: isDragging ? 10 : 'auto',
                opacity: isDragging ? 0.3 : 1
            }}
            ref={setNodeRef}
        >
            <div {...listeners} {...attributes} className={styles.header}>

                {
                    canEditTitle
                        ? (<input
                            className={`${styles.title} ${styles.editableArea} ${styles.canEdit}`}
                            onChange={handleTitleChange} value={titleVal}
                            onBlur={() => setCanEditTitle(false)}
                            ref={titleRef}
                        />)
                        : (<p className={styles.title}>{titleVal}</p>)
                }
                
                <div className={styles.icons}>
                    <MdOutlineEdit className={styles.icon} onClick={() => setCanEditTitle(true)} />
                    <MdOutlineDelete className={styles.icon} onClick={deleteNote} />
                </div>
            </div>
            <div className={styles.textAreaDiv} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                <textarea
                    className={`${styles.textArea} ${styles.editableArea}`}
                    value={contentVal}
                    onChange={handleContentChange}
                />
            </div>
        </div>
    );
}
