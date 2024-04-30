import React, { useEffect, useState } from 'react';
import './Timer.css';
import { Button } from 'react-bootstrap';

const Timer = ({ onStatusChange, onPauseMusic }) => {
    const [selectedValue, setSelectedValue] = useState(""); 
    const [timeLeft, setTimeLeft] = useState("");
    const [timerId, setTimerId] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false); 
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
        } else if (timeLeft === 0 ) {
            clearTimeout(timerId);
            setIsActive(false);
            setTimeLeft(parseInt(selectedValue)); // Reset timer to selected value
            onStatusChange(false); // Notify parent component that timer has ended
        }
        return () => clearTimeout(timerId);
    }, [isActive, timeLeft, selectedValue]);
    
    const handleStartCancel = () => {
        if (!selectedValue) {
            console.error("Please select a time before starting.");
            return;
        }
        if (isActive) {
            setIsActive(false);
            setTimeLeft(parseInt(selectedValue)); // Reset the selected time
            setTimeLeft(0); // Reset the timer
            clearTimeout(timerId);
            setIsPaused(false);
        } else {
            setIsActive(true);
            setIsPaused(false);
            onStatusChange(true);
        }
    };
    
    const handlePauseResume = () => {
        if (isPaused) {
            // Resume the timer
            setTimerId(setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000));
        } else {
            // Pause the timer
            clearTimeout(timerId);
        }
        setIsPaused(!isPaused);
        onPauseMusic(!isPaused); // Pause or resume the music
    };

    const handleChangeTime = (event) => {
        const newTime = parseInt(event.target.value);
        setSelectedValue(event.target.value);
        setTimeLeft(newTime);
        setIsActive(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const strokeDashoffset = () => {
        if (selectedValue) { 
            const timeRatio = timeLeft / parseInt(selectedValue);
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
                <select onChange={handleChangeTime} value={selectedValue}>
                    <option value="" disabled>Select Time</option>
                    <option value="5">5 Minutes</option>
                    <option value="600">10 Minutes</option>
                    <option value="900">15 Minutes</option>
                </select>
                <Button className="timer-button" onClick={handleStartCancel}>
                    {isActive ? "Cancel" : "Start"}
                </Button>
                {isActive && (
                    <Button className="timer-button" onClick={handlePauseResume}>
                        {isPaused ? "Resume" : "Pause"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Timer;
