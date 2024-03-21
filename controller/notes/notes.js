import { NotesApp } from "../../models/notes.js";
import jwt from "jsonwebtoken";

export const addNote = async (req, res) => {
    try {
        const { id } = jwt.decode(req.token)

        const { title, description } = req.body;
        if (title && description) {
            const note = await NotesApp.findOne({ title });
            if (note) {
                throw new Error("already exists")
            }

            const newNote = await NotesApp.create({ title, description, userId: id });
            if (newNote) {
                return res.status(200).json({ status: 200, message: "note created successfully", data: newNote });
            }
        } else
            throw new Error("missing fields")
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message, data: null });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { userId } = jwt.decode(req.token);

        if (!req.query.id) {
            throw new Error("id is missing")
        }

        const id = JSON.parse(req.query.id)

        const { title, description } = req.body;
        if (title || description) {
            const newUpdatedNote = await NotesApp.findOneAndUpdate({ _id: id, userId }, { title, description }, { returnOriginal: false });

            if (newUpdatedNote) {
                return res.status(200).json({ status: 200, message: "updated successfully", data: newUpdatedNote });
            }
        } else
            throw new Error("missing fields")
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message, data: null });
    }
}


export const searchNote = async (req, res) => {
    try {

        if (Object.keys(req.query).length > 0) {
            const { id } = jwt.decode(req.token)
            const queryText = JSON.parse(req.query.q);
            const data = await NotesApp.find({ title: { '$regex': queryText, '$options': 'i' }, userId: id })

            res.status(200).json({ status: 200, message: `search results in db for ${queryText}`, data })
        } else {
            throw new Error("missing query param")
        }
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message, data: null });
    }
}

export const findLatest = async (req, res) => {
    try {
        if (Object.keys(req.query).length > 0) {
            const { id } = jwt.decode(req.token)
            const itemCount = JSON.parse(req.query.items);
            const data = await NotesApp.find({ userId: id }, {}, { sort: { updatedAt: -1 } })

            return res.status(200).json({ status: 200, message: `last udpated notes @ ${itemCount}`, data: data.slice(0, itemCount) })
        } else {
            throw new Error("missing query param")
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message, data: null });
    }
}

export const hideNotes = async (req, res) => {
    try {
        const { itemIds } = req.body;
        if (itemIds.length > 0) {
            const { id } = jwt.decode(req.token)
            const data = await NotesApp.updateMany({ userId: id, _id: { $in: itemIds } }, { isHidden: true }, { returnOriginal: false })
            return res.status(200).json({ status: 200, message: `udpated notes`, data })

        } else {
            throw new Error("id missing/empty")
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message, data: null });
    }
}

export const showNotes = async (req, res) => {
    try {
        const { itemIds } = req.body;
        if (itemIds.length > 0) {
            const { id } = jwt.decode(req.token)
            const data = await NotesApp.updateMany({ userId: id, _id: { $in: itemIds } }, { isHidden: false }, { returnOriginal: false })
            return res.status(200).json({ status: 200, message: `udpated notes`, data })

        } else {
            throw new Error("id missing/empty")
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message, data: null });
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const { itemIds } = req.body;
        if (itemIds.length > 0) {
            const { id } = jwt.decode(req.token)
            const data = await NotesApp.deleteMany({ userId: id, _id: { $in: itemIds } })
            return res.status(200).json({ status: 200, message: `udpated notes`, data })

        } else {
            throw new Error("id missing/empty")
        }
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message, data: null });
    }
}

export const getNotes = async (req, res) => {
    try {

        const { id } = jwt.decode(req.token)
        const data = await NotesApp.find({ userId: id, isHidden: false })

        res.status(200).json({ status: 200, message: `shown notes`, data })
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message, data: null });
    }
}


export const getAllNotes = async (req, res) => {
    try {

        const { id } = jwt.decode(req.token)
        const data = await NotesApp.find({ userId: id })

        res.status(200).json({ status: 200, message: `all notes`, data })
    } catch (err) {
        res.status(400).json({ status: 400, message: err.message, data: null });
    }
}