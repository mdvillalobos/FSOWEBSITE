import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import BarGraph from '../../components/AdminComponents/DashboardComponents/BarGraph.jsx';
import PieGraph from "../../components/AdminComponents/DashboardComponents/PieGraph.jsx";
import Config from '../../components/AdminComponents/DashboardComponents/Config.jsx';
import RankTable from '../../components/AdminComponents/DashboardComponents/RankTable.jsx'

const Dashboard = () => {
    return (
      <div className="background-gradient h-full pb-4 font-Poppins">
        <Header location={'Dashboard'} />
          <div className="px-16 py-2">
            <BackBtn/>
            <div className="flex h-full space-x-4">
              <div className="flex-1 space-y-4 ">
                <BarGraph/>
                <div className="flex space-x-2 ">
                  <PieGraph/>
                  <RankTable/>
                </div>
              </div>
              <div className="flex-1 bg-white px-7 py-5 rounded-xl shadow-md w-[18vw]">
                <Config/>
              </div>
            </div>
          </div>
      </div>
    )
  }
  
export default Dashboard
