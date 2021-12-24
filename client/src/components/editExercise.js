import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = (props) => {
  const match = useRouteMatch();
  const selectRef = useRef(null);

  const { id } = match.params;

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ancient-wave-06595.herokuapp.com/exercises/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch((error) => console.log(error));
    axios.get("https://ancient-wave-06595.herokuapp.com/users").then((response) => {
      if (response.data.length > 0) {
        const username = response.data.map((user) => user.username);
        setUsers(username);
      }
    });
  }, []);

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);

  const onChangeDescription = useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const onChangeDuration = useCallback((e) => {
    setDuration(e.target.value);
  }, []);

  const onChangeDate = useCallback((date) => {
    setDate(date);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    selectRef.current = username;
    const exercise = {
      username,
      description,
      duration,
      date,
    };
    console.log(exercise);
    axios
      .post(`https://ancient-wave-06595.herokuapp.com/exercises/update/${id}`, exercise)
      .then((res) => console.log(res.data));
    window.location = "/";
  };

  return (
    <div>
      <h3>Edit New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username: </label>
          <select required ref={selectRef} value={username} onChange={onChangeUsername}>
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Description: </label>
          <input type="text" required value={description} onChange={onChangeDescription} />
        </div>
        <div>
          <label>Duration (in minite): </label>
          <input type="text" value={duration} onChange={onChangeDuration} />
        </div>
        <div>
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={onChangeDate} />
          </div>
        </div>
        <div>
          <input type="submit" value="Edit Exercise Log" />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
