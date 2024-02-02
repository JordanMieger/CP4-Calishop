import paralletes from "../../Assets/Images/Articles/ParalletesSmall.jpg"
import exemple from "../../Assets/Images/Articles/ParallettesDips.webp"
export default function ProductCard(){
    return (
        <div className="product-card-list">
            <div className="product-card">
                <img src={exemple} alt="product" className="product-image" />
                <div className="product-info">
                    <p className="product-name">Parallettes</p>
                    <p className="product-price">50 €</p>
                    <button type="button" className="basket-button"> Ajouter au panier</button>
                </div>
            </div>
            <div className="product-card">
                <img src={paralletes} alt="product" className="product-image" />
                <div className="product-info">
                    <p className="product-name">Parallettes</p>
                    <p className="product-price">50 €</p>
                    <button type="button" className="basket-button"> Ajouter au panier</button>
                </div>
            </div>
            <div className="product-card">
                <img src={paralletes} alt="product" className="product-image" />
                <div className="product-info">
                    <p className="product-name">Parallettes</p>
                    <p className="product-price">50 €</p>
                    <button type="button" className="basket-button"> Ajouter au panier</button>
                </div>
            </div>
            <div className="product-card">
                <img src={paralletes} alt="product" className="product-image" />
                <div className="product-info">
                    <p className="product-name">Parallettes</p>
                    <p className="product-price">50 €</p>
                    <button type="button" className="basket-button"> Ajouter au panier</button>
                </div>
            </div>
            <div className="product-card">
                <img src={paralletes} alt="product" className="product-image" />
                <div className="product-info">
                    <p className="product-name">Parallettes</p>
                    <p className="product-price">50 €</p>
                    <button type="button" className="basket-button"> Ajouter au panier</button>
                </div>
            </div>
            <div className="product-card">
                <img src={paralletes} alt="product" className="product-image" />
                <div className="product-info">
                    <p className="product-name">Parallettes</p>
                    <p className="product-price">50 €</p>
                    <button type="button" className="basket-button"> Ajouter au panier</button>
                </div>
            </div>
        </div>
    )
}