'use client';
import React, { useState } from 'react';

interface MiniQuizProps {
  questions: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export function MiniQuiz({ questions }: MiniQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[currentIdx];
  const isCorrect = selectedIdx === q.answerIndex;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedIdx(idx);
    setShowResult(true);
  };

  const nextQuestion = () => {
    setCurrentIdx((prev) => prev + 1);
    setSelectedIdx(null);
    setShowResult(false);
  };

  if (currentIdx >= questions.length) {
    return (
      <div className="p-8 bg-bg-card rounded-xl border border-border text-center">
        <div className="text-3xl mb-4">🏆</div>
        <h3 className="text-xl font-heading font-bold mb-2">Quiz Complete!</h3>
        <p className="text-text-secondary mb-6">Great job testing your knowledge.</p>
        <button onClick={() => { setCurrentIdx(0); setSelectedIdx(null); setShowResult(false); }} className="btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-bg-card rounded-xl border border-border">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-heading font-bold text-amber">Check Yourself</h3>
        <span className="text-sm font-mono text-text-muted">
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      <p className="text-lg mb-6">{q.question}</p>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let btnClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
          
          if (!showResult) {
            btnClass += "border-border bg-bg hover:border-amber/50 hover:bg-bg-elevated cursor-pointer";
          } else {
            if (idx === q.answerIndex) {
              btnClass += "border-green-500 bg-green-500/10 text-green-400";
            } else if (idx === selectedIdx) {
              btnClass += "border-red-500 bg-red-500/10 text-red-400";
            } else {
              btnClass += "border-border bg-bg opacity-50 cursor-default";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
              className={btnClass}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-xs
                  ${showResult && idx === q.answerIndex ? 'border-green-500 bg-green-500 text-bg' : 
                    showResult && idx === selectedIdx ? 'border-red-500 bg-red-500 text-bg' : 'border-text-muted'}
                `}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <div className="font-bold mb-1 flex items-center gap-2">
            {isCorrect ? <span className="text-green-500">✓ Correct</span> : <span className="text-red-500">✗ Incorrect</span>}
          </div>
          <p className="text-sm text-text-secondary">{q.explanation}</p>
        </div>
      )}

      {showResult && (
        <div className="flex justify-end">
          <button onClick={nextQuestion} className="btn-primary">
            {currentIdx === questions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}

export function Challenge({ goal, isSuccess }: { goal: string, isSuccess: boolean }) {
  return (
    <div className={`p-4 rounded-lg border transition-all duration-500 ${isSuccess ? 'bg-green-900/20 border-green-500/50' : 'bg-bg-elevated border-border'}`}>
      <div className="flex items-start gap-4">
        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-500 ${isSuccess ? 'bg-green-500 text-bg' : 'bg-bg border border-text-muted text-text-muted'}`}>
          {isSuccess ? '✓' : '!'}
        </div>
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-text-secondary mb-1">Challenge</h4>
          <p className={`${isSuccess ? 'text-green-400 font-medium' : 'text-text-primary'}`}>{goal}</p>
        </div>
      </div>
    </div>
  );
}

export function LiveSummary({ message }: { message: string }) {
  return (
    <div 
      className="p-3 bg-amber/10 border border-amber/30 rounded text-amber-light text-sm italic"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
