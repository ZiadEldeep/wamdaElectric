/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import * as XLSX from "xlsx";

interface FileData {
  [key: string]: string | number;
}

const dealers = ["Dealer 1", "Dealer 2", "Dealer 3", "Dealer 4", "Dealer 5"];

// Styled components
const PageWrapper = styled.div`
  padding: 2rem;
  min-height: 100vh;
  `;
  // background: linear-gradient(135deg, #f0f4c3, #a7ffeb);

// const Title = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 800;
//   color: #444;
//   margin-bottom: 1.5rem;
// `;

const FileInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #555;
  width: 100%;
  max-width: 320px;
  margin-bottom: 1rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 1.5rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DealerSection = styled.div`
  margin-top: 2rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AssignButton = styled.button`
  margin-left: 1rem;
  background: #29b6f6;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  &:hover {
    background: #0288d1;
  }
`;

const Products: React.FC = () => {
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
    <PageWrapper>
      {/* <Title>Admin Page</Title> */}

      {/* File Upload */}
      <label htmlFor="file-upload" css={css`display: block; margin-bottom: 0.5rem; font-size: 1.25rem; font-weight: 600;`}>
        Upload Excel File
      </label>
      <FileInput
        type="file"
        id="file-upload"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        title="Choose an Excel file to upload"
      />

      {/* Display File Data */}
      {fileData.length > 0 && (
        <TableWrapper>
          <h3 css={css`font-size: 1.5rem; margin-bottom: 1rem; color: #333;`}>Extracted Data</h3>
          <table css={css`width: 100%; border-collapse: collapse;`}>
            <thead>
              <tr>
                {Object.keys(fileData[0]).map((key) => (
                  <th key={key} css={css`padding: 0.5rem; background: #b3e5fc; border: 1px solid #90caf9; text-align: left;`}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fileData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <td key={colIndex} css={css`padding: 0.5rem; border: 1px solid #eee;`}>
                      {value}
                      <div css={css`margin-top: 0.25rem;`}>
                        <input
                          type="checkbox"
                          checked={selectedCells.some((cell) => cell.row === rowIndex && cell.col === key)}
                          onChange={() => handleCellSelect(rowIndex, key)}
                          css={css`margin-right: 0.5rem;`}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      )}

      {/* Dealer Assignment Section */}
      {fileData.length > 0 && (
        <DealerSection>
          <div css={css`display: flex; align-items: center;`}>
            <label css={css`margin-right: 1rem; font-size: 1.25rem;`}>Assign to Dealer:</label>
            <select
              value={selectedDealer}
              onChange={(e) => setSelectedDealer(e.target.value)}
              css={css`padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; background-color: #f5f5f5;`}
            >
              {dealers.map((dealer) => (
                <option key={dealer} value={dealer}>
                  {dealer}
                </option>
              ))}
            </select>
            <AssignButton onClick={handleAssignToDealer} disabled={selectedCells.length === 0}>
              Assign Selected Cells
            </AssignButton>
          </div>

          {/* Display Assigned Data */}
          {dealers.map((dealer) => (
            <div key={dealer} css={css`margin-top: 1.5rem;`}>
              <h3 css={css`font-size: 1.25rem; margin-bottom: 0.5rem;`}>{dealer}</h3>
              {dealerPrivileges[dealer] && dealerPrivileges[dealer].length > 0 ? (
                <table css={css`width: 100%; border-collapse: collapse; margin-top: 0.5rem;`}>
                  <thead>
                    <tr>
                      <th css={css`padding: 0.5rem; background: #b3e5fc; border: 1px solid #90caf9;`}>Row</th>
                      <th css={css`padding: 0.5rem; background: #b3e5fc; border: 1px solid #90caf9;`}>Column</th>
                      <th css={css`padding: 0.5rem; background: #b3e5fc; border: 1px solid #90caf9;`}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealerPrivileges[dealer].map((cell, index) => (
                      <tr key={index}>
                        <td css={css`padding: 0.5rem; border: 1px solid #eee;`}>{cell.row}</td>
                        <td css={css`padding: 0.5rem; border: 1px solid #eee;`}>{cell.col}</td>
                        <td css={css`padding: 0.5rem; border: 1px solid #eee;`}>{fileData[cell.row][cell.col]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p css={css`font-size: 1rem; color: #666;`}>No cells assigned yet.</p>
              )}
            </div>
          ))}
        </DealerSection>
      )}
    </PageWrapper>
  );
};

export default Products;
