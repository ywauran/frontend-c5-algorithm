import React, { useState, useEffect } from "react";
import Papa from "papaparse";
const QuestionnaireDataPage = () => {
  const [errorFormat, setErrorFormat] = useState(false);

  const [data, setData] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);

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
        setData(valuesArray);
      },
    });
  };

  const calculate = () => {
    console.log("Hello World");
  };
  return (
    <>
      <div className="p-4">
        <div>
          <div>
            {data.length !== 0 ? (
              <div className="flex justify-between items-center">
                <button
                  onClick={() => calculate()}
                  className="bg-blue-800 px-6 py-2 rounded-md text-white"
                >
                  Perhitungan
                </button>
                <button
                  onClick={() => setData([])}
                  className="bg-red-600 px-6 py-2 rounded-md text-white"
                >
                  Reset
                </button>
              </div>
            ) : (
              <form className="border-gray-400 border-2 rounded-md p-1">
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
              <h3 className="font-semibold my-2">Data Pribadi</h3>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden ">
                    {data.length !== 0 ? (
                      <>
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                No
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, number) => (
                              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {number + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[1]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[2]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[3]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[4]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <p className="text-center font-medium text-gray-500">
                          Data Kosong
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 mt-4 shadow ">
              <h3 className="font-semibold my-2">Kebutuhan Dasar Keluarga</h3>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden ">
                    {data.length !== 0 ? (
                      <>
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                No
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, number) => (
                              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {number + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[5]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[6]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[7]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[8]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[9]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[10]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <p className="text-center font-medium text-gray-500">
                          Data Kosong
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 mt-4 shadow">
              <h3 className="font-semibold my-2">Kebutuhan Psikologis</h3>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden ">
                    {data.length !== 0 ? (
                      <>
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                No
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, number = 0) => (
                              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {number + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[11]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[12]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[13]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[14]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[15]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[16]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[17]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[18]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <p className="text-center font-medium text-gray-500">
                          Data Kosong
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 mt-4 shadow">
              <h3 className="font-semibold my-2">Kebutuhan Pengembangan</h3>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden ">
                    {data.length !== 0 ? (
                      <>
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                No
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, number) => (
                              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {number + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[19]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[20]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[21]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[22]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[23]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <p className="text-center font-medium text-gray-500">
                          Data Kosong
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-2 mt-4 shadow">
              <h3 className="font-semibold my-2">Kebutuhan Aktualisasi Diri</h3>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden ">
                    {data.length !== 0 ? (
                      <>
                        <table className="min-w-full text-left text-sm font-light">
                          <thead className="border-b font-medium">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                No
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, number) => (
                              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {number + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[24]}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  {item[25]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <>
                        <p className="text-center font-medium text-gray-500">
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
};

export default QuestionnaireDataPage;
