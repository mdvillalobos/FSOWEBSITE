import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import Graph from '../../components/AdminComponents/DashboardComponents/DashboardGraph.jsx';
import TableBTN from '../../components/AdminComponents/DashboardComponents/TableBtn.jsx';
import RankTable from '../../components/AdminComponents/DashboardComponents/RankTable.jsx'

const Dashboard = () => {
    return (
      <div className="bg-[#f4f7fa] h-screen pb-4">
        <Header location={'Dashboard'} />
          <div className="px-16 py-2">
              <BackBtn/>
              <Graph/>
              <TableBTN/>
              <RankTable/>
          </div>
      </div>
    )
  }
  
export default Dashboard
