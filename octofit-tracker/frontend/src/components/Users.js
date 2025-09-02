import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      });
  }, []);
  return ( 
    <div className="container mt-4"> 
      <h2 className="mb-4 text-warning">Usuarios</h2> 
      <div className="card"> 
        <div className="card-body"> 
          <table className="table table-sm"> 
            <thead className="table-dark"> 
              <tr> 
                <th>ID</th> 
                <th>Nombre</th> 
                <th>Email</th> 
              </tr> 
            </thead> 
            <tbody> 
              {users.map(user => ( 
                <tr key={user.id}> 
                  <td>{user.id}</td> 
                  <td>{user.name}</td> 
                  <td>{user.email}</td> 
                </tr> 
              ))} 
            </tbody> 
          </table> 
        </div> 
      </div> 
    </div> 
  );
}

export default Users;
