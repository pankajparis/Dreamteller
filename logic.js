import { dreamSymbols, moodAnalysis } from './dreamteller-database';

export const interpretDream = (text, mood) => {
  // Find symbols in dream text
  const foundSymbols = Object.entries(dreamSymbols)
    .filter(([symbol]) => text.toLowerCase().includes(symbol))
    .map(([symbol, data]) => {
      const variations = Object.entries(data.variations || {})
        .filter(([key]) => text.toLowerCase().includes(key))
        .map(([key, meaning]) => ({ variation: key, meaning }));

      return {
        symbol,
        meaning: data.basic,
        variations
      };
    });

  // Get mood-based interpretation
  const moodInsights = moodAnalysis[mood] || moodAnalysis.neutral;
  const generalMeaning = moodInsights[Math.floor(Math.random() * moodInsights.length)];

  return {
    general: generalMeaning,
    symbols: foundSymbols,
    mood
  };
};