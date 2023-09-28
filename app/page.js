'use client';

import React, { useEffect, useState, Fragment } from 'react';

import Image from 'next/image';
import styles from './page.module.css';

import Tasks from './_components/Tasks';
import CreateTask from './_components/CreateTask';

const USER_PASS = `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`;

let firstLoad = true;

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (firstLoad) {
      getTasks().catch((error) => {
        console.log(error);
      });
    }
    firstLoad = false;
  }, []);

  const getTasks = async () => {
    const response = await fetch('/api/task', {
      headers: {
        Authorization: `Basic ${btoa(USER_PASS)}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const fetchedTasks = await response.json();
    if (await fetchedTasks.ok) {
      setTasks(await fetchedTasks.data);
    }
    console.log(fetchedTasks);
  };

  return (
    <main className={styles.main}>
      <Fragment>
        <CreateTask onTaskAdd={getTasks} />
        {tasks && tasks.length > 0 && (
          <Tasks onTaskUpdate={getTasks} tasks={tasks} />
        )}
      </Fragment>
    </main>
  );
}
