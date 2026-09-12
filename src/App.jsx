import React, { useState, useEffect } from 'react';
import { BookOpen, Target, BarChart3, Trophy } from 'lucide-react';
import LessonPanel from './components/LessonPanel';
import Spreadsheet from './components/Spreadsheet';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

const App = () => {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  const lessons = {
    beginner: [
      {
        id: 1,
        title: 'Cell Navigation & Selection',
        description: 'Learn how to navigate and select cells in Excel',
        objective: 'Master basic cell selection techniques',
        content: 'Excel is organized in rows and columns. Each cell has an address like A1, B2, etc. Click cells to select them, or drag to select multiple cells.',
        exercise: 'Select cells A1 to D5 and format them with a blue background',
        difficulty: 'Easy'
      },
      {
        id: 2,
        title: 'Data Entry & Formatting',
        description: 'Enter data and format cells professionally',
        objective: 'Learn data entry and cell formatting',
        content: 'You can enter text, numbers, and dates into cells. Format them with colors, bold, italic, and borders to make spreadsheets look professional.',
        exercise: 'Enter product names in column A, prices in B, and quantities in C. Make headers bold.',
        difficulty: 'Easy'
      },
      {
        id: 3,
        title: 'Basic Formulas - SUM',
        description: 'Learn to create SUM formulas',
        objective: 'Master the SUM formula',
        content: 'The SUM formula adds numbers together. Syntax: =SUM(range). Example: =SUM(A1:A5) adds cells A1 through A5.',
        exercise: 'Create =SUM(B2:B4) to total the sales amounts',
        difficulty: 'Easy'
      },
      {
        id: 4,
        title: 'AVERAGE & COUNT Functions',
        description: 'Calculate average and count values',
        objective: 'Use AVERAGE and COUNT functions',
        content: 'AVERAGE: calculates mean of numbers. COUNT: counts how many numbers are in a range. Syntax: =AVERAGE(range) and =COUNT(range)',
        exercise: 'Add =AVERAGE(B2:B4) and =COUNT(B2:B4) formulas',
        difficulty: 'Easy'
      },
      {
        id: 5,
        title: 'Cell References - Absolute vs Relative',
        description: 'Understand absolute vs relative references',
        objective: 'Master cell reference types',
        content: 'Relative: A1 (changes when copied). Absolute: $A$1 (stays same). Use $ to lock rows/columns: $A1, A$1, or $A$1',
        exercise: 'Create a formula with absolute reference ($A$1) and copy it down',
        difficulty: 'Easy'
      }
    ],
    intermediate: [
      {
        id: 6,
        title: 'IF Function - Decision Making',
        description: 'Create conditional formulas with IF',
        objective: 'Master IF logic statements',
        content: 'IF(condition, value_if_true, value_if_false). Example: =IF(B2>1000,"High","Low") checks if B2 is greater than 1000.',
        exercise: 'Create =IF(B2>5000,"Premium","Standard") in column D',
        difficulty: 'Medium'
      },
      {
        id: 7,
        title: 'VLOOKUP - Data Lookup',
        description: 'Search and return values from tables',
        objective: 'Master VLOOKUP function',
        content: 'VLOOKUP(lookup_value, table_array, col_index, FALSE). Searches first column and returns value from specified column.',
        exercise: 'Use VLOOKUP to find prices from a price list table',
        difficulty: 'Medium'
      },
      {
        id: 8,
        title: 'Pivot Tables Basics',
        description: 'Summarize data with pivot tables',
        objective: 'Create your first pivot table',
        content: 'Pivot tables automatically group and summarize data. Great for analyzing large datasets and finding patterns.',
        exercise: 'Create a pivot table to sum sales by product category',
        difficulty: 'Medium'
      },
      {
        id: 9,
        title: 'Charts & Visualization',
        description: 'Create professional charts',
        objective: 'Master chart creation',
        content: 'Bar, Line, Pie charts help visualize trends. Column charts compare values. Line charts show trends over time.',
        exercise: 'Create a bar chart showing sales by quarter',
        difficulty: 'Medium'
      },
      {
        id: 10,
        title: 'Data Validation',
        description: 'Control data entry with validation rules',
        objective: 'Implement data validation',
        content: 'Restrict cell input to specific values, ranges, or lists. Create dropdown menus for consistent data entry.',
        exercise: 'Add dropdown lists with predefined product categories',
        difficulty: 'Medium'
      }
    ],
    advanced: [
      {
        id: 11,
        title: 'INDEX-MATCH Advanced Lookup',
        description: 'Powerful alternative to VLOOKUP',
        objective: 'Master INDEX-MATCH combination',
        content: '=INDEX(return_array, MATCH(lookup_value, lookup_array, 0)). More flexible than VLOOKUP - can search left and right.',
        exercise: 'Replace a VLOOKUP with INDEX-MATCH formula',
        difficulty: 'Hard'
      },
      {
        id: 12,
        title: 'SUMIFS & COUNTIFS',
        description: 'Sum/Count with multiple conditions',
        objective: 'Master conditional aggregation',
        content: 'SUMIFS and COUNTIFS allow multiple criteria. Example: =SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)',
        exercise: 'Sum sales where region="North" AND product="A"',
        difficulty: 'Hard'
      },
      {
        id: 13,
        title: 'Array Formulas',
        description: 'Perform calculations on multiple values',
        objective: 'Master array formula concepts',
        content: 'Array formulas process multiple values at once. Enter with Ctrl+Shift+Enter. Shown with curly braces {}.',
        exercise: 'Create array formula: {=SUM(IF(range>100, range, 0))}',
        difficulty: 'Hard'
      },
      {
        id: 14,
        title: 'Dashboard Creation',
        description: 'Build interactive data dashboards',
        objective: 'Create a professional dashboard',
        content: 'Combine charts, tables, and formulas. Use slicers for interactivity. Focus on key metrics and trends.',
        exercise: 'Create a sales dashboard with KPIs, charts, and filters',
        difficulty: 'Hard'
      },
      {
        id: 15,
        title: 'Capstone: Real-World Data Analysis',
        description: 'Complete a comprehensive analysis project',
        objective: 'Apply all learned skills to real data',
        content: 'Analyze a complete dataset: clean data, create summaries, build visualizations, and generate insights.',
        exercise: 'Analyze sales data: identify top performers, trends, and make recommendations',
        difficulty: 'Hard'
      }
    ]
  };

  const currentLessonData = lessons[currentLevel][currentLesson];

  const handleCompleteLesson = () => {
    const lessonKey = `${currentLevel}-${currentLesson}`;
    if (!completedLessons.includes(lessonKey)) {
      setCompletedLessons([...completedLessons, lessonKey]);
    }
    
    if (currentLesson < lessons[currentLevel].length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    setCurrentLesson(0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📊 Excel Master Learning Platform</h1>
          <p>Learn Excel with Real Data & Practical Exercises</p>
        </div>
      </header>

      <div className="level-selector">
        <button
          className={`level-btn ${currentLevel === 'beginner' ? 'active' : ''}`}
          onClick={() => handleLevelChange('beginner')}
        >
          <BookOpen size={20} /> Beginner
        </button>
        <button
          className={`level-btn ${currentLevel === 'intermediate' ? 'active' : ''}`}
          onClick={() => handleLevelChange('intermediate')}
        >
          <Target size={20} /> Intermediate
        </button>
        <button
          className={`level-btn ${currentLevel === 'advanced' ? 'active' : ''}`}
          onClick={() => handleLevelChange('advanced')}
        >
          <BarChart3 size={20} /> Advanced
        </button>
      </div>

      <div className="main-content">
        <div className="lesson-area">
          <LessonPanel
            lesson={currentLessonData}
            level={currentLevel}
            onComplete={handleCompleteLesson}
          />
        </div>
        
        <div className="spreadsheet-area">
          <Spreadsheet lesson={currentLessonData} />
        </div>
      </div>

      <ProgressTracker
        currentLevel={currentLevel}
        currentLesson={currentLesson}
        totalLessons={lessons[currentLevel].length}
        completedLessons={completedLessons}
      />
    </div>
  );
};

export default App;
