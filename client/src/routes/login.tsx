import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="login">
      <h1>Login</h1>
      <form action="post">
        <input type="email" name="email" id="email" placeholder="Adresse e-mail" />
        <input type="password" name="password" id="password" placeholder="Mot de passe" />
        <button type="submit">Connexion</button>
      </form>
      <Link to="/signup">Enregistrer un nouveau compte</Link>
    </div>
  );
}
