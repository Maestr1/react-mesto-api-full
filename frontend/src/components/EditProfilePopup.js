import {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isLoading, onUpdateUser, isOpen, onClose}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name, about});
  }

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} onClose={onClose} isOpen={isOpen} name="edit-profile"
                   title="Редактировать профиль" buttonText="Сохранить">
      <FormInput value={name} onChange={handleChangeName} name="name" type="text" placeholder="Имя" id="name"
                 minLength="2" maxLength="40"/>
      <FormInput value={about} onChange={handleChangeAbout} name="about" type="text" placeholder="Профессия"
                 id="job" minLength="2" maxLength="200"/>
    </PopupWithForm>
  );
}