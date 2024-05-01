const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => 
  <p>Number of exercises {parts.reduce((prev, current) => 
      prev + (current.exercises), 0)}</p>

const Part = ({ part}) => // HUOM! Voi olla ettei tykkää keystä?
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => /* TO-DO: ei kovakoodausta */
  <>
    {
    parts.map(part => {
      //console.log("mapataan part", part)
      return (
        <Part part={part} key={part.id} /> /* id pitää lisätä Reactia varten!*/
      )  
    })
    }     
  </>

const Course = ({ course }) => {           /* TO-DO */
  console.log("hello from Course")
  return (
  <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
  </div>
  )
}

export {Header, Total, Part, Content, Course}