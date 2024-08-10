import React, { Component } from 'react';
import './NoteItem.css';

const NoteItem = ({note, index, getDelete}) => {
    return (
        <div className='note'>{note}
        <button className='delete' type='button' onClick={() => getDelete(index)}>Delete</button>
        </div>
    );
}

export default NoteItem;