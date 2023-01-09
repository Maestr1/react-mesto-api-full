export default function InfoTooltip ({isOpen, onClose, title, link, name}) {
  return (
    <div className={`popup tooltip-popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container tooltip-popup__container">
        <img className="tooltip-popup__pic" alt={`лого ${name}`} src={link}/>
        <h2 className="popup__title tooltip-popup__title">{title}</h2>
        <button onClick={onClose} className="popup__close-btn" aria-label="Закрыть"></button>
      </div>
    </div>
  )
}