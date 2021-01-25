import { useEffect, useState } from 'react'
import { Chart } from 'react-google-charts'
import trucksData from './trucktimeline.json';
import Header from './components/Header/Header'
import './App.css'

const timelineColumns = [
  { type: 'string', id: 'Truck' },
  { type: 'string', id: 'Order ID' },
  { type: 'date', id: 'Start' },
  { type: 'date', id: 'End' },
]

function App() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // need to convert the data format for the Chart
    const timelineData = []
    trucksData.trucks.forEach((truck) => {
      if (truck.name.toLowerCase().includes(filter.toLowerCase())) {
        truck.assignedOrderId.forEach((id) => {
          timelineData.push([
            truck.name,
            id,
            new Date(trucksData.orders.find((order) => order.id === id).from),
            new Date(trucksData.orders.find((order) => order.id === id).to)
          ])
        })
      }
    })
    setOrders(timelineData)
  }, [filter])

  const onFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className="App">
      <Header onFilterChange={onFilterChange} />
      {orders.length > 0
        ?
        <div className="Chart-container">
          <Chart
              className='Chart'
              chartType="Timeline"
              loader={<div>Loading Chart</div>}
              data={[timelineColumns, ...orders]}
              options={{
                timeline: {
                  colorByRowLabel: true,
                  rowLabelStyle: {fontName: 'Poppins', fontSize: '16'},
                  barLabelStyle: {fontName: 'Poppins'},
                },
              }}
              rootProps={{ 'data-testid': '7' }}
            />
          </div> 
        : <div className="no-result">There aren't any results with this filter</div>
      }
      
    </div>
  )
}

export default App
