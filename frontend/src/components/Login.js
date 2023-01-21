import EntryForm from './EntryForm';

export default function Login({ handleLogin }) {

  return (
    <section className="entry">
      <EntryForm buttonText="Войти" title="Вход" handleSubmit={ handleLogin }/>
    </section>
  );
}
