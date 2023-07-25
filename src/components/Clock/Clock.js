import React, { useState, useEffect } from 'react';

const Clock = () => {
  const categories = [{title: 'pomodoro', time: (25 * 60)}, {title: 'short break', time: (5 * 60)}, {title: 'long break', time: (15 * 60)}]

  const [activeCategory, setActive] = useState()
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(0);
  const [isStart, setStart] = useState(false);
  const timerRef = React.useRef(null);

  const [isVisible, setVisible] = useState(false)

  const handleChange = (event) => {
    if(event.target.value > 99) alert('time must be less than 99 minutes')
    else setInputValue(event.target.value);
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

  const menuControls = categories.map((item, index) => (
    <button 
      disabled={isStart} 
      key={index} 
      className={activeCategory === index ? 'menu__item active'  : 'menu__item'}
      onClick={() => {handleOptions(item.time); setActive(index)}}
    >
      {item.title}
    </button>
  ))

  return (
    <div className='Clock'>
        <div className='wrapper'>
          <div className="menu">
            {menuControls}
          </div>
          <div style={{'display': 'flex', 'justifyContent': 'center'}}>
           <h1 className='Clock__time'>{formatTimeLeft(time)}</h1>
          </div>
          <form style={isVisible ? {'display': 'flex'} : {'display': 'none'}} className='form' onSubmit={handleSubmit}>
            <label>
              Enter your minutes:
            </label>
            <input className='time-setter' disabled={isStart} type="number" value={inputValue} onChange={handleChange} />
            <button disabled={isStart} type="submit" className='time-submiter'>Submit</button>
          </form>
          <div style={{'display': 'flex', 'justifyContent': 'center', 'margin': '20px 0 5px 0'}}>
            <button disabled={time === 0} className='form__button' style={isStart ? {'borderBottom': '2.5px solid #fff'} : {'borderBottom': '7.5px solid #fff'}} onClick={() => time === 0 ? setStart(false) : setStart((prev) => !prev)}>Start</button>
            <button disabled={isStart} className='form__settings' onClick={() => setVisible(prev => !prev)}>Custom Time</button>
          </div>
        </div>
    </div>
  );
};

export default Clock;
