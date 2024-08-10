import React, { Component } from 'react';
import './NoteList.css';

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
      <div>
        <h2>{this.title}</h2>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default NoteList;