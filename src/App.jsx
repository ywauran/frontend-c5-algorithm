import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Header from "./componets/Header";
import { MdOutlineDataset, MdCalculate } from "react-icons/md";
import { VscOutput } from "react-icons/vsc";
import QuestionnaireDataPage from "./pages/QuestionnaireDataPage";
import CalculatePage from "./pages/CalculatePage";
import ResultPage from "./pages/ResultPage";

const App = () => {
  const [page, setPage] = useState(0);
  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [showVisualization, setShowVisualization] = useState(false);
  const [errorFormat, setErrorFormat] = useState(false);
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  let currentPage;

  const changeHandler = (event) => {
    console.log(event.target.files[0].type);
    if (
      event.target.files[0].type === "application/vnd.ms-excel" ||
      event.target.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setErrorFormat(true);
    } else {
      setErrorFormat(false);
    }
  };

  switch (page) {
    case 0:
      currentPage = (
        <>
          <Header title="Halaman Data Kuisioner" />
          <QuestionnaireDataPage/>
        </>
      );
      break;
    case 1:
      currentPage = (
        <>
          <Header title="Halaman Perhitungan" />
          <CalculatePage/>
        </>
      );
      break;
    case 2:
      currentPage = (
        <>
          <Header title="Halaman Hasil" />
          <ResultPage/>
        </>
      );
      break;
    default:
      currentPage = (
        <div className="font-bold grid place-content-center h-screen place-items-center">
          <h1 className="">Halaman tidak ditemukan</h1>
        </div>
      );
      break;
  }
  return (
    <>
      <div className="flex w-full">
        <div className="w-[20%] h-screen border-r-[1px] border-gray-300">
          <ul className="flex flex-col space-y-3 py-2 px-4 mt-12">
            <li className="">
              <span
                onClick={() => setPage(0)}
                className={`flex items-center space-x-3 p-2 cursor-pointer ${
                  page === 0
                    ? "bg-[#D9F3EA] rounded-md text-[#0c835b] font-semibold"
                    : "text-[#464255]"
                }`}
              >
                <MdOutlineDataset />
                <p>Data Kuisioner</p>{" "}
              </span>
            </li>
            <li>
              <span
                onClick={() => setPage(1)}
                className={`flex items-center space-x-3 p-2 cursor-pointer ${
                  page === 1
                    ? "bg-[#D9F3EA] rounded-md text-[#0c835b] font-semibold"
                    : "text-[#464255]"
                }`}
              >
                <MdCalculate />
                <p>Perhitungan</p>{" "}
              </span>
            </li>
            <li>
              <span
                onClick={() => setPage(2)}
                className={`flex items-center space-x-3 p-2 cursor-pointer ${
                  page === 2
                    ? "bg-[#D9F3EA] rounded-md text-[#0c835b] font-semibold"
                    : "text-[#464255]"
                }`}
              >
                <VscOutput />
                <p>Hasil</p>{" "}
              </span>
            </li>
          </ul>
        </div>
        <div className="w-[80%] bg-[#F3F2F7]">{currentPage}</div>
      </div>
    </>
  );
};

export default App;
