import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [isStart, setStart] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isFocusMin, setFocusMin] = useState(false);
  const [isFocusSec, setFocusSec] = useState(false);
  const [activeCategory, setActive] = useState();
  const [isTypedMin, setTypedMin] = useState(false);
  const [isTypedSec, setTypedSec] = useState(false);

  const categories = [
    { title: 'pomodoro', time: 25 },
    { title: 'short break', time: 5 },
    { title: 'long break', time: 15 }
  ];

  const menuControls = categories.map((item, index) => (
    <button
      disabled={isStart}
      key={index}
      className={activeCategory === index ? 'menu__item active' : 'menu__item'}
      onClick={() => {
        setActive(index);
        setRemainingTime(item.time * 60);
      }}
    >
      {item.title}
    </button>
  ));

  useEffect(() => {
    if (isStart && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (remainingTime === 0 && isStart) {
      setStart(false);
    }
  }, [isStart, remainingTime]);

  const handleSubmit = () => {
    setStart((prev) => !prev);
  };

  return (
    <div className="Clock">
      <div className="wrapper">
        <div className="menu">{menuControls}</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <input
            onFocus={() => {
              setFocusMin(true);
              setActive(null);
            }}
            onBlur={() => setFocusMin(false)}
            disabled={isStart}
            value={
              isFocusMin 
                ? isTypedMin 
                  ? null 
                  : ''
                : Math.floor(remainingTime / 60) < 10 ? `0${Math.floor(remainingTime / 60)}` : Math.floor(remainingTime / 60)
            }
            style={{
              width: '115px',
              fontSize: '100px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              textAlign: 'right'
            }}
            maxLength={2}
            onChange={(event) => {
              setTypedMin(true);
              if (!(+event.target.value > 59)) {
                setRemainingTime((prevTime) => {
                  return +event.target.value * 60 + (prevTime % 60);
                })
              } else {
                alert('Value must be less than 60')
              }
            }}
          />
          <span style={{ fontSize: '100px', color: 'white' }}>:</span>
          <input
            onFocus={() => {
              setFocusSec(true);
              setActive(null);
            }}
            onBlur={() => setFocusSec(false)}
            disabled={isStart}
            value={
              isFocusSec 
                ? isTypedSec 
                  ? null 
                  : ''
                : remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60 
            }
            style={{
              width: '115px',
              fontSize: '100px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              textAlign: 'right'
            }}
            maxLength={2}
            onChange={(event) => {
              setTypedSec(true);
              if (!(+event.target.value > 59)) {
                setRemainingTime((prevTime) => {
                  return Math.floor(prevTime / 60) * 60 + +event.target.value;
                });
              } else {
                alert('Value must be less than 60')
              }
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 5px 0' }}>
          <button
            className="form__button"
            style={isStart ? { borderBottom: '2.5px solid #fff' } : { borderBottom: '7.5px solid #fff' }}
            onClick={handleSubmit}
          >
            {isStart ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;