import "../styles/home.scss"
import Banner from "../../Assets/Images/Bannercut.jpg"
import ProductCard from "../components/ProductCard"

export default function Home(){
    return (
    <>
        <div className="banner">
            <img src={Banner} alt="Getfit" className="banner"></img>
        </div>
        <div className="filter-button">
            <button type="button" className="buttons"> Paralletes </button>
            <button type="button" className="buttons"> Accessoires </button>
            <button type="button" className="buttons"> Equipements </button>
        </div>
        <div>
            <ProductCard />
        </div>
    </>
    )
};
