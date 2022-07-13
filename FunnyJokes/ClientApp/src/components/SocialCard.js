//import './SocialCard.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
const SocialCard = ({ userData }) => {
    return (


<div>
<Card style={{ width: '30rem' }} border="success">
      <Card.Header className="mb-2 text-muted">{userData.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Gender : {userData.gender}</ListGroup.Item>
        <ListGroup.Item>Date Of Birth : {userData.birth_Year}</ListGroup.Item>
        <ListGroup.Item>Height : {userData.height}</ListGroup.Item>
      </ListGroup>
      <Card.Text className="mb-2 text-muted">Mass :{userData.mass}</Card.Text>
    </Card>

</div>



        
       
    )
};

export default SocialCard;