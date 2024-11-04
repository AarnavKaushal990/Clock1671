import React, { useEffect, useState } from 'react';
import './clock.css'; // Optional: For styling

const clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString();
    };

    return (
        <div className="clock">
            <h1>{formatTime(time)}</h1>
        </div>
    );
};

export default clock;
