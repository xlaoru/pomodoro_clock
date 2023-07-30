import React, { useState, useEffect } from 'react';

const TestClock = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setStart] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isFocus, setFocus] = useState(false)
  const [activeCategory, setActive] = useState()

  const categories = [{title: 'pomodoro', time: (25)}, {title: 'short break', time: (5)}, {title: 'long break', time: (15)}]

  const menuControls = categories.map((item, index) => (
    <button 
      disabled={isStart} 
      key={index} 
      className={activeCategory === index ? 'menu__item active'  : 'menu__item'}
      onClick={() => {setSeconds(0); setMinutes(item.time); setActive(index)}}
    >
      {item.title}
    </button>
  ))

  useEffect(() => {
    if (isStart && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStart, remainingTime]);

  useEffect(() => {
    setRemainingTime(minutes * 60 + seconds);
  }, [minutes, seconds]);

  const handleChange = (event, type) => {
    if (!(+event.target.value > 59) && type === 'minutes') {
      setMinutes(+event.target.value);
    }

    if (!(+event.target.value > 59) && type === 'seconds') {
      setSeconds(+event.target.value);
    }
  };

  const handleSubmit = () => {
    setStart(prev => !prev);
  };

  return (
    <div className="Clock">
      <div className="wrapper">
        <div className="menu">
          {menuControls}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', 'marginTop': '20px' }}>
          <input
            onFocus={() => {setFocus(true); setActive(null)}}
            onBlur={() => setFocus(false)}
            disabled={isStart}
            value={
              isFocus 
                ? isStart 
                  ? Math.floor(remainingTime / 60) < 10 ? `0${Math.floor(remainingTime / 60)}` : Math.floor(remainingTime / 60)
                  : Math.floor(remainingTime / 60)
                : Math.floor(remainingTime / 60) < 10 ? `0${Math.floor(remainingTime / 60)}` : Math.floor(remainingTime / 60)
            }
            style={{
              'width': '115px', 'fontSize': '100px', 'background': 'transparent', 'border': 'none','color': 'white', 'textAlign': 'right'}}
            maxLength={2}
            onChange={(event) => handleChange(event, 'minutes')}
          />
          <span style={{ fontSize: '100px', color: 'white' }}>:</span>
          <input
            onFocus={() => {setFocus(true); setActive(null)}}
            onBlur={() => setFocus(false)}
            disabled={isStart}
            value={
              isFocus
                ? isStart 
                  ? remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60
                  : remainingTime % 60
                : remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60
            }
            style={{
              'width': '115px', 'fontSize': '100px', 'background': 'transparent', 'border': 'none', 'color': 'white', 'textAlign': 'right'
            }}
            maxLength={2}
            onChange={(event) => handleChange(event, 'seconds')}
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

export default TestClock;