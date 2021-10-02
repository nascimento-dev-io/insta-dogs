import React from "react";
import { useParams } from "react-router";
import { PHOTO_GET } from "../../api";
import useFetch from "../../hooks/useFetch";
import Error from "../Helpers/Error";
import Head from "../Helpers/Head";
import Loading from "../Helpers/Loading";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url } = PHOTO_GET(id);
    request(url);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container main-container">
        <Head title={data.photo.title} />
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
