'use client';
import React, { useState, Fragment } from 'react';
import classes from './Task.module.css';

const USER_PASS = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;

const Task = ({ id, title, onTaskUpdate }) => {
  const [newTitle, setNewTitle] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteTaskHandler = async () => {
    try {
      const response = await fetch('/api/task', {
        headers: {
          Authorization: `Basic ${btoa(USER_PASS)}`,
        },
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      onTaskUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskHandler = async () => {
    const formData = { id, new_title: newTitle };

    if (newTitle.trim() === '') {
      return;
    }

    try {
      const response = await fetch('/api/task', {
        headers: {
          Authorization: `Basic ${btoa(USER_PASS)}`,
        },
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
    setNewTitle('');
    setIsUpdating(false);
    onTaskUpdate();
  };

  const cancelUpdateHandler = () => {
    setNewTitle('');
    setIsUpdating(false);
  };

  const dynamicActions = isUpdating ? (
    <Fragment>
      <button onClick={updateTaskHandler}>Save</button>
      <button onClick={cancelUpdateHandler}>Cancel</button>
    </Fragment>
  ) : (
    <Fragment>
      <button onClick={() => setIsUpdating(true)}>Update</button>
      <button onClick={deleteTaskHandler}>Delete</button>
    </Fragment>
  );

  const dynamicInput = isUpdating ? (
    <input
      type='text'
      placeholder='Input New Task'
      value={newTitle}
      onChange={(e) => setNewTitle(e.target.value)}
      className={classes.input}
    />
  ) : (
    <h4>{title}</h4>
  );

  return (
    <Fragment>
      {dynamicInput}
      <div className={classes.actions}>{dynamicActions}</div>
    </Fragment>
  );
};

export default Task;
