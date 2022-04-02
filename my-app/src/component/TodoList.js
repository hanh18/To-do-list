import React, { useState } from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function TodoList () {
    const [job, setJob] = useState('');
    const [jobs, setJobs] = useState(() => {
      const storageJobs = JSON.parse(localStorage.getItem('jobs'));
      return storageJobs ?? []
    });
    const [checked, setChecked] = useState([]);

    const handleSubmit = () => {
        setJobs(prev => {
          if(job === '') return [...prev]

          const newJob = [...prev, {id: Math.floor(Math.random() * 1000), name: job, status: false}];
          
          const jsonJobs = JSON.stringify(newJob);
          localStorage.setItem('jobs', jsonJobs);

          return newJob;
        });
        
        setJob('');
    }

    const handleCheck = (id) => {
      setChecked(prev => {
      const isChecked = checked.includes(id);
      const storageJobs = JSON.parse(localStorage.getItem('jobs'));
      const job = storageJobs.find(job => job.id === id);

      if(isChecked) {
          //uncheck
          job.status = false;
          const listJob = storageJobs.map(item => item.id === id ? job : item)
          setJobs(listJob);
          const jsonJobs = JSON.stringify(listJob);
          localStorage.setItem('jobs', jsonJobs);
          console.log(job);

          return checked.filter(item => item !== id)
      } else {
          job.status = true;
          const listJob = storageJobs.map(item => item.id === id ? job : item);
          const jsonJobs = JSON.stringify(listJob);
          setJobs(listJob);
          localStorage.setItem('jobs', jsonJobs);
          console.log(job);
          return [...prev, id];
      }
    });
  }

  const removeJob = id => {
      const arrRemove = [...jobs].filter(jobs => jobs.id !== id)

      localStorage.setItem('jobs', JSON.stringify(arrRemove));
      setJobs(arrRemove);
  }

    return (
        <div className='container'>
          <div className='input-submit'>
                <input className='input'
                  value={ job }
                  onChange={e => setJob(e.target.value)}
                >
                </input>
                <Button variant="contained" color="secondary" onClick={ handleSubmit }>
                  Submit
                </Button>
          </div>
          {
            jobs.map((job, index) => (
              <div className='todo-item'  key={index}>
                <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={job.status === true ? true : false}
                      onChange={() => handleCheck(job.id)}
                      color="primary"
                    />
                  }
                  label={ job.name }
                />
                </FormGroup>
                <Button variant="outlined" color="primary" onClick={() => removeJob(job.id)}>
                  Delete
                </Button>
              </div>
            ))
          }
        </div>
    )
}