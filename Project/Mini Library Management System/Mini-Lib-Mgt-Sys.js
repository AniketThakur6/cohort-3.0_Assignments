const Books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    isBorrowed: true,
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    isBorrowed: false,
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    isBorrowed: true,
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isBorrowed: false,
  },
  {
    id: 5,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    isBorrowed: true,
  },
  {
    id: 6,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    isBorrowed: false,
  },
  {
    id: 7,
    title: "Ikigai",
    author: "Héctor García",
    isBorrowed: false,
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    isBorrowed: true,
  },
  {
    id: 9,
    title: "Can't Hurt Me",
    author: "David Goggins",
    isBorrowed: false,
  },
];

function addBook(title, author) {
  Books.push({
    id: Books.at(-1).id + 1,
    title: title,
    author: author,
    isBorrowed: false,
  });
  const lastBook = Books.at(-1);
  console.log(lastBook, "Book Added\n\n");

  // console.log(`${JSON.stringify(Books.at(-1), null, 2)} book added`)

  return;
}

function borrowBook(id) {
  let book = Books.find((book) => book.id === id);

  if (!book) {
    console.log("Book not found");
    return;
  }

  if (book.isBorrowed) {
    console.log("Book is already borrowed");
    return;
  }

  book.isBorrowed = true;
  console.log(book, "Books is Borrowed\n\n");

  return book;
}

function returnBook(id) {
  let book = Books.find((book) => book.id === id);
  

  if (!book.isBorrowed) {
    console.log("Book is already available");
    return;
}
  
  book.isBorrowed = false;

  console.log(book, "Books is Returned\n\n");

  return;
}

function showAvailableBooks() {
  Books.forEach((book) => {
    if ("isBorrowed" in book) {
      if (!book.isBorrowed) {
        console.log(`${book.id} : ${book.title} : ${book.author}`);
      }
    }
  });

  return;
}

addBook("Atomic Habits", "James Clear");
borrowBook(200);
returnBook(2);
showAvailableBooks();
