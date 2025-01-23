export const analyzeDreamPatterns = (dreams) => {
  const patterns = [];
  
  // Analyze recurring symbols
  const symbolCount = {};
  dreams.forEach(dream => {
    dream.interpretation.symbols.forEach(symbol => {
      symbolCount[symbol.symbol] = (symbolCount[symbol.symbol] || 0) + 1;
    });
  });

  Object.entries(symbolCount)
    .filter(([_, count]) => count > 1)
    .forEach(([symbol, count]) => {
      patterns.push(`Recurring symbol: ${symbol} appears in ${count} dreams`);
    });

  // Analyze mood patterns
  const moodCount = {};
  dreams.forEach(dream => {
    moodCount[dream.mood] = (moodCount[dream.mood] || 0) + 1;
  });

  const dominantMood = Object.entries(moodCount)
    .sort(([,a], [,b]) => b - a)[0];
  
  if (dominantMood) {
    patterns.push(`Dominant emotion: ${dominantMood[0]} (${Math.round(dominantMood[1]/dreams.length * 100)}% of dreams)`);
  }

  // Analyze emotional progression
  const recentMoods = dreams.slice(0, 3).map(d => d.mood);
  if (recentMoods.every(mood => mood === 'peaceful' || mood === 'happy')) {
    patterns.push('Recent dreams show positive emotional state');
  } else if (recentMoods.every(mood => mood === 'anxious' || mood === 'scared')) {
    patterns.push('Recent dreams suggest processing challenges');
  }

  return patterns;
};