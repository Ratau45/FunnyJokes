import * as React from 'react';
import axios from 'axios';
import "../App.css";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Categories() {
 
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [category, setCategory] = React.useState([])
  const [chuck, setChuck] = React.useState([]);
  
 
 

  React.useEffect(() => {
    fetch("chuck")
    .then(response => response.json())
      
    .then(data => setCategory(data))
    
    
  },[])

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:7272/search?query=${query}`);
      setData(res.data);
      setChuck(res.data.chuckApiReponse.result);
      setLoading(false);
      
    };
    if (query.length === 0 || query.length > 2) fetchData();
    
  }, [query]);

 
  
  return (
    <div>

      <div className="App">
      <h1>Choose Category</h1>
      <FormControl sx={{ m: 1, width: 800, mt: 3 }}>
      <InputLabel id="demo-multiple-name-label">Choose Category</InputLabel>
      <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
         // multiple
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {category.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, query, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    
     
    
      </div>
      {loading ? (
                    <h4>Loading...</h4>) : 
      <div className="cards-container">
        
        {(chuck.map((user, index) => (
        <div className="card" key={index}>
        <div className="card__title">Catergory :{query}</div>
        <div className="card__body">
        <div className="paragraph">
            <p>Joke : {user.value}</p>
            <p> Date of Birth :{user.birth_Year}</p>
        </div>
        <div className="p">
        <p> Last Update :{user.updated_At}</p>
        <p> Created At :{user.created_At}</p>
        </div>
        </div>
      
      </div>
        )))}
      </div>
     //       {console.log([chuck.result])}

      }
    </div>
  );
}


