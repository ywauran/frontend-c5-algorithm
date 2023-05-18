import React from "react";

const Header = ({ title }) => {
  return (
    <>
      <header className="bg-white p-3 font-semibold border-b-[1px] border-gray-200 text-xl">
        <div>
          <h1 className="text-center">
            Aplikasi Prediksi Tingkat Kesejahteraan
          </h1>
          <h3 className="mt-4 text-lg">{title}</h3>
        </div>
      </header>
    </>
  );
};

export default Header;
