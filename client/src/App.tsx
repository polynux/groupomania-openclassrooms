import { useState } from 'react';
import './App.css';

function App() {
  const [test, setTest] = useState('Loading...');

  const credentials = {
    email: 'email',
    password: 'password',
  };

  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .then((data) => {
      setTest(JSON.stringify(data));
    })
    .catch((err) => {
      setTest(JSON.stringify(err));
    });

  return (
    <div className="App">
      <div className="card">
        <div>
          <p>test is {test}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
