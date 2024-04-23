import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(300); // Default time (5 minutes)
    const [timerId, setTimerId] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const id = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            setTimerId(id);
        } else if (!isActive && timeLeft === 0) {
            setIsActive(false); // Automatically stop the timer when it reaches zero
        } else if (!isActive && timerId) {
            clearTimeout(timerId);
        }
        return () => clearTimeout(timerId);
    }, [isActive, timeLeft]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleChangeTime = (event) => {
        setTimeLeft(parseInt(event.target.value));
        setIsActive(false); // Reset the timer (stop it) when time is changed
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Formats time as "M:SS"
    };

    const strokeDashoffset = () => circumference - (timeLeft / 300) * circumference;

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
                    {formatTime()}
                </text>
            </svg>
            <div>
                <select onChange={handleChangeTime} value={timeLeft}>
                    <option value="300">5 Minutes</option>
                    <option value="600">10 Minutes</option>
                    <option value="900">15 Minutes</option>
                </select>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
            </div>
        </div>
    );
};

export default Timer;
