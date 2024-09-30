// components/AdminPage.tsx
"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface FileData {
  [key: string]: string | number;
}

const dealers = ["Dealer 1", "Dealer 2", "Dealer 3", "Dealer 4", "Dealer 5"];

const AdminPage: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: string }[]>([]);
  const [dealerPrivileges, setDealerPrivileges] = useState<{ [dealer: string]: { row: number; col: string }[] }>({});
  const [selectedDealer, setSelectedDealer] = useState<string>(dealers[0]);

  // Handle file upload and parsing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json<FileData>(firstSheet);
        setFileData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Handle cell selection (checkbox click)
  const handleCellSelect = (row: number, col: string) => {
    const alreadySelected = selectedCells.some((cell) => cell.row === row && cell.col === col);
    if (alreadySelected) {
      setSelectedCells((prev) => prev.filter((cell) => !(cell.row === row && cell.col === col)));
    } else {
      setSelectedCells((prev) => [...prev, { row, col }]);
    }
  };

  // Handle assigning selected cells to the chosen dealer
  const handleAssignToDealer = () => {
    if (!selectedCells.length) return;

    setDealerPrivileges((prev) => ({
      ...prev,
      [selectedDealer]: [...(prev[selectedDealer] || []), ...selectedCells],
    }));

    setSelectedCells([]); // Clear selected cells after assignment
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-white">Admin Page</h2>

      {/* File Upload */}
      <label htmlFor="file-upload" className="block mb-4 text-lg font-semibold text-white">Upload Excel File</label>
      <input
        type="file"
        id="file-upload"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="p-3 border border-gray-600 rounded-lg shadow-sm w-full max-w-md mb-6 bg-gray-800 text-white placeholder-gray-400"
        title="Choose an Excel file to upload"
      />

      {/* Display File Data */}
      {fileData.length > 0 && (
        <div className="overflow-auto mt-6 bg-gray-800 p-6 shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-white">Extracted Data</h3>
          <table className="min-w-full text-left border-collapse border border-gray-700 shadow-sm">
            <thead>
              <tr>
                {Object.keys(fileData[0]).map((key) => (
                  <th key={key} className="border border-gray-600 p-4 bg-gray-700 text-white font-medium">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <td key={colIndex} className="border border-gray-600 p-4 text-gray-300">
                      {/* Display data */}
                      {value}
                      {/* Add checkbox */}
                      <div className="mt-2">
                        <input
                          type="checkbox"
                          checked={selectedCells.some((cell) => cell.row === rowIndex && cell.col === key)}
                          onChange={() => handleCellSelect(rowIndex, key)}
                          className="h-4 w-4 text-blue-500 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dealer Assignment Section */}
      {fileData.length > 0 && (
        <div className="mt-10">
          <div className="mb-6 flex items-center">
            <label className="mr-4 text-lg font-semibold text-white">Assign to Dealer:</label>
            <select
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              className="p-3 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
            >
              {dealers.map((dealer) => (
                <option key={dealer} value={dealer}>
                  {dealer}
                </option>
              ))}
            </select>
            <button
              onClick={handleAssignToDealer}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={selectedCells.length === 0}
            >
              Assign Selected Cells
            </button>
          </div>

          {/* Display Assigned Data */}
          {dealers.map((dealer) => (
            <div key={dealer} className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-white">{dealer}</h3>
              {dealerPrivileges[dealer] && dealerPrivileges[dealer].length > 0 ? (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2 text-white">Assigned Data:</h4>
                  <table className="min-w-full border-collapse border border-gray-700 shadow-sm">
                    <thead>
                      <tr>
                        <th className="border border-gray-600 p-4 bg-gray-700 text-white">Row</th>
                        <th className="border border-gray-600 p-4 bg-gray-700 text-white">Column</th>
                        <th className="border border-gray-600 p-4 bg-gray-700 text-white">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dealerPrivileges[dealer].map((cell, index) => (
                        <tr key={index}>
                          <td className="border border-gray-600 p-4 text-gray-300">{cell.row + 1}</td>
                          <td className="border border-gray-600 p-4 text-gray-300">{cell.col}</td>
                          <td className="border border-gray-600 p-4 text-gray-300">{fileData[cell.row][cell.col]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No data assigned yet for {dealer}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
