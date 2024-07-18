import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://127.0.0.1:5000/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.username}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
