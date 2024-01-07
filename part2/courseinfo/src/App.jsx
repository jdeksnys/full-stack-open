import { useState } from 'react'


const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => 
          <li key={part.id}>{part.name} {part.exercises}</li>
        )}
      </ul>
      <Statistics course={course} />
    </div>
  )
}

const Statistics = ({course}) => {
  let total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (<div><b>total of {total} exercises</b></div>)
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web developmnet curriculum</h1>
      <ul>
        {courses.map(function(course) {
          return (
            <Course key={course.id} course={course} />
          )}
        )}
      </ul>
    </div>
  )
}

export default App