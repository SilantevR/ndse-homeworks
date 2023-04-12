-  use booksbox
- 'switched to db booksbox'
- db.createCollection("books")
- { ok: 1 }
- db.books.insertMany([{
    "title": "1984",
    "description": "The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skillful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia.",
    "authors": "George Orwell",
    "favorite": true,
    "fileName": "",
    "fileCover": ""
    },
    { 
    "title": "The Da Vinci Code",
    "description": "Symbologist Robert Langdon travels from Paris to London to discover the truth behind a mysterious and bizarre murder. Later, he learns about a religious mystery protected by a secret society.",
    "authors": "Dan Brown", 
    "favorite": false, 
    "fileName": "", 
    "fileCover": ""
    }])
- {
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("643666f88fd70fd772e3be89"),
    '1': ObjectId("643666f88fd70fd772e3be8a")
  }
}
- db.books.find({"title": "1984"})
- {
  _id: ObjectId("643666f88fd70fd772e3be89"),
  title: '1984',
  description: 'The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skillful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia.',
  authors: 'George Orwell',
  favorite: true,
  fileName: '',
  fileCover: ''
}
- db.books.find({"title": "The Da Vinci Code"})
- {
  _id: ObjectId("643666f88fd70fd772e3be8a"),
  title: 'The Da Vinci Code',
  description: 'Symbologist Robert Langdon travels from Paris to London to discover the truth behind a mysterious and bizarre murder. Later, he learns about a religious mystery protected by a secret society.',
  authors: 'Dan Brown',
  favorite: false,
  fileName: '',
  fileCover: ''
}
- db.books.updateOne({"_id": ObjectId("643666f88fd70fd772e3be8a")}, {$set:{"description":"unknown", "authors": "unknown"}})
- {
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
- db.books.find({"_id": ObjectId("643666f88fd70fd772e3be8a")})
- {
  _id: ObjectId("643666f88fd70fd772e3be8a"),
  title: 'The Da Vinci Code',
  description: 'unknown',
  authors: 'unknown',
  favorite: false,
  fileName: '',
  fileCover: ''
}
