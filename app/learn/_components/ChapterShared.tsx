import React from 'react';
import { Chapter, getAdjacentChapters } from '../_content/chapters';
import Link from 'next/link';

export function ChapterNav({ chapter }: { chapter: Chapter }) {
  const { prev, next } = getAdjacentChapters(chapter.slug);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-border">
      <div className="w-full sm:w-1/2 flex justify-start">
        {prev ? (
          <Link href={`/learn/${prev.slug}`} className="group flex flex-col">
            <span className="text-xs text-text-muted uppercase tracking-wider mb-1 group-hover:text-amber transition-colors">
              Previous
            </span>
            <span className="text-lg font-medium text-text-primary group-hover:text-text-primary transition-colors flex items-center gap-2">
              <span className="text-amber">←</span> {prev.number} {prev.title}
            </span>
          </Link>
        ) : (
          <Link href="/learn" className="text-sm text-text-muted hover:text-amber transition-colors">
            ← Back to Contents
          </Link>
        )}
      </div>

      <div className="w-full sm:w-1/2 flex justify-end text-right">
        {next ? (
          <Link href={`/learn/${next.slug}`} className="group flex flex-col items-end">
            <span className="text-xs text-text-muted uppercase tracking-wider mb-1 group-hover:text-amber transition-colors">
              Next
            </span>
            <span className="text-lg font-medium text-text-primary group-hover:text-text-primary transition-colors flex items-center gap-2">
              {next.number} {next.title} <span className="text-amber">→</span>
            </span>
          </Link>
        ) : (
          <Link href="/learn" className="text-sm text-text-muted hover:text-amber transition-colors">
            Back to Contents →
          </Link>
        )}
      </div>
    </div>
  );
}

export function SourcesFooter({ sources }: { sources: string[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-12 p-6 bg-bg-card rounded-lg border border-border text-sm text-text-muted">
      <h4 className="font-semibold text-text-secondary mb-2 uppercase tracking-wider text-xs">Sources & References</h4>
      <ul className="list-disc pl-5 space-y-1">
        {sources.map((source, i) => (
          <li key={i}>{source}</li>
        ))}
      </ul>
      <p className="mt-4 text-xs italic text-text-muted/60">
        * Note: Camera specifications, dynamic range figures, and exact rules of thumb are approximate 
        and vary by manufacturer and model. Always test with your specific equipment.
      </p>
    </div>
  );
}

export function WorkedExample({ formula, values, result }: { formula: string, values: string, result: string }) {
  return (
    <div className="my-6 p-4 bg-bg-card/50 border-l-4 border-amber rounded-r-lg font-mono text-sm overflow-x-auto">
      <div className="text-text-secondary mb-1">Formula: <span className="text-amber-light">{formula}</span></div>
      <div className="text-text-secondary mb-2">Values:  <span className="text-text-primary">{values}</span></div>
      <div className="text-text-primary font-bold">Result:  <span className="text-green-400">{result}</span></div>
    </div>
  );
}
