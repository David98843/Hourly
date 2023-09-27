import {Bar} from "react-chartjs-2"

function BarChart({chartData}:any){
    return (
        <div className="chart-container">
          <h2 style={{ textAlign: "center" }}>Productivity this Week</h2>
          <Bar
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "*Productivity is the combination of all todos, projects and pomodoros added"
                },
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
    );   
}

export default BarChart
