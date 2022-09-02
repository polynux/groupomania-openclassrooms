export default () => {
  return (
    <>
      <h1>Créer un compte</h1>
      <form action="post">
        <input type="text" name="lastname" id="lastname" placeholder="Nom" />
        <input type="text" name="firstname" id="firstname" placeholder="Prénom" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input type="password" name="password" id="password" placeholder="Mot de passe" />
        <input type="password" name="password2" id="password2" placeholder="Confirmez votre mot de passe" />
        <button type="submit">Créer un compte</button>
      </form>
    </>
  );
};
