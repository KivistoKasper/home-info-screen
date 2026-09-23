import { useEffect, useState } from 'react';
import '../css/timeDateView.css';

const TimeDateView = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dayAndDate = new Intl.DateTimeFormat('fi-FI', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);

  const time = new Intl.DateTimeFormat('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);

  return (
    <header className="time-date">
      <div className="time-date-content">

        <div className="time-date-day">
          {dayAndDate}
        </div>

        <div className="time-date-clock">
          {time}
          <div>/{date.toLocaleDateString('fi-FI', {})}</div>
        </div>

      </div>
    </header>
  );
};

export default TimeDateView;