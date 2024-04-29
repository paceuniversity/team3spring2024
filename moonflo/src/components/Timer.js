import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = ({ onStatusChange }) => {
    const [selectedTime, setSelectedTime] = useState(""); // No default time selected initially
    const [timeLeft, setTimeLeft] = useState(0); 
    const [timerId, setTimerId] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const radius = 100;
    const strokeWidth = 10;
    const svgSize = 2 * (radius + strokeWidth); 
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const id = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            setTimerId(id);
        } else if (timeLeft === 0 || !isActive) {
            clearTimeout(timerId);
            setIsActive(false); // Automatically stop the timer when it reaches zero or is paused
            onStatusChange(isActive); // Notify parent component about timer status change
        }
        return () => clearTimeout(timerId);
    }, [isActive, timeLeft]);

    const handleStart = () => {
        if (timeLeft > 0) {
            setIsActive(true);
            onStatusChange(true); // Notify parent component that timer is started
        }
    };

    const handlePause = () => {
        setIsActive(false);
        onStatusChange(false); // Notify parent component that timer is paused
    };

    const handleChangeTime = (event) => {
        const newTime = parseInt(event.target.value);
        setSelectedTime(event.target.value); // Store the selected option
        setTimeLeft(newTime); // Update the time left
        setIsActive(false); // Stop the timer
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const strokeDashoffset = () => {
        if (selectedTime) { 
            const timeRatio = timeLeft / parseInt(selectedTime);
            return circumference * (1 - timeRatio); 
        }
        return circumference; 
    };

    return (
        <div className="timer">
            <h3>Enjoy Your Meditation</h3>
            <h3>Session!</h3>
            <svg width={svgSize} height={svgSize}>
                <circle
                    stroke="#d3d3d3"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                />

                <circle
                    stroke="#d6b2be" 
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset()}
                    r={radius}
                    cx={radius + strokeWidth}
                    cy={radius + strokeWidth}
                />
                <text x="50%" y="50%" dy=".3em" textAnchor="middle">
                    {formatTime()}
                </text>
            </svg>
            <div>
                <select onChange={handleChangeTime} value={selectedTime}>
                    <option value="" disabled>Select Time</option>
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
