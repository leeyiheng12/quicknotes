import React from 'react';

import styles from './MainPage.module.css';

import NavBar from './Navbar';
import NotesPage from './NotesPage';
import Sidebar from './Sidebar';


export default function MainPage() {

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>

            <div className={styles.main}>
                <NavBar />
                <NotesPage />
            </div>

        </div>
    );
}
