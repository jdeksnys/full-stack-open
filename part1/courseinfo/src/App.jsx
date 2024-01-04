const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const courseObj = {
    name: course,
    parts: {
      part1: part1,
      part2: part2,
      part3: part3,
    },
  };

  return (
    <div>
      <Header course={courseObj.name} />
      <Content courseObj={courseObj}/>
      <Total courseObj={courseObj}/>
    </div>
  )
}
export default App



export function Header({course}) {
  return(
    <h1>{course}</h1>
  );
}




export function Content({ courseObj }) {
  return (
    <div>
      <Part partObj={courseObj.parts.part1}/>
      <Part partObj={courseObj.parts.part2}/>
      <Part partObj={courseObj.parts.part3}/>
    </div>
  )
}



export function Total({courseObj}) {
  let tot = 0;
  
  for(let p in courseObj.parts){
    tot += courseObj.parts[p].exercises;
  }

  return(<p>Number of exercises {tot}</p>);
}



export function Part({partObj}) {
  return (
    <p>{partObj.name} {partObj.exercises}</p>
  );
}