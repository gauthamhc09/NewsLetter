// import { MongoClient } from 'mongodb'
import { connectDatabase, getDocument, insertDocument } from '../../../helpers/db-util';

async function handler(req, res) {

    const { eventId } = req.query;

    let client;

    try {
        client = await connectDatabase()
    } catch (err) {
        res.status(500).json({ message: 'connecting to database failed!' });
        return;
    }

    if (req.method === 'POST') {

        const { email, name, text } = req.body;

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid input.' });
            // client.close();
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        }

        let result;
        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Received Comments', comments: newComment });
        } catch (err) {
            res.status(500).json({ message: 'Failed to add comment to database!' })
        }
    }

    if (req.method === 'GET') {
        try {
            const documents = await getDocument(client, 'comments')
            res.status(200).json({ comments: documents })
        } catch (err) {
            res.status(500).json({ message: 'Getting comments failed!' })
        }

    }
    // client.close()
}

export default handler