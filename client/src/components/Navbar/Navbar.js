import {MenuItems} from './MenuItems'
import './Navbar.css'
import {RiPlantLine} from 'react-icons/ri'
import {useState} from "react"
import {FaTimes , FaBars} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Navbar = () => {
    const [menuClicked,setMenuClicked] = useState(false);

    const handleMenuClick = () => {
        setMenuClicked(!menuClicked);
    }

    const iconStyle = {color:'white'};

    return (
        <>
            <nav className="NavbarItems">
                <h1 className="navbar-logo">TPI<RiPlantLine style={{marginLeft:'0.5rem',fontSize:'1.6rem'}}/></h1>
                <div className="menu-icon" onClick={handleMenuClick}>
                    {menuClicked? <FaTimes style={iconStyle}/> : <FaBars style={iconStyle}/>}
                </div>
                <ul className={menuClicked? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item,index)=>{
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.classname}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Navbar

