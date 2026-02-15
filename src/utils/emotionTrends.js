/**
 * Emotion categories with associated keywords.
 * Each keyword is matched case-insensitively against entry text.
 */
const EMOTION_CATEGORIES = [
    {
        name: 'Anxiety',
        keywords: ['worry', 'uncertain', 'stress', 'control', 'what if'],
        color: '#f59e0b',
    },
    {
        name: 'Sadness',
        keywords: ['lonely', 'down', 'tired', 'empty'],
        color: '#6b7280',
    },
    {
        name: 'Growth',
        keywords: ['learn', 'improve', 'future', 'progress', 'grow'],
        color: '#2dd4bf',
    },
    {
        name: 'Gratitude',
        keywords: ['thankful', 'grateful', 'appreciate', 'blessed'],
        color: '#5eead4',
    },
];

/**
 * Analyze all entries and return emotion trend counts.
 * An entry counts toward an emotion if its text contains
 * at least one keyword for that category.
 *
 * @param {Array} entries - Array of { id, text, timestamp }
 * @returns {Array} Sorted array of { name, icon, color, count }
 */
export function analyzeEmotionTrends(entries) {
    if (!entries || entries.length === 0) {
        return EMOTION_CATEGORIES.map((cat) => ({
            name: cat.name,
            color: cat.color,
            count: 0,
        }));
    }

    return EMOTION_CATEGORIES.map((cat) => {
        let count = 0;

        for (const entry of entries) {
            const lowerText = entry.text.toLowerCase();
            const hasMatch = cat.keywords.some((kw) => lowerText.includes(kw));
            if (hasMatch) count++;
        }

        return {
            name: cat.name,
            color: cat.color,
            count,
        };
    }).sort((a, b) => b.count - a.count);
}
