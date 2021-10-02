import React from "react";

const PhotoGet = () => {
  const [id, setID] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://dogsapi.origamid.dev/json/api/photo/${id}`)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={id}
        onChange={({ target }) => setID(target.value)}
      />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet;
