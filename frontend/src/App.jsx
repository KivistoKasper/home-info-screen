import './App.css'

import WeatherView from './views/weather';
import TimeDateView from './views/timeDate';

function App() {
  return (
    <div className='App'>
      <TimeDateView />
      <WeatherView />
    </div>
  )
}

export default App
