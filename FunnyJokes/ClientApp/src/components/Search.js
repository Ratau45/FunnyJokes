import * as React from 'react';
import axios from 'axios';
import "../App.css";



export default function Categories() {
 

  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [chuck, setChuck] = React.useState([]);
  const [swapi, setSwapi] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:7272/search?query=${query}`);
      setData(res.data);
      setChuck(res.data.chuckApiReponse.result);
      setSwapi(res.data.swapiApiResponse.results);
      setLoading(false);
      
    };
    if (query.length === 0 || query.length > 2) fetchData();
    
  }, [query]);

 
  function Final() {

    if (chuck ==="null") {
  
      return(
        (swapi.map((user, index) => (
          <div className="card" key={index}>
          <div className="card__title">Name :{user.name}</div>
          <div className="card__body">
          <div className="paragraph">
              <p>Gender :{user.gender}</p>
              <p> Date of Birth :{user.birth_Year}</p>
          </div>
          <div className="p">
          <p> Height :{user.height}</p>
          <p> Mass :{user.mass}</p>
          </div>
          </div>
       {console.log(swapi)}
       </div>
         )))
      )
    } else{
      return(
      (chuck.map((user, index) => (
        <div className="card" key={index}>
        <div className="card__title">Catergory :{query}</div>
        <div className="card__body">
        <div className="paragraph">
            <p>Joke : {user.value}</p>
            <p> Date of Birth :{user.birth_Year}</p>
        </div>
        <div className="p">
        <p> Last Update :{user.updated_At}</p>
        <p> Mass :{user.mass}</p>
        </div>
        </div>
      
      </div>
        ))))
    }
    
  }
  

  return (
    <div>
      
      <div className="App">
      <h1>Search</h1>
      
      <input className="search-box"  onChange={(e) => setQuery(e.target.value)}  placeholder="Search..."/>
     
    
      </div>
      {loading ? (
                    <h4>Loading...</h4>) : 
      <div className="cards-container">
        
     {Final()}
      </div>
     //       {console.log([chuck.result])}

      }
    </div>
  );
}


