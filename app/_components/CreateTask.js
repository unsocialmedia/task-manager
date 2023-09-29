'use client';
import React, { useState } from 'react';

import classes from './CreateTask.module.css';

const USER_PASS = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;

const CreateTask = ({ onTaskAdd }) => {
  const [newTask, setNewTask] = useState('');
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') {
      return;
    }

    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(USER_PASS)}`,
        },
        body: JSON.stringify({
          title: newTask,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }

    setNewTask('');
    onTaskAdd();
  };

  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <h2>CreateTask</h2>
        <input
          type='text'
          className={classes.input}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type='submit' className={classes.button}>
          Add Task
        </button>
      </form>
    </section>
  );
};

export default CreateTask;
