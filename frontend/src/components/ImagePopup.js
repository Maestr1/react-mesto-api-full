import {useEffect} from 'react';

export default function ImagePopup({ isOpen, card, onClose }) {

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    });
  }, []);

  return (
    <div onClickCapture={ e => (e.currentTarget === e.target) && onClose() }
         className={`popup popup_type_zoom ${isOpen ? 'popup_opened' : ''}`} id="popup-zoom">
      <div className="popup__container popup__container_type_zoom">
        <img className="popup__zoom-pic" src={card.link} alt={`На картинке ${card.name}`}/>
        <button onClick={onClose} className="popup__close-btn" aria-label="Закрыть"></button>
        <p className="popup__desc">{card.name}</p>
      </div>
    </div>
  );
}
