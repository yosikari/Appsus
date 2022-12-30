import { noteService } from "../services/note.service.js"
import { NoteImg } from "../views/note-img.jsx"
import { utilService } from "../../../services/util.service.js"
import { TodoCreate } from "../cmps/todo-create.js"


const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM



export function NoteTodo(props) {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNoteTodo())
  const navigate = useNavigate()
  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState([])
  const [todos, setTodos] = useState([])
  const { noteId } = useParams()

  useEffect(() => {
    if (!noteId) return
    loadNote()
  }, [])

  function loadNote() {
    noteService.get(noteId)
      .then((note) => setNoteToEdit(note))
      .catch((err) => {
        console.log('Had issues in note details', err)
        navigate('/note')
      })
  }
  function handleChange({ target }) {
    let { value, type, name: field } = target
    //     value = type === 'number' ? +value : value

    setNoteToEdit((prevNoteToEdit) => {
      if (field === 'todos-label') {
        return {
          ...prevNoteToEdit,
          info: { ...prevNoteToEdit.info, label: value },
          // style: { backgroundColor: colorPicker }
        }
      }
      if (field === 'todos1') {

      }
      if (field === 'checkbox') {
        return {
          ...prevNoteToEdit,
          // info: { ...prevNoteToEdit.info, txt: value },
          isPinned: true
        }
      }
      if (field === 'colors') {
        return {
          ...prevNoteToEdit,
          // info: { ...prevNoteToEdit.info, txt: value },
          style: { backgroundColor: value }
        }
      }
      // if (field === 'item') {
      //   let item = {
      //     id: utilService.makeId(),
      //     txt: newItem,
      //     doneAt: 187111111
      //   }
      //   return {
      //     ...prevNoteToEdit,
      //     info: { ...prevNoteToEdit.info, todos: [...todos, value] },
      //     isPinned: true
      //   }
      // }
    })
  }
  // <input
  //   type="text"
  //   name="item"
  //   placeholder="Add an item..."
  //   value={newItem}
  //   onChange={handleChange}
  // // onChange={(e) => setNewItem(e.target.value)}
  // />


  // <button onClick={() => addItem()}>Add</button>
  // function addItem() {
  //   if (!newItem) return
  //   console.log('new', newItem)
  //   let item = {
  //     id: utilService.makeId(),
  //     txt: newItem,
  //     doneAt: 187111111
  //   }
  //   setItems(prevItems => [...prevItems, newItem])
  //   setNewItem('')

  // }

  function addItems(items) {
    console.log(items)
    console.log(noteToEdit)
    setNoteToEdit(prevNote => ({
      ...prevNote, info: {
        ...prevNote.info,
        todos: [...prevNote.info.todos, ...items]
      }
    }))
    //items
  }
  function onSaveNote(ev) {
    ev.preventDefault()
    console.log(noteToEdit)
    noteService.save(noteToEdit).then(() => props.loadNotes())
    // showSuccessMsg('note saved!')
    navigate('/note')
  }
  return <div className="note-input-txt-card">
    <form className="note-add-card" onSubmit={onSaveNote}>
      {/* <label htmlFor="todos-label">Label your todos : </label> */}
      <input type="text"
        name="todos-label"
        id="todos-label"
        placeholder="Your list name..."
        value={noteToEdit.info.label}
        onChange={handleChange}
      />
      <TodoCreate todos={todos} addItems={addItems} />



      <select onChange={handleChange} name="colors" id="colors" multiple>
        <option style={{ backgroundColor: '#fbf8cc' }} value="#fbf8cc"></option>
        <option style={{ backgroundColor: '#fde4cf' }} value="#fde4cf"></option>
        <option style={{ backgroundColor: '#ffcfd2' }} value="#ffcfd2"></option>
        <option style={{ backgroundColor: '#f1c0e8' }} value="#f1c0e8"></option>
        <option style={{ backgroundColor: '#cfbaf0' }} value="#cfbaf0"></option>
        <option style={{ backgroundColor: '#a3c4f3' }} value="#a3c4f3"></option>
        <option style={{ backgroundColor: '#90dbf4' }} value="#90dbf4"></option>
        <option style={{ backgroundColor: '#8eecf5' }} value="#8eecf5"></option>
        <option style={{ backgroundColor: '#98f5e1' }} value="#98f5e1"></option>
        <option style={{ backgroundColor: '#b9fbc0' }} value="#b9fbc0"></option>
      </select>

      <label>
        <input
          type="checkbox"
          name="checkbox"
          value={noteToEdit.isPinned}
          onChange={handleChange}
        />
        pinned?
      </label>

      <div >

        <button>{noteToEdit.id ? <i class="fa-regular fa-down-to-bracket"></i> : <i class="fa-regular fa-plus"></i>}</button>
        <button onClick={(e) => handlePinned}> <Link to="/note"><i class="fa-sharp fa-solid fa-xmark"></i></Link> </button>
        <button><i class="fa-sharp fa-solid fa-map-pin"></i></button>

      </div>
    </form >

  </div >
}