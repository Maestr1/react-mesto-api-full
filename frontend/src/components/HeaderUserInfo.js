export default function HeaderUserInfo({isMenuOpen, onLogout, email}) {
  return (
    <div className={`header__wrap ${isMenuOpen ? 'header__wrap_active' : ''}`}>
      <p className="header__userinfo">{email}</p>
      <button onClick={onLogout} className="header__link link">Выйти
      </button>
    </div>
  );
}