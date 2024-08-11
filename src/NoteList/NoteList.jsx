import React, { Component } from 'react';
import styles from './NoteList.module.css';

class NoteList extends Component {
  
  #title = '';

  set title(title) {
    this.#title = title.replace(/\d|\s/g, '');
  }

  get title() {
    return `***${this.#title}***`;
  }
  
  render() {
    this.title = this.props.title;

    return (
      <div className={styles.notes}>
        <h2>{this.title}</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default NoteList;