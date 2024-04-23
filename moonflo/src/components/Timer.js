import React, { useEffect, useState } from 'react';
import './Timer.css';

const Timer = () => {
    const [selectedTime, setSelectedTime] = useState(""); // Default time (5 minutes)
    const [timeLeft, setTimeLeft] = useState(300);
    const [timerId, setTimerId] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const radius = 100; // Set the radius to 100
    const strokeWidth = 10; // Define stroke width
    const svgSize = 2 * (radius + strokeWidth); // Calculate the required SVG size to prevent clipping
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
        const newTime = event.target.value;
        setSelectedTime(newTime);
        setTimeLeft(parseInt(newTime)); // Update the timeLeft state with the new value
        setIsActive(false); // Optionally reset the timer (stop it) when time is changed
    };
    

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Formats time as "M:SS"
    };

    const strokeDashoffset = () => {
        // The proportion of the time left based on the selected time.
        const timeRatio = timeLeft / parseInt(selectedTime);
        return circumference - timeRatio * circumference;
      };

    return (
        <div className="timer">
            <h3>Enjoy Your Meditation</h3>
            <h3> Session!</h3>
            <svg width={svgSize} height={svgSize}>
                <circle
                    stroke="deepskyblue"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset()}
                    r={radius}
                    cx={radius + strokeWidth} // Centered by adding the radius + stroke width
                    cy={radius + strokeWidth} // Centered by adding the radius + stroke width
                />
                <text x="50%" y="50%" dy=".3em" textAnchor="middle">
                    {formatTime()}
                </text>
            </svg>
            <p> </p>
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
