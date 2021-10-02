import React from "react";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../hooks/useFetch";

import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();
  async function handleClick() {
    const confirm = window.confirm("Tem certeza que deseja deletar?");

    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);

      if (response.ok) window.location.reload();
    }
  }
  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Delete
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
