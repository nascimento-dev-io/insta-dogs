import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helpers/Error";
import { UserContext } from "../../UserContext";

import styles from "./LoginForm.module.css";
import stylesButton from "../Forms/Button.module.css";
import Head from "../Helpers/Head";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="text"
          label="Usuário"
          name="username"
          placeholder="Digite seu usuário"
          {...username}
        />
        <Input type="password" label="Senha" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && (
          <Error
            error={`${error} Falha ao realizar o login | Verifique usuário e/ou Senha`}
          />
        )}
      </form>
      <Link className={styles.forgotten} to="/login/lost">
        Perdeu a Senha?
      </Link>
      <div className={styles.registration}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
      </div>
      <Link className={stylesButton.button} to="/login/create">
        {" "}
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
