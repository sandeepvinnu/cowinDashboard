import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {item} = props
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div className="success-container">
      <h1 className="s-head">Vaccination Coverage</h1>
      <BarChart data={item} margin={{top: 5}} width={1000} height={500}>
        <XAxis dataKey="vaccineDate" tick={{stroke: 'grey', strokeWidth: 1}} />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
