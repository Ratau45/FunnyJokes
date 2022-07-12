
import  Home  from "./components/Home";
import Categories from "./components/Categories";
import Search from "./components/Search";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/Search',
    element: <Search />
  },
 { 
  path: '/categories',
  element: <Categories />
}
];

export default AppRoutes;
