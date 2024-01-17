import { useEffect, useState } from 'react';
import BookModel from "./../../../models/BookModel";
import CarouselItem from './CarouselItem';
import { getTheThreeNewestBook } from '../../../api/BookApi';

const Carousel: React.FC = () => {
    const [bookList, setBookList] = useState<BookModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    
    useEffect(() => {
        getTheThreeNewestBook().then(
            data => {
                setBookList(data.books);
                setLoading(false);
            }
        ).catch(
            error => {
                setLoading(false);
                setErr(error.message);
            }
        )
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (err) {
        return (
            <div>
                <h1>Gặp lỗi: {err}</h1>
            </div>
        );
    }

    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <CarouselItem book={bookList[0]} key={0} />
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem book={bookList[1]}  key={1} />
                    </div>
                    <div className="carousel-item" data-bs-interval="10000">
                        <CarouselItem book={bookList[2]}  key={2} />
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carousel;