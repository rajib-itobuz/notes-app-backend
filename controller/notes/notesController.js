import { NotesApp } from "../../models/notes.js";
import jwt from "jsonwebtoken";

class notesController {
    async addNote(req, res, next) {
        try {
            const { id } = jwt.decode(req.token)

            let { title, description } = req.body;



            if (title && description) {
                title = title.trim();
                description = description.trim();
                const note = await NotesApp.findOne({ title });
                if (note) {
                    throw new Error("already exists")
                }

                const newNote = await NotesApp.create({ title, description, userId: id });
                if (newNote) {
                    return res.status(200).send({ status: 200, message: "note created successfully", data: newNote });
                }
            } else
                throw new Error("missing fields")
        } catch (err) {
            next(err);
        }
    }

    async updateNote(req, res, next) {
        try {
            const { userId } = jwt.decode(req.token);

            if (!req.query.id) {
                throw new Error("id is missing")
            }

            const id = JSON.parse(req.query.id)

            let { title, description } = req.body;



            if (title || description) {
                title = title.trim();
                description = description.trim();
                const newUpdatedNote = await NotesApp.findOneAndUpdate({ _id: id, userId }, { title, description }, { returnOriginal: false });

                if (newUpdatedNote) {
                    return res.status(200).send({ status: 200, message: "updated successfully", data: newUpdatedNote });
                }
            } else
                throw new Error("missing fields")
        } catch (err) {
            next(err);
        }
    }

    async searchNote(req, res, next) {
        try {

            if (Object.keys(req.query).length > 0) {
                const { id } = jwt.decode(req.token)
                const queryText = JSON.parse(req.query.q);
                const data = await NotesApp.find({ title: { '$regex': queryText, '$options': 'i' }, userId: id })

                res.status(200).send({ status: 200, message: `search results in db for ${queryText}`, data })
            } else {
                throw new Error("missing query param")
            }
        } catch (err) {
            next(err);
        }
    }

    async findLatest(req, res, next) {
        try {
            if (Object.keys(req.query).length > 0) {
                const { id } = jwt.decode(req.token)
                const itemCount = JSON.parse(req.query.items);
                const data = await NotesApp.find({ userId: id }, {}, { sort: { updatedAt: -1 } })

                return res.status(200).send({ status: 200, message: `last udpated notes @ ${itemCount}`, data: data.slice(0, itemCount) })
            } else {
                throw new Error("missing query param")
            }
        } catch (err) {
            next(err);
        }
    }

    async hideNotes(req, res, next) {
        try {
            const { itemIds } = req.body;
            if (itemIds.length > 0) {
                const { id } = jwt.decode(req.token)
                const data = await NotesApp.updateMany({ userId: id, _id: { $in: itemIds } }, { isHidden: true }, { returnOriginal: false })
                return res.status(200).send({ status: 200, message: `udpated notes`, data })

            } else {
                throw new Error("id missing/empty")
            }
        } catch (err) {
            next(err);
        }
    }

    async showNotes(req, res, next) {
        try {
            const { itemIds } = req.body;
            if (itemIds.length > 0) {
                const { id } = jwt.decode(req.token)
                const data = await NotesApp.updateMany({ userId: id, _id: { $in: itemIds } }, { isHidden: false }, { returnOriginal: false })
                return res.status(200).send({ status: 200, message: `udpated notes`, data })

            } else {
                throw new Error("id missing/empty")
            }
        } catch (err) {
            next(err);
        }
    }

    async deleteNotes(req, res, next) {
        try {
            const { itemIds } = req.body;
            if (itemIds.length > 0) {
                const { id } = jwt.decode(req.token)
                const data = await NotesApp.deleteMany({ userId: id, _id: { $in: itemIds } })
                return res.status(200).send({ status: 200, message: `udpated notes`, data })

            } else {
                throw new Error("id missing/empty")
            }
        } catch (err) {
            next(err);
        }
    }

    async getNotes(req, res, next) {
        try {

            const { id } = jwt.decode(req.token)
            const data = await NotesApp.find({ userId: id, isHidden: false })

            res.status(200).send({ status: 200, message: `shown notes`, data })
        } catch (err) {
            next(err);
        }
    }

    async getAllNotes(req, res, next) {
        try {

            const { id } = jwt.decode(req.token)
            const data = await NotesApp.find({ userId: id })

            res.status(200).send({ status: 200, message: `all notes`, data })
        } catch (err) {
            next(err);
        }
    }
}



export default new notesController();