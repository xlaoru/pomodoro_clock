import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(0);
  const [isStart, setStart] = useState(false);
  const timerRef = React.useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStart(false);
    setTime(inputValue * 60);
    setInputValue('');
  };

  const handleOptions = (time) => {
    setStart(false);
    setTime(time);
    setInputValue('');
  };

  const formatTimeLeft = (seconds) => {
    return `${seconds / 60 > 9 ? '' : '0'}${Math.floor(seconds / 60)}:${seconds % 60 > 9 ? seconds % 60 : '0' + seconds % 60}`;
  };

  useEffect(() => {
    if (time === 0) {
        setStart(false)
        return;
    }

    if (isStart) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [time, isStart]);

  return (
    <div className='Clock'>
        <div className='wrapper'>
          <h1>{formatTimeLeft(time)}</h1>
          <button disabled={isStart} onClick={() => handleOptions(25 * 60)}>pomodoro</button>
          <button disabled={isStart} onClick={() => handleOptions(5 * 60)}>short break</button>
          <button disabled={isStart} onClick={() => handleOptions(15 * 60)}>long break</button>
          <form onSubmit={handleSubmit}>
            <label>
              Enter your minutes:
              <input disabled={isStart} type="number" value={inputValue} onChange={handleChange} />
            </label>
            <button disabled={isStart} type="submit">Submit</button>
          </form>
          <button onClick={() => time === 0 ? setStart(false) : setStart((prev) => !prev)}>Start</button>
        </div>
    </div>
  );
};

export default Clock;
