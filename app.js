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

		// Setting books to the array
		const books = StoredBooks;

		// Looping through the books in the array and calling method addBookToList() which doesn't exist yet
		books.forEach((book) => UI.addBookToList(book));
	}

	// Creating a row to put into the tbody of book-list
	static addBookToList(book) {
		// Grabbing list from the DOM
		const list = document.querySelector("#book-list");

		// Creating new row
		const row = document.createElement("tr");

		row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete>X</a></td>
        `;

		// Appending new row to the list
		list.appendChild(row);
	}
}

// Store Class: Handles Storage

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
	// Prevent actual submit
	e.preventDefault();

	// Get form values
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const isbn = document.querySelector("#isbn").value;

	// Instantiate book
	const book = new Book(title, author, isbn);

	console.log(book);
});

// Event: Remove a Book
