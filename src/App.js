import React from "react";
import Navbar from "./components/Navbar";
import NavItem from "./components/NavItem";
import DropdownMenu from "./components/DropdownMenu";
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
       
        {/* <NavItem icon={ <CogIcon />}>
        
        <DropdownMenu></DropdownMenu>

      </NavItem> */}
      
      <NavItem icon='dropdownmenu'>
        
        <DropdownMenu></DropdownMenu>

      </NavItem>

       </Navbar>

      
    </div>
  );
}

export default App;
