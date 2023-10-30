import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";



export default function BookManagement(){

  const DEFAULT_BOOK = {title: '', author: '', id:-1, isbn: '' };
  const[books, setBooks] = useState([])
   const[book, setBook] =useState(DEFAULT_BOOK);
   const[view, setView] = useState('list')

 useEffect(()=>{
       LoadBooks();
 },[])

 function FormBook(){
  return(
    <div className="container mt-5">
        <div className="row">
           <div className="col-12">
    <h1>Book Form</h1>
    <input
       type="text"
       name="title"
       placeholder="title"
       className="form control mb-3"
       onInput={e => handleInput(e)}
       value={book.title}
      />
      <input
       type="text"
       name="isbn"
       placeholder="isbn"
       className="form control mb-3"
       onInput={e => handleInput(e)}
       value={book.isbn}
      />
      <input
       type="text"
       name="author"
       placeholder="author"
       className="form control mb-3"
       onInput={e => handleInput(e)}
       value={book.author}
      />
      <button onClick={()=> submitForm()} className="btn btn-primary" >
        {book.id === -1 ? 'Create' : 'Update'}
      </button>
      
           </div>
        </div>
    </div>

     
  
  )
 }

 function LoadBooks(){
    axios.get(API_URL + 'books')
    .then(response =>{
        setBooks(response.data);
    })
 }

 function createBook(){
    setView('form');
    setBook(DEFAULT_BOOK);
 }

 function submitForm(){
  //books-POST
  //books/{id}-POST

  const url= book.id === -1 ? `${API_URL}books`: `${API_URL}books\\${book.id}`;
  axios.post(url, book)
  .then( response =>{
         LoadBooks();
         setView('list');
  })
    
 }
 function deleteBook(id){
   axios.delete(`${API_URL}books\\${id}`)
   .then(response =>{
       LoadBooks()
   })
 }

 function EditBook(b){
  setBook(b);
  setView('form')

 }


 function handleInput(event){
  const {name, value} = event.target;
  setBook({ ...book, [name]: value})
 }



 function  showList(){
   return(
    <div className="container mt-5">
        <div className="row">
            <div className="col-12">
              <button className="btn btn-success mb-3" onClick={()=> createBook()}>
                Create
              </button>
                <table className="table table-bordered">
                  <thead>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Options</th>
                  </thead>
                  <tbody>
                    {books.map(b=>(
                        <tr>
                            <td>{b.id}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.isbn}</td>
                            {/* <td>{b.options}</td> */}
                            <td>
                                <button onClick={()=> EditBook(b)} className="btn btn-warning  me-3 text-white">
                                <i className="fa fa-pencil"></i>
                                </button>
                                <button onClick={()=> deleteBook(b.id)} className="btn btn-danger text-white">
                                    <i className="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
    </div>
   )
 }
    
 return(
      <>
       { view === 'list'? showList() : FormBook()}
    </>
 )
}
