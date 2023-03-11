import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const App = () => {
  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  const [duration, setDuration] = useState(5);

  const startWateringHandler = async () => {
    const response = await fetch(address + '/watering/start/fast')
  }
  console.log(duration)

  const changeDurationHandler = (event) => {
    setDuration(event.target.value);
  }

  const handleSubmit = async () => {
    const response = await fetch(address + `/watering/start/${duration}`)
  }
  return (
    <>
      <h1>Pi Watering Project of me ded bonsai</h1>
      <button onClick={startWateringHandler}>Start Watering!</button>
      <form onSubmit={handleSubmit}>
        <label>How long to water for?
          <input
            name="timeInput"
            value={duration}
            onChange={changeDurationHandler} />
            <input type='submit'/>
        </label>
      </form>
    </>
  );
}

export default App;
