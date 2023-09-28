'use client';

import { useState, useRef, useEffect } from 'react';

import classes from './Tasks.module.css';
import Task from './Task';

const USER_PASS = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;

const Tasks = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const dragItem = useRef();
  const dragOverItem = useRef();

  const propsTasks = props.tasks;

  useEffect(() => {
    setTasks(propsTasks);
  }, [propsTasks]);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = async (e) => {
    const copyListItems = [...tasks];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTasks(copyListItems);
    console.log(copyListItems);
    const formData = { newOrder: copyListItems };
    try {
      const response = await fetch('/api/task/reorder', {
        headers: {
          Authorization: `Basic ${btoa(USER_PASS)}`,
        },
        method: 'PUT',
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={classes.section}>
      <ul className={classes.ul}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={classes.list}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >
            <Task
              onTaskUpdate={props.onTaskUpdate}
              order={task.order}
              id={task._id}
              title={task.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Tasks;
