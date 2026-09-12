import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

const ProgressTracker = ({ currentLevel, currentLesson, totalLessons, completedLessons }) => {
  const progressPercentage = Math.round(((currentLesson + 1) / totalLessons) * 100);

  return (
    <div className="progress-tracker">
      <div className="progress-section">
        <div className="progress-info">
          <div className="progress-title">
            <TrendingUp size={18} />
            <span>Your Progress</span>
          </div>
          <p className="progress-text">
            Lesson {currentLesson + 1} of {totalLessons}
          </p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="progress-percentage">{progressPercentage}%</p>
      </div>

      <div className="stats-section">
        <div className="stat-card">
          <Trophy size={20} />
          <div>
            <p className="stat-label">Completed</p>
            <p className="stat-value">{completedLessons.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={20} />
          <div>
            <p className="stat-label">Current Level</p>
            <p className="stat-value">{currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
