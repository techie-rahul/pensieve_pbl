import { useState, useEffect, useRef, useCallback } from 'react';
import BrainOrb from '../components/BrainOrb';
import { saveEntry, generateId } from '../utils/storage';

export default function Write() {
    const [text, setText] = useState('');
    const [currentEntryId, setCurrentEntryId] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [saved, setSaved] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const typingTimeoutRef = useRef(null);
    const autosaveIntervalRef = useRef(null);
    const textareaRef = useRef(null);

    // Start a new entry on mount
    useEffect(() => {
        const id = generateId();
        setCurrentEntryId(id);
        textareaRef.current?.focus();
    }, []);

    // Update word count
    useEffect(() => {
        const count = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
        setWordCount(count);
    }, [text]);

    // Autosave every 3 seconds
    const doSave = useCallback(() => {
        if (text.trim().length > 0 && currentEntryId) {
            saveEntry({
                id: currentEntryId,
                text: text.trim(),
                timestamp: new Date().toISOString(),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    }, [text, currentEntryId]);

    useEffect(() => {
        autosaveIntervalRef.current = setInterval(() => {
            doSave();
        }, 3000);

        return () => clearInterval(autosaveIntervalRef.current);
    }, [doSave]);

    // Typing detection
    const handleTextChange = (e) => {
        setText(e.target.value);
        setIsTyping(true);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1500);
    };

    // New entry button
    const handleNewEntry = () => {
        doSave(); // save current first
        setText('');
        setCurrentEntryId(generateId());
        textareaRef.current?.focus();
    };

    return (
        <div className="write-page">
            <div className="write-container">
                {/* Header area */}
                <div className="write-header">
                    <div>
                        <h1 className="write-title">What's on your mind?</h1>
                        <p className="write-subtitle">
                            A quiet space for your thoughts. Write freely.
                        </p>
                    </div>
                    <button
                        onClick={handleNewEntry}
                        className="new-entry-btn"
                        disabled={text.trim().length === 0}
                    >
                        <span>+</span> New Entry
                    </button>
                </div>

                {/* Editor area */}
                <div className="write-editor-wrapper">
                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Start writing here…"
                        className="write-textarea"
                        spellCheck={false}
                    />

                    {/* Bottom status bar */}
                    <div className="write-status-bar">
                        <span className="write-word-count">{wordCount} words</span>
                        <span className={`write-save-status ${saved ? 'visible' : ''}`}>
                            Saved
                        </span>
                    </div>
                </div>
            </div>

            {/* Brain Orb companion */}
            <div className="write-orb-area">
                <BrainOrb isTyping={isTyping} />
            </div>
        </div>
    );
}
