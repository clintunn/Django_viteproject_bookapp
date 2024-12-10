import React, { useEffect } from 'react'
import { useState } from 'react'

function book() {

    const [books, setBooks] = useState([]); // This is a hook we used to store data retrieved from the backend (Api response data) and for it to be accessible from the frontend
    //
    const [title, setTitle] = useState("");
    const [releaseYear, setReleaseYear] = useState(0);
    const [newTitle, setNewTitle] = useState("");


    useEffect( () => { //This use effect executes whenever the page is rendered
        fetchBooks();
    }, []);


    // This means due to the use effect the fetchBooks function below is executed

    const fetchBooks = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/books/");
            const data = await response.json();
            setBooks(data);// This sets the books state ( books = data ), data is the data we get back from the API
        }
        catch (err) {
            console.log(err);
        }
    }

    const addBook = async () => {
        const bookData = {
            title: title, // could be just (title,) because the name in the frontend useState hook is the same as the one in the backed model
            release_year: releaseYear
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });
            const data = await response.json()
            setBooks((prev) => [...prev, data]);
            console.log(data);
        }catch (err) {
            console.log(err)
        }
    }

    const updateTitle = async(pk, release_year) => {
        const bookData = {
            title: newTitle, // could be just (title,) because the name in the frontend useState hook is the same as the one in the backed model
            release_year
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });
            const data = await response.json()
            setBooks((prev) => 
                prev.map((book) => {
                    if (book.id ===pk ) {
                        return data;
                    } else {
                        return book;
                    }
                })
            );
        }catch (err) {
            console.log(err)
        }        
    }

    const deleteBook = async (pk) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
                method : "DELETE"
            })
            setBooks((prev) => prev.filter((book) => book.id !== pk))
        } catch (err) {
            console.log(e)
        }
    }

  return (
    <div>
    <h1>Book Website</h1>
    <div>
      <input type='text' placeholder='BooK Title...' onChange={(e) => setTitle(e.target.value)} />
      <input type='number' placeholder='Release Year...' onChange={(e) => setReleaseYear(e.target.value)} />
      <button onClick={addBook}> Add Book </button>
    </div>
    {books.map((book) => (
        <div>
            <p>Title: {book.title}</p>
            <p>Release Year: {book.release_year}</p>
            <input type='text' placeholder='New Title' onChange={(e) => setNewTitle(e.target.value)} />
            <button onClick={() => updateTitle(book.id, book.release_year)}> Change Title </button>
            <button onClick={() => deleteBook(book.id)}> Delete </button>
        </div>
    ))}
    </div>
  )
}

export default book