import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <h1>Une erreur est survenue !!</h1>
    </>
  );
}

export default ErrorPage;
