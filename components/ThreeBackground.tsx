import React from 'react';

const ThreeBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            {/* Placeholder for Three.js Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 pointer-events-none" />
        </div>
    );
};

export default ThreeBackground;
