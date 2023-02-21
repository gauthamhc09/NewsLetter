import { MongoClient } from 'mongodb'

export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://user01:user01@cluster0.qbr95jh.mongodb.net/?retryWrites=true&w=majority')
    return client;
}

export async function insertDocument(client, collection, document) {
    const db = await client.db('events')
    const result = await db.collection(collection).insertOne(document)
    console.log('inserting to the db', result);

    return result;
}

export async function getDocument(client, collection) {
    const db = await client.db('events')
    const documents = await db.collection(collection).find().sort({ _id: -1 }).toArray()
    // console.log('Documents', documents)
    return documents
}