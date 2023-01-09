import {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isLoading, onUpdateAvatar, onClose, isOpen}) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  useEffect(()=>{
    inputRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="edit-avatar" title="Обновить аватар" buttonText="Сохранить">
      <div className="popup__input-wrap">
        <input ref={inputRef} type="url" name="link" placeholder="Ссылка на картинку" className="popup__input"
               id={`popup-edit-input-link`} required minLength="2"/>
        <span id={`popup-edit-input-link-error`} className="popup__input-error"></span>
      </div>

    </PopupWithForm>
  );
}