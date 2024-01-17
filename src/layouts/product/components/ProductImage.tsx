import { useEffect, useState } from 'react';
import ImageModel from '../../../models/ImageModel';
import { getAllImageByBook } from '../../../api/ImageApi';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ProductImageProps {
    bookId: number;
}

function ProductImage({ bookId }: ProductImageProps) {
    const [imageList, setImageList] = useState<ImageModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        getAllImageByBook(bookId).then(
            data => {
                setImageList(data);
                setLoading(false);
            }
        ).catch(
            error => {
                setLoading(false);
                setErr(error.message);
            }
        )
    }, [bookId]);

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
        <div className='row'>
            <div className='col-12'>
                <Carousel>
                    {imageList.map((image, index) => (
                        <div key={index}>
                            <img src={image.dataImage} alt={image.imageName} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default ProductImage;