import * as React from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Card from 'react-bootstrap/Card';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      const res = await axios.get(`/search?query=${query}`);
      setData(res.data);
      setChuck(res.data.chuckApiReponse.result);
      setLoading(false);
      
    };
    if (query.length === 0 || query.length > 2) fetchData();
    
  }, [query]);

 
  
  return (
    <div>
<ThemeProvider theme={theme}>
      <Typography variant="h3" align="center">Laugh A little With Chuck Norris</Typography>
    </ThemeProvider>
      <div className="App">
      
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
       <Card style={{ width: '30rem' }} key={index}  border="primary">
      <Card.Body>
      
        <Card.Title>Category</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{query}</Card.Subtitle>
        <Card.Text>
          {user.value}
        </Card.Text>
        <Card.Text className="mb-2 text-muted">Updated At :{user.updated_At}</Card.Text>
        <Card.Text className="mb-2 text=muted">Created At :{user.created_At}</Card.Text>
      </Card.Body>
    </Card>
        )))}


       
      </div>
     //       {console.log([chuck.result])}

      }
    </div>
  );
}


