import { Star, StarFill } from "react-bootstrap-icons";

const renderRating = (point: number) => {
    const star = [];
    for(let i=1; i<=5; i++){
        if(i<=point) {
            star.push(<StarFill className="text-warning" />)
        }
        else {
            star.push(<Star className="text-secondary" />)
        }
    }
    return star;
}

export default renderRating;