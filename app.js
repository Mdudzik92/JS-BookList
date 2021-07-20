// Book Class: Represents a Book
class Book {
	// constructor is a method that runs when instantiating a book. It's going to take in all the fields
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
		// Setting books to the array
		const books = Store.getBooks();

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
          <td><button type="button" class="btn btn-danger btn-sm delete"><a href="#">X</a></button></td>
        `;

		// Appending new row to the list
		list.appendChild(row);
	}

	static deleteBook(el) {
		if (el.classList.contains("delete")) {
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement("div");
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));
		const container = document.querySelector(".container");
		const form = document.querySelector("#book-form");
		container.insertBefore(div, form);
		// Vanish in 3 seconds
		setTimeout(() => document.querySelector(".alert").remove(), 3000);
	}

	static clearFields() {
		document.querySelector("#title").value = "";
		document.querySelector("#author").value = "";
		document.querySelector("#isbn").value = "";
	}
}

// Store Class: Handles Storage
class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}

		return books;
	}

	static addBook(book) {
		const books = Store.getBooks();

		books.push(book);

		localStorage.setItem("books", JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = Store.getBooks();

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem("books", JSON.stringify(books));
	}
}

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

	// Validate
	if (title === "" || author === "" || isbn === "") {
		UI.showAlert("Please fill in all fields", "danger");
	} else {
		// Instantiate book
		const book = new Book(title, author, isbn);

		// Add Book to UI
		UI.addBookToList(book);

		// Add book to store
		Store.addBook(book);

		// Show success message
		UI.showAlert("Book Added", "success");

		// Clear fields after submit
		UI.clearFields();
	}
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
	// Remove book from UI
	UI.deleteBook(e.target);

	// Remove book from store. Does this by grabbing the table data above the target (the X being the target) which is the parentElement, and grabbing IT'S previousElementSibling's text content, which is the ISBN needed to locate the item in local storage.
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// Show success message
	UI.showAlert("Book Removed", "success");
});
