import React, { useState, useCallback } from "react";
import axios from "axios";
const CreateUser = () => {
  const [username, setUsername] = useState("");

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
    };
    console.log(user);
    axios.post("https://ancient-wave-06595.herokuapp.com/users/add", user).then((res) => console.log(res.data));
    setUsername("");
  };

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username: </label>
          <input type="text" required value={username} onChange={onChangeUsername} />
        </div>
        <div>
          <input type="submit" value="Create User" />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
