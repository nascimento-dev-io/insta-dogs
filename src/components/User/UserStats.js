import React from "react";
import { GET_STATS } from "../../api";
import useFetch from "../../hooks/useFetch";
import Error from "../Helpers/Error";
import Head from "../Helpers/Head";
import Loading from "../Helpers/Loading";
// import UserStatsGraphs from "./UserStatsGraphs";
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = GET_STATS();

      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas " />
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
