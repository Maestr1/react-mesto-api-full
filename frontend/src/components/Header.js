import logo from '../images/logo.svg';
import {Link} from 'react-router-dom';
import HeaderUserInfo from './HeaderUserInfo';
import {useState} from 'react';
import BurgerButton from './BurgerButton';

export default function Header({isMenuOpen, toggleMenu, onClickBtn, loggedIn, userEmail}) {

  const [currentUrl, setCurrentUrl] = useState('');

  function changeUrl() {
    setCurrentUrl(window.location.pathname);
  }




  return (
    <header className='header'>
      <div className="header__logo-wrap">
        <img className="header__logo" src={logo} alt="Логотип"/>
        {loggedIn ? <BurgerButton
          isMenuOpen={isMenuOpen}
          onClick={toggleMenu}>X</BurgerButton> : <Link onClick={changeUrl}
                                                      className="header__link link"
                                                      to={window.location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}>{window.location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}
        </Link>}
      </div>
      {loggedIn ? <HeaderUserInfo isMenuOpen={isMenuOpen} email={userEmail} onLogout={onClickBtn}/> : ''
      }
    </header>
  );
}
