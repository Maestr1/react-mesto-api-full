import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Route, Switch, useHistory } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import successLogo from '../images/success.svg';
import unsuccessLogo from '../images/unsuccess.svg';
import auth from '../utils/auth';

export default function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ card: '' });
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isUnsuccessPopupOpen, setUnsuccessPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const history = useHistory();

//Проверка валидности токена при открытии приложения
  useEffect(() => {
    checkToken();
  }, []);

  //Запрос карточек и информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.requestUserInfo(), api.requestCardList()])
        .then(([userInfo, cardList]) => {
          setCurrentUser(userInfo);
          setCards(cardList);
        })
        .catch(res => console.log(`Запрос информации не выполнен. Текст ошибки: ${ res }`));
    }
  }, [loggedIn]);

  function toggleMenuOpen() {
    if (isBurgerOpen) {
      setIsBurgerOpen(false);
    } else {
      setIsBurgerOpen(true);
    }
  }

  //Отправка карточки на сервер
  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api.postCard(name, link)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка, карточка не добавлена. Текст ошибки: ${ err }`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Поставить лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.toggleLike(card._id, isLiked)
      .then(newCard => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка лайка. Текст ошибки: ${ err }`));
  }

  //Удалить карточку  с сервера
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter(i => i !== card));
      })
      .catch(err => console.log(`Карточка не удалена. Текст ошибки: ${ err }`));
  }

  //Открыть попап с изхображением карточки
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //Обновить информацию о пользователе
  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.patchUserInfo(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные не отправлены. Текст ошибки: ${ err }`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Обновить аватар пользователя
  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.patchUserAvatar(link)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные не отправлены. Текст ошибки: ${ err }`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSuccessPopupOpen(false);
    setUnsuccessPopupOpen(false);
  }

  //Авторизоваться на сервере и записать токен в хранилище
  function handleLogin(password, email) {
    auth.login({ password, email })
      .then(res => {
        if (res.token) {
          setIsBurgerOpen(false);
          checkToken(); //валидация токена для получения email пользователя и подстановки его на страницу при переходе со страницы входа
        }
      })
      .catch(err => {
        setUnsuccessPopupOpen(true);
        console.log(err);
      });
  }

  //Регистрация на сервере, переадресация на страницу входа
  function handleRegister(password, email) {
    auth.register({ password, email })
      .then(() => {
        setSuccessPopupOpen(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setUnsuccessPopupOpen(true);
        console.log(`Ошибка регистрации. Код ошибки: ${ err }`);
      });
  }


//Удалить токен из хранилища, выйти из приложения
  function onLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  //Проверить валидность токена
  function checkToken() {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.checkTokenValid(jwt)
        .then(res => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch(err => console.log(err));
    }
  }


  return (

    <CurrentUserContext.Provider value={ currentUser }>
      <Header toggleMenu={ toggleMenuOpen } isMenuOpen={ isBurgerOpen } userEmail={ userEmail } onClickBtn={ onLogout }
              loggedIn={ loggedIn }/>
      <Switch>
        <Route exact path="/sign-in">
          <Login handleLogin={ handleLogin }/>
        </Route>
        <Route exact path="/sign-up">
          <Register handleRegister={ handleRegister }/>
        </Route>
        <ProtectedRoute exact path="/" loggedIn={ loggedIn } component={ Main } onCardDelete={ handleCardDelete }
                        onCardLike={ handleCardLike }
                        cards={ cards }
                        onCardClick={ handleCardClick }
                        onEditProfile={ handleEditProfileClick }
                        onAddPlace={ handleAddPlaceClick }
                        onEditAvatar={ handleEditAvatarClick }/>
      </Switch>
      <EditProfilePopup isLoading={ isLoading } onUpdateUser={ handleUpdateUser } onClose={ closeAllPopups }
                        isOpen={ isEditProfilePopupOpen }/>
      <AddPlacePopup isLoading={ isLoading } onAddPlace={ handleAddPlaceSubmit } onClose={ closeAllPopups }
                     isOpen={ isAddPlacePopupOpen }/>
      <EditAvatarPopup isLoading={ isLoading } onUpdateAvatar={ handleUpdateAvatar } onClose={ closeAllPopups }
                       isOpen={ isEditAvatarPopupOpen }/>
      <PopupWithForm onClose={ closeAllPopups }
                     name="confirm"
                     title="Вы уверены?"
                     buttonText="Да"/>
      <ImagePopup onClose={ closeAllPopups } isOpen={ isImagePopupOpen } card={ selectedCard }/>
      <InfoTooltip isOpen={ isSuccessPopupOpen }
                   onClose={ closeAllPopups }
                   title="Вы успешно зарегистрировались!"
                   link={ successLogo }
                   name="success"/>
      <InfoTooltip isOpen={ isUnsuccessPopupOpen }
                   onClose={ closeAllPopups }
                   title="Что-то пошло не так! Попробуйте ещё раз."
                   link={ unsuccessLogo }
                   name="unsuccess"/>
      <Footer/>
    </CurrentUserContext.Provider>);
}
