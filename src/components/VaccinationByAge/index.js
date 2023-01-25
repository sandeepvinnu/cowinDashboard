// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {item2} = props
  return (
    <div className="success-container-2">
      <h1 className="s-head-2">Vaccination by Age</h1>

      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="40%"
          data={item2}
          startAngle={0}
          endAngle={360}
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#5a8dee" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
