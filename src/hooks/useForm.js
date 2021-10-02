import React from "react";

// custom hook utilizado para torna compos reativos controlando seu estado e realizando validações nos campos que sejam necessários.

//Objeto com tipos de campos que precisam de validação, definindo regexp para validar o campo e mensagem de erro no caso de campo inválido.
const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha deve ter pelo menos 1 caracter maiúsculo, 1 minúsculo e 1 dígito. Com no mínimo 8 caracteres.",
  },
  number: {
    regex: /^\d+$/,
    message: "Utiliza números apenas",
  },
};

// hook recebe o tipo de campo quando necessário a validação
const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  // a função de validação testa se existe um tipo informado para o campo e so tenta valida se o tiver o type e se o value do campo seja vazio.
  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      // Valida se campo existe na validações do objeto types e se a regexp retorna true, indicando que a expressão não foi validada.

      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  // o hook retorna um objeto com o value, error, o setValuecaso seja necessário manipular estado em outro componente, onChange que namipula o value do input, além da propriedade validate que possui uma função que executa o validate com o value e onBlur que faz a mesma coisa para gerencia evento no campo.
  return {
    value,
    error,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
