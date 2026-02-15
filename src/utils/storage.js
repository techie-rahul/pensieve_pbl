const ENTRIES_KEY = 'pensieve_entries';

/**
 * Get all journal entries from localStorage.
 * @returns {Array} Array of entry objects sorted by date descending.
 */
export function getEntries() {
    try {
        const raw = localStorage.getItem(ENTRIES_KEY);
        if (!raw) return [];
        const entries = JSON.parse(raw);
        return entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch {
        return [];
    }
}

/**
 * Save a new journal entry or update an existing one.
 * @param {Object} entry - { id, text, timestamp }
 */
export function saveEntry(entry) {
    const entries = getEntries();
    const existingIndex = entries.findIndex((e) => e.id === entry.id);

    if (existingIndex >= 0) {
        entries[existingIndex] = { ...entries[existingIndex], ...entry };
    } else {
        entries.push(entry);
    }

    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

/**
 * Delete a journal entry by ID.
 * @param {string} id
 */
export function deleteEntry(id) {
    const entries = getEntries().filter((e) => e.id !== id);
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

/**
 * Generate a unique ID for entries.
 * @returns {string}
 */
export function generateId() {
    return `entry_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Check if reflection conditions are met:
 * - At least 3 entries
 * @returns {{ unlocked: boolean, reason: string }}
 */
export function checkReflectionUnlock() {
    const entries = getEntries();

    if (entries.length < 3) {
        return {
            unlocked: false,
            reason: `Write at least 3 entries to unlock reflections.`,
            entriesCount: entries.length,
            requiredEntries: 3,
        };
    }

    return {
        unlocked: true,
        reason: 'Reflections unlocked!',
        entriesCount: entries.length,
    };
}
