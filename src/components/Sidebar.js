import React from 'react';
import styles from './Sidebar.module.css';
import useNotes from '../store';
import SidebarPageEntries from './SidebarPageEntries';

import { MdOutlineAdd } from "react-icons/md";

const iconSize = 20;

export default function Sidebar() {
    
    const [, noteActions] = useNotes();

    return (
        <div className={`signika-negative-light ${styles.container}`}>

            <div className={styles.logoDiv}>
                <p className={styles.logoText}>Notes!</p>
            </div>

            <div className={styles.pageNames}>

                <div className={styles.row}>
                    <p className={styles.pageHeaderText}>Pages</p>
                    <div className={styles.iconDiv}>
                        <MdOutlineAdd
                            className={styles.addPageIcon}
                            size={iconSize}
                            onClick={() => noteActions.createPage()}
                        />
                    </div>
                </div>

                <SidebarPageEntries />
            </div>
        </div>
    );
}