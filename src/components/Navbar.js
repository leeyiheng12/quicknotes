import React from 'react';
import styles from './Navbar.module.css';
import useNotes from '../store';

export default function NavBar() {
    
    const [noteState, noteActions] = useNotes();
    const currentPageId = noteState.currentPageId;
    const [pageName, setPageName] = React.useState(noteState.currentPageName);
    React.useEffect(() => {
        setPageName(noteState.currentPageName);
    }, [noteState.currentPageName]);  // no choice but to use this effect
    
    const handleEditPageName = (event) => {
        if (event.target.value.length > 20) return;
        setPageName(event.target.value);
        noteActions.writePageName(currentPageId, event.target.value);
    }

    return (
        <div className={styles.header}>
            <input className={styles.title} value={pageName} onChange={handleEditPageName} />
        </div>
    );
}
