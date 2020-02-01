import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  to: string;
}

const PageLink = ({ name, to }: Props) => {
  return (
    <Link className="p-2 mx-1 bg-green-100 rounded hover:bg-green-200" to={to}>
      {name}
    </Link>
  );
};

export default PageLink;
