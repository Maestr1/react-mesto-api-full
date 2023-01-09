import {useEffect, useRef} from 'react';

export default function PopupWithForm({isLoading, onSubmit, name, isOpen, title, onClose, buttonText, children}) {

  const btnRef = useRef()

  useEffect(()=>{
    btnRef.current.textContent = buttonText
  }, [buttonText, isOpen])

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form onSubmit={onSubmit} className="popup__form" noValidate>
          {children}
          <button ref={btnRef} className="popup__submit-btn" type="submit">{isLoading ? 'Загрузка...' : buttonText}</button>
        </form>
        <button onClick={onClose} className="popup__close-btn" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}