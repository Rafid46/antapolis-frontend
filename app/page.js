import React from "react";
import TheLayout from "./theLayout/page";

const page = () => {
  return (
    <div className="mx-auto flex items-center justify-center h-screen">
      <div className="min-h-[80vh] bg-gray-100 w-10/12 rounded-2xl p-7">
        <TheLayout></TheLayout>
      </div>
    </div>
  );
};

export default page;
