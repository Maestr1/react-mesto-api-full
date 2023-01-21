import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card({ onCardDelete, onCardLike, onCardClick, card }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;
  const cardRemoveBtnClassName = (`card__remove-btn ${ isOwn ? 'card__remove-btn_active' : 'card__remove-btn_inactive' }`);
  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeBtnClassName = `card__like-btn ${ isLiked ? 'card__like-btn_liked' : 'card__like-btn_notLiked' }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }


  return (
    <div className="gallery__card card">
      <img onClick={ handleClick } className="card__pic" src={ card.link } alt={ `На картинке ${ card.name }` }/>
      <button onClick={ handleDeleteClick } className={ cardRemoveBtnClassName } aria-label="Удалить место"></button>
      <div className="card__desc">
        <h2 className="card__title">{ card.name }</h2>
        <div className="card__like-wrap">
          <button onClick={ handleLikeClick } className={ cardLikeBtnClassName } aria-label="Поставить лайк"></button>
          <p className="card__like-counter">{ card.likes.length }</p>
        </div>
      </div>
    </div>
  );
}
