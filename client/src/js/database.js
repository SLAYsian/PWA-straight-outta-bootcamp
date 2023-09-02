import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database ✅
export const postDb = async (content) => {
  console.log('POST to the database');

  // NOTES: Create connection to database
  const jateDb = await openDB('jate', 1);
  // NOTES: Create a transaction with database and database provileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // NOTES: Open up the desired object
  const store = tx.objectStore('jate');
  // NOTES: Put method to added the content
  const request = store.add({ content: content});
  // NOTES: Get confirmation of request
  const result = await request;
  console.log('result.value', result);
}

// TODO: Add logic for a method that gets all the content from the database ✅
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
//   return result;
return result.length ? result[result.length - 1].content : null;
}

initdb();
