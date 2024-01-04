const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
export default App



export function Header({course}) {
  return(
    <h1>{course}</h1>
  );
}




export function Content({ parts }) {
  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}



export function Total({parts}) {
  let tot = 0;
  
  for(let p in parts){
    tot += parts[p].exercises;
  }

  return(<p>Number of exercises {tot}</p>);
}



export function Part({part}) {
  return (
    <p>{part.name} {part.exercises}</p>
  );
}