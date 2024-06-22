import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import "../../data/data.json"

const SalesTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data/data.json");
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const convertToByteArray = (str) => {
    //array of individual characters to byteArray
    return str.split("").map((char) => char.charCodeAt(0));
  };

  const handleDownload = () => {
    const wsData = [
      ["Month", "Sales", "Profit"],
      ...data.map(item => [
        //convert the cell data to string then an array of ASCII code
        JSON.stringify(convertToByteArray(item.month.toString())),
        JSON.stringify(convertToByteArray(item.sales.toString())),
        JSON.stringify(convertToByteArray(item.profit.toString()))
      ])
    ];

    //worksheet from an array of arrays
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Data");

    XLSX.writeFile(wb, "sales_data.xlsx");
  };


  return (
    <div className="flex flex-col justify-center items-center	">
      <div className="font-sans">
        <table className="m-5">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-2 text-left text-md font-bold text-black uppercase border border-gray-200">
                Month
              </th>
              <th className="px-5 py-2 text-left text-md font-bold text-black uppercase border border-gray-200">
                Sales
              </th>
              <th className="px-5 py-2 text-left text-md font-bold text-black uppercase border border-gray-200">
                Profit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-3 py-2 text-sm text-center border border-gray-200">
                  {item.month}
                </td>
                <td className="px-3 py-2 text-sm text-center border border-gray-200">
                  {item.sales}
                </td>
                <td className="px-3 py-2 text-sm text-center border border-gray-200">
                  {item.profit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-black text-sm text-white rounded"
      >
        Download Excel
      </button>
    </div>
  );
};

export default SalesTable;
