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
  const [filteredOrders, setFilteredOrders] = useState([])

  useEffect(() => {
    // need to convert the data format for the Chart
    const timelineData = []
    trucksData.trucks.forEach((truck) => {
        truck.assignedOrderId.forEach((id) => {
          timelineData.push([
            truck.name,
            id,
            new Date(trucksData.orders.find((order) => order.id === id).from),
            new Date(trucksData.orders.find((order) => order.id === id).to)
          ])
        })
    })
    setOrders(timelineData)
    setFilteredOrders(timelineData)
  }, [])

  const onFilterChange = (e) => {
    const filterInput = e.target.value
    setFilteredOrders(orders.filter((order) => order[0].toLowerCase().includes(filterInput.toLowerCase())))
  }

  return (
    <div className="App">
      <Header onFilterChange={onFilterChange} />
      {filteredOrders.length > 0
        ?
        <div className="Chart-container">
          <Chart
              className='Chart'
              chartType="Timeline"
              loader={<div>Loading Chart</div>}
              data={[timelineColumns, ...filteredOrders]}
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
