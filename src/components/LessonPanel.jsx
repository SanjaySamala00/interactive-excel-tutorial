import React from 'react';
import { BookOpen, Target, AlertCircle } from 'lucide-react';

const LessonPanel = ({ lesson, level, onComplete }) => {
  return (
    <div className="lesson-panel">
      <div className="lesson-header">
        <div className="lesson-meta">
          <span className="level-badge">{level.toUpperCase()}</span>
          <span className="difficulty-badge">{lesson.difficulty}</span>
        </div>
        <h2>{lesson.title}</h2>
        <p className="lesson-subtitle">{lesson.description}</p>
      </div>

      <div className="lesson-content">
        <section className="lesson-section">
          <div className="section-header">
            <Target size={20} />
            <h3>Learning Objective</h3>
          </div>
          <p>{lesson.objective}</p>
        </section>

        <section className="lesson-section">
          <div className="section-header">
            <BookOpen size={20} />
            <h3>Concept Explanation</h3>
          </div>
          <p>{lesson.content}</p>
        </section>

        <section className="lesson-section">
          <div className="section-header">
            <AlertCircle size={20} />
            <h3>Your Exercise</h3>
          </div>
          <div className="exercise-box">
            <p className="exercise-text">{lesson.exercise}</p>
          </div>
        </section>

        <section className="lesson-section">
          <h3>💡 Quick Tips</h3>
          <ul className="tips-list">
            <li>Read the exercise carefully before starting</li>
            <li>Check your work using the "Check Answer" button</li>
            <li>Use the hints if you get stuck</li>
            <li>Try different approaches - there's often multiple ways!</li>
          </ul>
        </section>
      </div>

      <div className="lesson-footer">
        <button className="btn-primary" onClick={onComplete}>
          Mark as Complete & Next Lesson →
        </button>
      </div>
    </div>
  );
};

export default LessonPanel;
