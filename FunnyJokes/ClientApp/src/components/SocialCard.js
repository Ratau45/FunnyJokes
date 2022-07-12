import './SocialCard.css';


const SocialCard = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__title">Name :{userData.name}</div>
            <div className="card__body">
            <div className="paragraph">
                <p>Gender :{userData.gender}</p>
                <p> Date of Birth :{userData.birth_Year}</p>
            </div>
            <div className="p">
            <p> Height :{userData.height}</p>
            <p> Mass :{userData.mass}</p>
            </div>
            </div>

        </div>
    )
};

export default SocialCard;