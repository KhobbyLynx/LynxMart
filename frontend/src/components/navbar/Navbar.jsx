import { useState } from 'react';
import { BiUser, BiMenu, BiSupport} from 'react-icons/bi';
import { RiCloseFill, RiHeartLine } from 'react-icons/ri';
import { BsGlobe } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import { images } from '../../constants';
import "./Navbar.scss";
import Search from '../search/Search';

const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    function openMenu() {
        setToggle(true)
    }
    function closeMenu() {
        setToggle(false)
    }

    const activeStyles = {
        fontWeight: 'bold',
        borderBottom: '2px solid #000'
    }

  return (
    <>
        <div className="navbar">
            <div className="navbar__top">
                <div className='nav__top df' >
                    <div className="navbar__left df">
                        { toggle ?
                                <RiCloseFill className='menu__icon' onClick={closeMenu}/> :
                                <BiMenu className='menu__icon' onClick={openMenu}/>
                        }
                        <Link to="/"><img className='navbar__logo' src={images.logo} alt="lynx logo" /></Link>
                    </div>
                    < Search  className='navbar__search'/>
                    <div className="navbar__right">
                        <button className="navbar__user df">
                            <BiUser className='user__icon'/>
                            <span>Account</span>
                        </button>
                        <button className="navbar__cart df">
                            <Link to='cart' ><img src={images.cart} alt="" /></Link>
                            <div className="icon__count">0</div>
                        </button>
                    </div>
                </div>
                <hr className='line'/>
                <Search className='mobile__search'/>
            </div>
            <hr  className='navbar__line'/>
            <div className="navbar__bottom df">
               <div className="links__container df">
                    <NavLink 
                        to='.' end 
                        className='navlink link'
                        style={({isActive}) => isActive ? activeStyles : null}
                    >
                        Home
                    </NavLink>
                   {['shop','blog','about','contact'].map(navlink => (
                       <NavLink
                       to={navlink}
                       key={navlink}
                       className='navlink'
                       style={({isActive}) => isActive ? activeStyles : null}
                       >
                            {navlink}
                        </NavLink>
                   ))}
               </div>
               <div className="icon__links df">
                    <div className="icon__container df">
                        <Link to='wishlist'>< RiHeartLine className='wishlist icon__link'/></Link>
                        <span className='icon__count df'>0</span>
                    </div>
                    <div className="df">
                        < BiSupport className='support icon__link'/>
                        <span>Help</span>
                    </div>
                    <div className="df">
                        < BsGlobe className='globe icon__link'/>
                    </div>
               </div>
            </div>
                { toggle &&
                    <div className="menu__container">
                        {['home','shop','blog','about','contact'].map(navlink => (
                            <Link
                            to={navlink}
                            key={navlink}
                            className='menu__link link'
                            onClick={closeMenu}
                            >
                                {navlink}
                            </Link>
                        ))}
                    </div>
                }
        </div>        
    </>
  )
}

export default Navbar