import { useState, FormEvent } from 'react';
import BookModel from '../../models/BookModel';

function BookForm() {
    const [book, setBook] = useState<BookModel>({
        bookId: 0,
        bookName: '',
        bookDesc: '',
        author: '',
        listPrice: 0,
        sellPrice: 0,
        quantity: 0,
        avgRating: 0,
        isbn: ''
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/books',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(book)
            }
        ).then((reponse) => {
            if (reponse.ok) {
                alert("Đã thêm sách thành công!");
                setBook({
                    bookId: 0,
                    bookName: '',
                    bookDesc: '',
                    author: '',
                    listPrice: 0,
                    sellPrice: 0,
                    quantity: 0,
                    avgRating: 0,
                    isbn: ''
                })
            } else {
                alert("Gặp lỗi trong quá trình thêm sách!");
            }
        })
    }

    return (
        <div className='container row d-flex align-item-center justify-content-center'>
            <div className='col-6'>
                <h1>Thêm sách mới</h1>
                <form onSubmit={handleSubmit} className='form'>
                    <input type='hidden' id='bookId' value={book.bookId} />

                    <label htmlFor='bookName'>Tên sách</label>
                    <input
                        className='form-control mb-2'
                        type='text'
                        id='bookName'
                        value={book.bookName}
                        onChange={(e) => setBook({ ...book, bookName: e.target.value })}
                        required
                    />

                    <label htmlFor='listPrice'>Giá niêm yết</label>
                    <input
                        className='form-control mb-2'
                        type='number'
                        id='listPrice'
                        value={book.listPrice}
                        onChange={(e) => setBook({ ...book, listPrice: parseFloat(e.target.value) })}
                    />

                    <label htmlFor='sellPrice'>Giá bán</label>
                    <input
                        className='form-control mb-2'
                        type='number'
                        id='sellPrice'
                        value={book.sellPrice}
                        onChange={(e) => setBook({ ...book, sellPrice: parseFloat(e.target.value) })}
                        required
                    />

                    <label htmlFor='quantity'>Số lượng</label>
                    <input
                        className='form-control mb-2'
                        type='number'
                        id='quantity'
                        value={book.quantity}
                        onChange={(e) => setBook({ ...book, quantity: parseInt(e.target.value) })}
                        required
                    />

                    <label htmlFor='author'>Tên tác giả</label>
                    <input
                        className='form-control mb-2'
                        type='text'
                        id='author'
                        value={book.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                        required
                    />

                    <label htmlFor='bookDesc'>Mô tả</label>
                    <input
                        className='form-control mb-2'
                        type='text'
                        id='bookDesc'
                        value={book.bookDesc}
                        onChange={(e) => setBook({ ...book, bookDesc: e.target.value })}
                    />

                    <label htmlFor='isbn'>ISBN</label>
                    <input
                        className='form-control mb-2'
                        type='text'
                        id='isbn'
                        value={book.isbn}
                        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                        required
                    />
                    <button className='btn btn-primary mt-2' type='submit'>Lưu</button>
                </form>
            </div>
        </div>
    )
}

export default BookForm;