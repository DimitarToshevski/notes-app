const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => 'notes';

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(n => n.title === title);

  if (!duplicateNote) {
    notes.push({ title, body });

    saveNotes(notes);

    console.log(chalk.green.inverse('New note added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const filteredNotes = notes.filter(n => n.title !== title);

  if (filteredNotes.length !== notes.length) {
    saveNotes(filteredNotes);
    console.log(
      chalk.green.inverse('Successfully removed note with a title: ') +
        chalk.bgGreen.yellow(title + ' ')
    );
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(n => n.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes:'));

  notes.forEach(n => {
    console.log(n.title);
  });
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes,
  addNote,
  removeNote,
  readNote,
  listNotes
};
