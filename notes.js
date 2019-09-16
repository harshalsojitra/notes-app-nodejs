const fs = require('fs')

const chalk = require('chalk')

const addNote =  (title, body) => {
    const notes = loadNotes()
 
    const duplicateNote = notes.find((note) => note.title === title)

    debugger 

    if(!duplicateNote) {
        //data loaded successfully.
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note is added!')
} else console.log('Note title is already added!')}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}
 
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note note added'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('Note title taken'))
        console.log(notes)
    }
} 

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const notes = loadNotes()

    const findNote = notes.find((note) => note.title === title)

    if(findNote) {  
        console.log(chalk.inverse(findNote.title))
        console.log(findNote.body)
    } else {
        console.log(chalk.red.inverse('sorry not found'))
    }
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}