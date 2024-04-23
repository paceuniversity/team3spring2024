import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ seconds }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const strokeDashoffset = () => circumference - (timeLeft / seconds) * circumference;

    return (
        <div className="timer">
            <svg width="120" height="120">
                <circle
                    stroke="deepskyblue"
                    fill="transparent"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset()}
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <text x="50%" y="50%" dy=".3em" textAnchor="middle">
                    {timeLeft}s
                </text>
            </svg>
        </div>
    );
};

export default Timer;
