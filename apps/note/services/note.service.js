console.log('Hi from note service')
import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
const NOTE_KEY = 'noteDB'
_createNotes()
export const noteService = {
  query
}

function query() {
  return storageService.query(NOTE_KEY)
}
function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}
function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      //   {
      //   id: "n101",
      //   type: "note-txt",
      //   isPinned: true,
      //   info: {
      //     txt: "Fullstack me Baby!"
      //   }
      // }, 
      {
        id: "n102",
        type: "note-img",
        info: {
          url: "../../../img/cruise.jpg",
          title: "our cruise",
        },
        style: {
          backgroundColor: "#00d"
        }
      },
      {
        id: "n104",
        type: "note-img",
        info: {
          url: "../../../img/maldives.jpg",
          title: "our vacation",
        },
        style: {
          backgroundColor: "#00d"
        }
      },
      //  {
      //   id: "n103",
      //   type: "note-todo",

      //   info: {
      //     label: "go to a vacation",
      //     todos: [
      //       { txt: "Driving liscence", doneAt: null },
      //       { txt: "Coding power", doneAt: 187111111 }
      //     ]
      //   },

      // }


    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

