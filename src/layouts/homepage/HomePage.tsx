import ProductList from "../product/ProductList";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import { useParams } from "react-router-dom";

interface HomePageProps {
    keyword: string;
}
function HomePage({ keyword }: HomePageProps) {
    const { categoryId } = useParams();
    let cateId = 0;

    try {
        cateId = parseInt(categoryId +'');
    } catch (error) {
        cateId = 0;
        console.log(error);
    }

    if(isNaN(cateId)) {
        cateId = 0;
    }

    return (
        <div>
            <Banner />
            <Carousel />
            <ProductList keyword={keyword} categoryId={cateId}/>
        </div>
    );
}

export default HomePage;