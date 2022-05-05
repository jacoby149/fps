import React from "react";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import './index.css';
import { ReactComponent as CogIcon } from './icons/cog.svg';

function App() {
  return (
    <div>
      <Navbar>
      
        <NavItem icon='shape'/>
        <NavItem icon='color'/>
        <NavItem>
          <p>Hello World</p>
        </NavItem>
       
        <NavItem icon={ <CogIcon />}>
        {/* <DropdownMenu></DropdownMenu> */}
      </NavItem>

       </Navbar>

      
    </div>
  );
}

export default App;
