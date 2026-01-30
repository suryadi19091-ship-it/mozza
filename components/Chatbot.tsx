import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-16 right-0 w-80 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4"
                    >
                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                            <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="h-48 flex items-center justify-center text-zinc-500 text-xs">
                            Chat interface placeholder
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 transition-colors"
            >
                <MessageSquare size={24} />
            </button>
        </div>
    );
};

export default Chatbot;
