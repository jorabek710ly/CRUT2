import React, { useState } from "react";
import CreateForm from "../components/Form";
import Blog from "../components/Card";
import type { IStudent } from "../types";


const Home = () => {
  const [update, setUpdate] = useState<IStudent | null>(null);

  return (
    <div className="container mx-auto mt-10">
      <CreateForm update={update} setUpdate={setUpdate} />
      <Blog update={update} setUpdate={setUpdate} />
    </div>
  );
};

export default React.memo(Home);
