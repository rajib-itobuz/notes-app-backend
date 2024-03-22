import notesController from "../../controller/notes/notes.js";
import { verifyToken } from "../../middleware/verifyToken.js";


export const noteRoutes = (router) => {

    router.use(verifyToken);

    router.get('/search-notes', notesController.addNote);
    router.get('/updated-notes', notesController.findLatest);
    router.get('/get-notes', notesController.getNotes);
    router.get('/get-all-notes', notesController.getAllNotes);
    router.post('/add-note', notesController.addNote);
    router.post('/update-note', notesController.updateNote);
    router.post('/hide-notes', notesController.hideNotes);
    router.post('/show-notes', notesController.showNotes);
    router.post('/delete-notes', notesController.deleteNotes);
}