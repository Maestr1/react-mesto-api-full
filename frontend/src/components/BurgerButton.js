export default function BurgerButton({isMenuOpen, onClick}) {
  return (
    <button onClick={onClick} className={`header__menu-btn burger-btn ${isMenuOpen ? 'burger-btn_active' : ''}`}>
      <span className="burger-btn__bar-top"></span>
      <span className="burger-btn__bar-mid"></span>
      <span className="burger-btn__bar-bot"></span>
    </button>
  );
}