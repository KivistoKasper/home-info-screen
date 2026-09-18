import { useEffect, useState } from "react";

const TimeDateView = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000); // Update every 1000ms (1 second)

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(timer);
  }, []);


  
  return (
    <div>
      <div>Ny on tälläne aika</div>
      <p>{date.toLocaleDateString('fi-FI', {})}</p>
      <p>{date.toLocaleTimeString('fi-FI', {hour12: false})}</p>
    </div>
  )
}

export default TimeDateView;