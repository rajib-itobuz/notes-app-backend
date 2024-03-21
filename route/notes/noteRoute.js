import { addNote, deleteNotes, findLatest, getAllNotes, getNotes, hideNotes, searchNote, showNotes, updateNote } from "../../controller/notes/notes.js";
import { verifyToken } from "../../middleware/verifyToken.js";


export const noteRoutes = (router) => {

    router.use(verifyToken);

    router.get('/search-notes', searchNote);
    router.get('/updated-notes', findLatest);
    router.get('/get-notes', getNotes);
    router.get('/get-all-notes', getAllNotes);
    router.post('/add-note', addNote);
    router.post('/update-note', updateNote);
    router.post('/hide-notes', hideNotes);
    router.post('/show-notes', showNotes);
    router.post('/delete-notes', deleteNotes);
}