const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const courseObj = {
    name: course,
    parts: {
      part1: {
        name: part1,
        exCount: exercises1,
      },
      part2: {
        name: part2,
        exCount: exercises2,
      },
      part3: {
        name: part3,
        exCount: exercises3,
      },
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
    tot += courseObj.parts[p].exCount;
  }

  return(<p>Number of exercises {tot}</p>);
}



export function Part({partObj}) {
  return (
    <p>{partObj.name} {partObj.exCount}</p>
  );
}