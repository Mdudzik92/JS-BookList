// Book Class: Represents a Book
class Book {
	// Constructor is a method that runs when instantiating a book. It's going to take in all the fields
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class: Handle UI Tasks
class UI {
    // Hard coded array of books prior to invoking local storage use
	static displayBooks() {
		const StoredBooks = [
			{
				title: "Book One",
				author: "John Doe",
				isbn: "3434434",
			},
			{
				title: "Book Two",
				author: "Jane Doe",
				isbn: "45545",
			},
		];

		const books = StoredBooks;

        // Looping through the books in the array and calling method addBookToList() which doesn't exist yet
        books.forEach(function((book) => UI.addBookToList(book));
	}
}

