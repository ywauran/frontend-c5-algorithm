import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Header from "./componets/Header";
import { MdOutlineDataset, MdCalculate } from "react-icons/md";
import { VscOutput } from "react-icons/vsc";
import QuestionnaireDataPage from "./pages/QuestionnaireDataPage";
import CalculatePage from "./pages/CalculatePage";
import ResultPage from "./pages/ResultPage";

const App = () => {
  const [page, setPage] = useState(0);
  let currentPage;
  const [errorFormat, setErrorFormat] = useState(false);
  const [data, setData] = useState([]);
  const [dataReq, setDataReq] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [dataEntropy, setDataEntropy] = useState([1, 2, 3, 4, 5]);
  const [dataGain, setDataGain] = useState([1, 2, 3, 4, 5]);
  const [dataCategory, setDataCategory] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];
        // eslint-disable-next-line array-callback-return
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        const newData = [];
        for (let i = 0; i < valuesArray.length; i++) {
          const row = [];
          for (let j = 1; j < valuesArray[i].length; j++) {
            if (!isNaN(parseInt(valuesArray[i][j]))) {
              row.push(parseInt(valuesArray[i][j]));
            }
          }
          newData.push(row);
        }
        setData(valuesArray);
        setDataReq(newData);
      },
    });
  };

  const sendData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        data: dataReq,
      });
      console.log(response.data);
      setDataEntropy(response.data.feature_importances);
      setDataGain(response.data.node_impurities);
      setDataCategory(response.data.prediction);

      const newData = [...data];
      response.data.prediction.forEach((item, index) => {
        newData[index].push(item);
      });

      setDataResult(newData);
      console.log(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const calculate = () => {
    setPage(1);
    sendData();
  };

  const showResult = () => {
    setPage(2);
  };

  useEffect(() => {
    // console.log(dataResult);
  });
  switch (page) {
    case 0:
      currentPage = (
        <>
          <Header title="Halaman Data Kuisioner" />
          <div className="p-4">
            <div>
              <div>
                {data.length !== 0 ? (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => calculate()}
                      className="px-6 py-2 text-white bg-blue-800 rounded-md"
                    >
                      Perhitungan
                    </button>
                    <button
                      onClick={() => setData([])}
                      className="px-6 py-2 text-white bg-red-600 rounded-md"
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <form className="p-1 border-2 border-gray-400 rounded-md">
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        className="input__excel"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </form>
                )}
              </div>
              <div className="">
                <div className="flex flex-col p-2 mt-4 shadow ">
                  <h3 className="my-2 font-semibold">Data Pribadi</h3>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden ">
                        {data.length !== 0 ? (
                          <>
                            <table className="min-w-full text-sm font-light text-left">
                              <thead className="font-medium border-b">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    No
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q1.1
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q1.2
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q1.3
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q1.4
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item, number) => (
                                  <tr
                                    key={number + 1}
                                    className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                                  >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                      {number + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[1]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[2]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[3]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[4]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-center text-gray-500">
                              Data Kosong
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-2 mt-4 shadow ">
                  <h3 className="my-2 font-semibold">
                    Kebutuhan Dasar Keluarga
                  </h3>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden ">
                        {data.length !== 0 ? (
                          <>
                            <table className="min-w-full text-sm font-light text-left">
                              <thead className="font-medium border-b">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    No
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q2.1
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q2.2
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q2.3
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q2.4
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q2.5
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q2.6
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item, number) => (
                                  <tr
                                    key={number + 1}
                                    className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                                  >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                      {number + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[5]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[6]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[7]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[8]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[9]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[10]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-center text-gray-500">
                              Data Kosong
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-2 mt-4 shadow">
                  <h3 className="my-2 font-semibold">Kebutuhan Psikologis</h3>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden ">
                        {data.length !== 0 ? (
                          <>
                            <table className="min-w-full text-sm font-light text-left">
                              <thead className="font-medium border-b">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    No
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.1
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.2
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.3
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.4
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.6
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.7
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.8
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q3.9
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item, number = 0) => (
                                  <tr
                                    key={number + 1}
                                    className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                                  >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                      {number + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[11]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[12]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[13]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[14]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[15]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[16]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[17]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[18]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-center text-gray-500">
                              Data Kosong
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-2 mt-4 shadow">
                  <h3 className="my-2 font-semibold">Kebutuhan Pengembangan</h3>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden ">
                        {data.length !== 0 ? (
                          <>
                            <table className="min-w-full text-sm font-light text-left">
                              <thead className="font-medium border-b">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    No
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q4.1
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q4.2
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q4.3
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q4.4
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q4.5
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item, number) => (
                                  <tr
                                    key={number + 1}
                                    className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                                  >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                      {number + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[19]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[20]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[21]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[22]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[23]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-center text-gray-500">
                              Data Kosong
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-2 mt-4 shadow">
                  <h3 className="my-2 font-semibold">
                    Kebutuhan Aktualisasi Diri
                  </h3>
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                      <div className="overflow-hidden ">
                        {data.length !== 0 ? (
                          <>
                            <table className="min-w-full text-sm font-light text-left">
                              <thead className="font-medium border-b">
                                <tr>
                                  <th scope="col" className="px-6 py-4">
                                    No
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q5.1
                                  </th>
                                  <th scope="col" className="px-6 py-4">
                                    Q5.2
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((item, number) => (
                                  <tr
                                    key={number + 1}
                                    className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                                  >
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                      {number + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[24]}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                      {item[25]}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-center text-gray-500">
                              Data Kosong
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
      break;
    case 1:
      currentPage = (
        <>
          <Header title="Halaman Perhitungan" />
          <div className="flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-start">
              <button
                onClick={() => showResult()}
                className="px-6 py-2 text-white bg-blue-800 rounded-md"
              >
                Hasil
              </button>
            </div>
            <div className="shadow-md">
              <table className="min-w-full text-sm font-light text-left">
                <thead className="font-medium border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Entropy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataEntropy.map((item, number) => (
                    <tr
                      key={number + 1}
                      className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {number + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="shadow-md">
              <table className="min-w-full text-sm font-light text-left">
                <thead className="font-medium border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Gain
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataGain.map((item, number) => (
                    <tr
                      key={number + 1}
                      className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {number + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
      break;
    case 2:
      currentPage = (
        <>
          <Header title="Halaman Hasil" />
          <div className="p-4">
            <div className="flex items-center justify-end">
              <div className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md w-fit">
                <ReactHtmlTableToExcel
                  table="tableResult"
                  filename="my-excel-file"
                  sheet="sheet 1"
                  buttonText="Export to Excel"
                />
              </div>
            </div>
            <div className="mt-4 shadow-md">
              <table
                id="tableResult"
                className="min-w-full text-sm font-light text-left"
              >
                <thead className="font-medium border-b">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Responden
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Umur
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Jenis Kelamin
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Tingkat Pendidikan
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pekerjaan
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pendapatan
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Kategori
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataResult.map((item, number) => (
                    <tr
                      key={number + 1}
                      className="transition duration-300 ease-in-out border-b hover:bg-neutral-100"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {number + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        R{number + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[0]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[1]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[2]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[3]}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item[4]}</td>
                      <td className="px-6 py-4 font-bold whitespace-nowrap">
                        {item[26]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
      break;
    default:
      currentPage = (
        <div className="grid h-screen font-bold place-content-center place-items-center">
          <h1 className="">Halaman tidak ditemukan</h1>
        </div>
      );
      break;
  }
  return (
    <>
      <div className="flex w-full">
        <div className="w-[20%] h-screen border-r-[1px] border-gray-300">
          <ul className="flex flex-col px-4 py-2 mt-12 space-y-3">
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
                className={`flex items-center space-x-3 p-2 ${
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
                className={`flex items-center space-x-3 p-2 ${
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
