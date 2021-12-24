import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = ({ exercise, deleteExercise }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${exercise._id}`}>edit</Link> |{" "}
        <a href="#" onClick={() => deleteExercise(exercise._id)}>
          delete
        </a>
      </td>
    </tr>
  );
};

const ExercisesList = () => {
  const [exercises, setExrcises] = useState([]);
  useEffect(() => {
    axios
      .get("https://ancient-wave-06595.herokuapp.com/exercises/")
      .then((response) => {
        setExrcises(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExercise = useCallback(
    (id) => {
      axios.delete(`https://ancient-wave-06595.herokuapp.com/exercises/${id}`).then((res) => console.log(res.data));
      setExrcises(exercises.filter((el) => el._id !== id));
    },
    [exercises]
  );

  const exerciseList = () => {
    return exercises.map((currentexercise) => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
    });
  };

  return (
    <div>
      <h3>Logged Exercise List</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
