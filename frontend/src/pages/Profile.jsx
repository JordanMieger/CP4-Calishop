import "../styles/profile.scss"

export default function Profile(){
    return (
        <div className="profile-page">
            <div className="profile-list">
                <button className="info-button"> MES INFORMATIONS </button>
                <button className="order-button"> MES COMMANDES </button>
                <button className="adress-button"> MES ADRESSES </button>
            </div>
            <div className="info-container">
                <h1>Boite à infos</h1>
            </div>  
        </div>
    )
};