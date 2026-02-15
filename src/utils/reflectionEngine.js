import concepts from '../data/concepts.json';
import { getEntries } from './storage';

/**
 * Tokenize entry text into lowercase words and bigrams.
 * @param {string} text
 * @returns {string[]}
 */
function tokenize(text) {
    const lower = text.toLowerCase();
    const words = lower.match(/[a-z']+/g) || [];
    // Also create bigrams for multi-word keywords like "what if", "not enough"
    const bigrams = [];
    for (let i = 0; i < words.length - 1; i++) {
        bigrams.push(`${words[i]} ${words[i + 1]}`);
    }
    return [...words, ...bigrams, lower]; // include full text for phrase matching
}

/**
 * Check if a keyword appears in tokenized entry content.
 * @param {string} keyword
 * @param {string[]} tokens
 * @param {string} rawText
 * @returns {boolean}
 */
function keywordInEntry(keyword, tokens, rawText) {
    const lowerKeyword = keyword.toLowerCase();
    // Check direct token match
    if (tokens.includes(lowerKeyword)) return true;
    // Check substring match in raw text for multi-word phrases
    if (rawText.toLowerCase().includes(lowerKeyword)) return true;
    return false;
}

/**
 * Analyze all entries against a single concept.
 * @param {Object} concept
 * @param {Array} entries
 * @returns {Object|null} Analysis result or null if threshold not met.
 */
function analyzeConcept(concept, entries) {
    const matchedEntries = new Map(); // entryId -> matched keywords
    const keywordCounts = {};

    for (const entry of entries) {
        const tokens = tokenize(entry.text);
        const rawText = entry.text;
        const matchedKeywordsForEntry = [];

        for (const keyword of concept.keywords) {
            if (keywordInEntry(keyword, tokens, rawText)) {
                matchedKeywordsForEntry.push(keyword);
                keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
            }
        }

        if (matchedKeywordsForEntry.length > 0) {
            matchedEntries.set(entry.id, {
                entryId: entry.id,
                timestamp: entry.timestamp,
                preview: entry.text.slice(0, 80),
                matchedKeywords: matchedKeywordsForEntry,
            });
        }
    }

    const hitCount = matchedEntries.size;

    // Only generate insight if theme appears in >= 3 different entries
    if (hitCount < 3) return null;

    // Confidence = min(0.8, hitCount / totalEntries)
    const confidence = Math.min(0.8, hitCount / entries.length);

    // Get all unique matched keywords
    const allMatchedKeywords = [
        ...new Set(
            Array.from(matchedEntries.values()).flatMap((e) => e.matchedKeywords)
        ),
    ];

    // Build insight text from template
    const insightText = concept.insightTemplate
        .replace('{hitCount}', hitCount)
        .replace('{totalEntries}', entries.length);

    // Build why explanation
    const frequencyStr = Object.entries(keywordCounts)
        .map(([k, v]) => `"${k}" × ${v}`)
        .join(', ');

    const whyText = concept.whyExplanation
        .replace('{matchedKeywords}', allMatchedKeywords.map((k) => `"${k}"`).join(', '))
        .replace('{frequency}', frequencyStr);

    return {
        conceptId: concept.id,
        conceptName: concept.name,
        citation: concept.citation,
        description: concept.description,
        insightText,
        whyText,
        confidence: Math.round(confidence * 100),
        hitCount,
        totalEntries: entries.length,
        matchedKeywords: allMatchedKeywords,
        keywordCounts,
        matchedEntries: Array.from(matchedEntries.values()),
    };
}

/**
 * Generate reflections by analyzing all journal entries.
 * Returns the strongest matching concept (highest confidence).
 * @returns {Object|null} The best reflection or null.
 */
export function generateReflection() {
    const entries = getEntries();

    if (entries.length < 3) return null;

    const results = [];

    for (const concept of concepts) {
        const result = analyzeConcept(concept, entries);
        if (result) {
            results.push(result);
        }
    }

    if (results.length === 0) return null;

    // Return the one with highest confidence (most evidence)
    results.sort((a, b) => b.confidence - a.confidence || b.hitCount - a.hitCount);
    return results[0];
}

/**
 * Generate ALL reflections (for displaying multiple cards if desired).
 * @returns {Array}
 */
export function generateAllReflections() {
    const entries = getEntries();

    if (entries.length < 3) return [];

    const results = [];

    for (const concept of concepts) {
        const result = analyzeConcept(concept, entries);
        if (result) {
            results.push(result);
        }
    }

    results.sort((a, b) => b.confidence - a.confidence || b.hitCount - a.hitCount);
    return results;
}

/**
 * Get keyword frequency stats across all entries.
 * @returns {Object} { word: count }
 */
export function getKeywordStats() {
    const entries = getEntries();
    const freq = {};

    for (const entry of entries) {
        const words = entry.text.toLowerCase().match(/[a-z']+/g) || [];
        const unique = [...new Set(words)];
        for (const word of unique) {
            freq[word] = (freq[word] || 0) + 1;
        }
    }

    return freq;
}
