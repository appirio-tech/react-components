export default function ExampleTest(props) {
  const row = (value, index) =>
    <li key={index}>{value}</li>

  return (
    <ul>
      { props.values.map(row) }
    </ul>
  )
}

ExampleTest.propTypes = {
}

module.exports = ExampleTest
