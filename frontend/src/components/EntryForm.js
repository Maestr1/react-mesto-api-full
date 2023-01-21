import { useState } from 'react';

export default function EntryForm({ buttonText, title, handleSubmit }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!password || !email) {
      return;
    }
    handleSubmit(password, email);
  }

  return (
    <form className="entry__form">
      <div className="entry__form-wrap">
        <h2 className="entry__title">{ title }</h2>
        <input value={ email } onChange={ handleChangeEmail } className="entry__input" id={ `entry__input-email` }
               name="email"
               type="email"
               placeholder="Email"
               minLength="2"/>
        <input value={ password } onChange={ handleChangePassword } className="entry__input"
               id={ `entry__input-password` }
               name="password"
               type="password" placeholder="Пароль"
               minLength="2"/>
      </div>
      <button onClick={ onSubmit } className="entry__submit-btn" type="submit">{ buttonText }</button>
    </form>
  );
}
