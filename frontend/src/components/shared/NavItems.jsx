import React from 'react'
import { NavLink} from 'react-router-dom'
import { headerLinks } from '../../constants'
const NavItems = ({flexCol}) => {

    const getStyles = ({isActive})=>({
        color:isActive ? "#2596be" :"white"
    })
    

  return (
    <ul className={`flex gap-6 ${flexCol}`}>
    {
        headerLinks.map(link =>(
            <NavLink style={getStyles} to={link.route} key={link.route} >
                <li className={`p-medium-16 lg:p-medium-20 text-md font-roboto tracking-wide hover:text-cyan-600 transition-all 
                    duration-300 ease-in-out`} key={link.route}>{link.label}</li>
            </NavLink>
        ))
    }
    </ul>
  )
}

export default NavItems