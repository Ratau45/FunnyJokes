
import  StarWars  from "./components/StarWars";
import Categories from "./components/Categories";
import Search from "./components/Search";

const AppRoutes = [
  {
    index: true,
    element: <Search />
  },
  {
    path: '/StarWars',
    element: <StarWars />
  },
  
 { 
  path: '/Chuck',
  element: <Categories />
}
];

export default AppRoutes;
