import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Spreadsheet = ({ lesson }) => {
  const [data, setData] = useState([]);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    initializeSpreadsheet();
  }, [lesson]);

  const initializeSpreadsheet = () => {
    // Initialize with sample data based on lesson
    const sample = generateSampleData(lesson.id);
    setData(sample);
    setValidation(null);
  };

  const generateSampleData = (lessonId) => {
    // Generate appropriate sample data for each lesson
    const data = [];
    
    // Add headers and sample rows
    const headers = ['Product', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'];
    data.push(headers);
    data.push(['', '', '', '', '', '']);
    data.push(['Laptops', 15000, 18000, 22000, 25000, '']);
    data.push(['Phones', 12000, 14000, 16000, 18000, '']);
    data.push(['Tablets', 8000, 9000, 10000, 11000, '']);
    data.push(['', '', '', '', '', 'AVERAGE:']);
    data.push(['', '', '', '', '', '']);

    return data;
  };

  const handleCellChange = (row, col, value) => {
    const newData = [...data];
    if (!newData[row]) newData[row] = [];
    newData[row][col] = value;
    setData(newData);
  };

  const validateExercise = () => {
    // Simple validation - check if formulas are entered
    let hasFormula = false;
    for (let row of data) {
      for (let cell of row) {
        if (typeof cell === 'string' && cell.startsWith('=')) {
          hasFormula = true;
          break;
        }
      }
      if (hasFormula) break;
    }

    setValidation({
      correct: hasFormula,
      message: hasFormula 
        ? '✓ Great! You used a formula. Click Next to continue.' 
        : '⚠ Please enter a formula starting with = to complete this exercise.'
    });
  };

  return (
    <div className="spreadsheet-container">
      <div className="spreadsheet-toolbar">
        <h3>📋 Practice Spreadsheet</h3>
        <button className="btn-validate" onClick={validateExercise}>
          ✓ Check Answer
        </button>
      </div>

      <div className="spreadsheet-wrapper">
        <table className="excel-table">
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: 6 }).map((_, colIdx) => (
                  <td key={`${rowIdx}-${colIdx}`} className="excel-cell">
                    <input
                      type="text"
                      value={row?.[colIdx] || ''}
                      onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                      className="cell-input"
                      placeholder={`${String.fromCharCode(65 + colIdx)}${rowIdx + 1}`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {validation && (
        <div className={`validation-message ${validation.correct ? 'success' : 'error'}`}>
          {validation.correct ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <p>{validation.message}</p>
        </div>
      )}

      <div className="formula-hint">
        <p>💡 Hint: Try using formulas like =SUM(), =AVERAGE(), =IF(), =VLOOKUP()</p>
      </div>
    </div>
  );
};

export default Spreadsheet;
