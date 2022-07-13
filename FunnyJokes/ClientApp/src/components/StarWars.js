import { useState, useEffect } from "react";
import SocialCard from "./SocialCard";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function StarWars() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let userData;
      try {
        const response = await fetch("swapi");
        userData = await response.json();
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData);
      setUsers(userData);
    })();
  }, []);

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
  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => (`${user.name}`.toLowerCase().includes(value)));
    setUsers(filteredUsers);
  }

  return (
    <>
    <ThemeProvider theme={theme}>
      <Typography variant="h3" align="center">Meet The People Of Star Wars</Typography>
    </ThemeProvider>
    <div className="App">
     
      
      <input className="search-box" onInput={filterCards} placeholder="Search By Name..."/>
      <div className="cards-container">

      {users.map((user, index) => (
        <SocialCard key={index} userData={user} />
        ))}
      </div>
    </div>
    </>
  );
}

export default StarWars;
