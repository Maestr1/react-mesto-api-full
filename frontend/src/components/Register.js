import {Link} from 'react-router-dom';
import EntryForm from './EntryForm';

export default function Register({handleRegister}) {

  return (
    <section className="entry">
      <EntryForm buttonText="Зарегестироваться" title="Регистрация" handleSubmit={handleRegister}/>
      <p className="entry__link-title">Уже зарегестированы? <Link className="entry__link link"
                                                                  to="/sign-in">Войти</Link></p>
    </section>
  );
}