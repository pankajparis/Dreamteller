import React, { useState } from 'react';
import { Moon, Book, Settings, Send, Share2, TrendingUp } from 'lucide-react';
import { dreamSymbols } from './dreamteller-database';
import { analyzeDreamPatterns } from './dreamteller-patterns';
import { interpretDream } from './dreamteller-logic';

export default function DreamTeller() {
  const [dreamText, setDreamText] = useState('');
  const [mood, setMood] = useState('neutral');
  const [dreams, setDreams] = useState([]);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [interpretation, setInterpretation] = useState(null);

  const handleDreamSubmission = () => {
    if (!dreamText.trim()) {
      alert('Please enter your dream');
      return;
    }

    const newInterpretation = interpretDream(dreamText, mood);
    const newDream = {
      text: dreamText,
      mood,
      date: new Date().toLocaleDateString(),
      interpretation: newInterpretation
    };

    setDreams([newDream, ...dreams]);
    setInterpretation(newInterpretation);
    
    if (dreams.length > 0) {
      const patterns = analyzeDreamPatterns([newDream, ...dreams]);
      setInterpretation({ ...newInterpretation, patterns });
    }

    setShowInterpretation(true);
  };

  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      <div className="bg-purple-600 text-white p-4">
        <h1 className="text-xl font-bold">DreamTeller</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!showInterpretation ? (
          <div className="p-4">
            <div className="bg-white rounded-lg shadow p-4">
              <textarea
                className="w-full h-32 p-3 border rounded-lg mb-4 resize-none"
                placeholder="Describe your dream..."
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
              />

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">How did you feel?</p>
                <div className="flex flex-wrap gap-2">
                  {['happy', 'peaceful', 'neutral', 'anxious', 'scared'].map((m) => (
                    <button
                      key={m}
                      className={`px-4 py-2 rounded-full text-sm ${
                        mood === m ? 'bg-purple-600 text-white' : 'bg-gray-200'
                      }`}
                      onClick={() => setMood(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="w-full bg-purple-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"
                onClick={handleDreamSubmission}
              >
                <Send size={18} />
                Interpret Dream
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Interpretation</h2>
              
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-gray-700">{interpretation.general}</p>
                </div>

                {interpretation.symbols.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-purple-600">{item.symbol}</p>
                    <p className="text-gray-700 mb-2">{item.meaning}</p>
                    {item.variations?.map((v, i) => (
                      <p key={i} className="text-sm text-gray-600">
                        • {v.variation}: {v.meaning}
                      </p>
                    ))}
                  </div>
                ))}

                {interpretation.patterns && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Pattern Analysis</h3>
                    {interpretation.patterns.map((pattern, index) => (
                      <p key={index} className="text-gray-600">• {pattern}</p>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="w-full bg-purple-600 text-white p-3 rounded-lg mt-4"
                onClick={() => {
                  setShowInterpretation(false);
                  setDreamText('');
                }}
              >
                New Dream
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t flex justify-around p-2">
        <button className="p-2 flex flex-col items-center text-purple-600">
          <Moon size={24} />
          <span className="text-xs">New Dream</span>
        </button>
        <button className="p-2 flex flex-col items-center text-gray-500">
          <Book size={24} />
          <span className="text-xs">History</span>
        </button>
        <button className="p-2 flex flex-col items-center text-gray-500">
          <Settings size={24} />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </div>
  );
}