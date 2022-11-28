import {useContext} from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import {AuthContext} from "../../context/AuthContext";

function Dashboard() {

  const {isAdmin} = useContext(AuthContext)

  return (
    <>
      {
        isAdmin ?
            <AdminDashboard />
            :
            <UserDashboard />
      }
    </>
  )
}

export default Dashboard;
