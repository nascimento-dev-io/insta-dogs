import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router";

//Criando context para concender acesso a informações do usuário em componentes de diversos niveis.

// Criando e exportando o componente de contexto
export const UserContext = React.createContext();

// Criando e exportando a função que disponibiliza o Provider onde contém o data para ser compartilhados entre os componentes onde ele é importado.
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  //função de logout, realiza reset nos estados e rmove o token do localstorage
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);

      localStorage.removeItem("token");

      navigate("/login");
    },
    [navigate]
  );

  // Checando se ja existe token no localstorage e realizando o login automático, lidando com estados de erros e loading também
  React.useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);

          if (!response.ok) throw new Error("Token inválido");

          await getUser(token);
        } catch (err) {
          userLogout();
          setError(err.massage);
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    })();
  }, [userLogout]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  //Criando e exportando função de validação de login
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const tokenResponse = await fetch(url, options);

      if (!tokenResponse.ok) {
        throw new Error(`Error:${tokenResponse.statusText}`);
      }

      const { token } = await tokenResponse.json();
      localStorage.setItem("token", token);
      await getUser(token);

      navigate("/account");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  //Informações são passada atraves do atributo value
  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
