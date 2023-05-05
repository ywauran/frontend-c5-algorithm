import React from "react";

const Header = ({ title }) => {
  return (
    <>
      <div className="bg-white p-3 font-semibold border-b-[1px] border-gray-200 text-xl">
        {title}
      </div>
    </>
  );
};

export default Header;
