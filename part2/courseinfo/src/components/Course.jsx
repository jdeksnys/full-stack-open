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

export default Course