import {Header, Total, Part, Content, Course} from "./components/Course"

const Courses = ({ courses }) => {
  console.log("hello from courses")
  return (
    <div>
    {
      courses.map(course => <Course key={course.id} course={course}/>)
    }
    </div>)
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

  return (<div>
    <h1>Curriculum of Hogwarts</h1>
    <Courses courses={courses}/>
    </div>)                 /* ÄLÄ MUUTA*/
}

export default App
// TÄMÄ OLI AIEMMIN, NYT PITÄÄ SIIS TOTEUTTAA UUSIKS... sigh.
/*  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App */