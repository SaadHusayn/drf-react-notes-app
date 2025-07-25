import { useEffect, useState } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note Deleted!")
                else alert("Failed to delete note")
                getNotes();
            })
            .catch((err) => alert(err))
    }

    const createNote = (e) => {
        e.preventDefault();

        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note Created!")
                else alert("Failed to create Note")
                getNotes();
            })
            .catch((err) => alert(err))

    }


    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
        </div>
        <div>
            <h2>Create a note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="content">Content:</label>
                <textarea
                    type="text"
                    name="content"
                    id="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <input type="submit" value="Create" ></input>
            </form>
        </div>
    </div>
}

export default Home