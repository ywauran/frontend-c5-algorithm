import React, { useState, useEffect } from "react";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const ResultPage = () => {
  const [data, setData] = useState([]);
  return (
    <div className="p-4">
      <div className="flex justify-end items-center">
        <div className="bg-green-600 py-2 px-4 rounded-md w-fit text-white font-semibold">
          <ReactHtmlTableToExcel
            table="tableResult"
            filename="my-excel-file"
            sheet="sheet 1"
            buttonText="Export to Excel"
          />
        </div>
      </div>
      <div>
        <table
          id="tableResult"
          className="min-w-full text-left text-sm font-light"
        >
          <thead className="border-b font-medium">
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
            {data.map((item, number) => (
              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {number + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">R{number + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">#</td>
                <td className="whitespace-nowrap px-6 py-4">#</td>
                <td className="whitespace-nowrap px-6 py-4">#</td>
                <td className="whitespace-nowrap px-6 py-4">#</td>
                <td className="whitespace-nowrap px-6 py-4">#</td>
                <td className="whitespace-nowrap px-6 py-4">#</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultPage;
