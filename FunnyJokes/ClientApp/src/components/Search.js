import * as React from 'react';
import axios from 'axios';
import "../App.css";
import "./SocialCard.css"
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default function Categories() {
 

  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [chuck, setChuck] = React.useState([]);
  const [swapi, setSwapi] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(`/search?query=${query}`);
      setData(res.data);
      setChuck(res.data.chuckApiReponse);
      setSwapi(res.data.swapiApiResponse);
      setLoading(false);
      
    };
    if (query.length === 0 || query.length > 1) fetchData();
    
  }, [query]);

const theme = createTheme();
theme.typography.h3 = {
  fontSize: '1.2rem',
  fontFamily:'Roboto',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}

 
  function Final() {
let e = swapi.count;
    if (e !== 0) {
  let r = swapi.results
      return(
        (r?.map((user, index) => (
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
      let dd = chuck.result
      return(
      (dd?.map((user, index) => (
        <div className="card" key={index}>
        <div className="card__title">Catergory :{query}</div>
        <div className="card__body">
        <div className="paragraph">
            <p>Joke : {user.value}</p>
          
        </div>
        <div className="p">
        <p> Last Update :{user.updated_At}</p>
        
        </div>
        </div>
      
      </div>
        ))))
    }
    
  }
  

  return (
    <div>
       <ThemeProvider theme={theme}>
      <Typography variant="h3" align="center">Welcome To Funny Joke VS Star Wars</Typography>
    </ThemeProvider>
      <div className="App">
      
      
      <input className="search-box"  onChange={(e) => setQuery(e.target.value)}  placeholder="Search Category Or Star War Name..."/>
     
    
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


