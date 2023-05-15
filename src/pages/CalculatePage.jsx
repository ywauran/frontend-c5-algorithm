import React, { useState } from "react";

const CalculatePage = ({}) => {
  const [dataEntropy, setDataEntropy] = useState([1, 2, 3, 4, 5]);
  const [dataGain, setDataGain] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="shadow-md">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium">
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
              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {number + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="shadow-md">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium">
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
              <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {number + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4">{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalculatePage;
