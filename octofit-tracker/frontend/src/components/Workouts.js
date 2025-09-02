import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-danger">Workouts</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map(workout => (
                <tr key={workout.id}>
                  <td>{workout.id}</td>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-danger mt-3">Agregar Workout</button>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
