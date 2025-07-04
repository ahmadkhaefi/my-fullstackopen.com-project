const Header = ({course}) => <h1>{course}</h1>

const Part = ({part}) => (
	<p>
		{part.name} {part.exercises}
	</p>
)

const Content = ({parts}) => (
	<div>
		{parts.map(part => (
			<Part key={part.id} part={part}/>
		))}
	</div>
)

const Total = ({total}) => <p><b>Total of exercises {total}</b></p>

const Course = ({course}) => {
	return (
		<div>
			<Header course={course.name}/>
			<Content parts={course.parts}/>
			<Total total={course.parts.reduce((acc, current) => acc + current.exercises, 0)}/>
		</div>
	)
}

export default Course
