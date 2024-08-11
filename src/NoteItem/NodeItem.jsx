import React, { Component } from 'react';
import styles from './NoteItem.module.css';

const NoteItem = ({note, index, getDelete}) => {
    return (
        <div className={styles.note}>{note}
        <button className={styles.delete} type='button' onClick={() => getDelete(index)}>Delete</button>
        </div>
    );
}

export default NoteItem;