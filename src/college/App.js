import './App.css';
import {Route,Routes} from "react-router-dom"
import Signup from './Logins/Signup';
import Signin from './Logins/Signin';
import UHomePage from './Student/HomePage';
import EditImage from './Student/EditProfilePic';
import EditStudentProfile from './Student/EditStudentProfile';
import Landing from './Logins/LandingPage';
import ApplyHostel from './Student/ApplyHostel';
import FeedbackPage from './Student/FeedBackForm';
import Roomcomplaint from './Student/Roomcomplaint';
import LeaveApplication from './Student/LeaveApplication';
import PrintLeaveData from './Student/PrintLeaveApplications';
import PrintFeedBackData from './Student/PrintFeedBackData';
import PrintRoomComplaints from './Student/PrintRoomComplaint';
import EditStudentFeedBack from './Student/EditStudentFeedBack';
import EditStudentComplaint from './Student/EditStudentComplaint';
import EditLeaveApplication from './Student/EditLeaveApplication';

import AHomepage from "./Admin/HomePage"
import AeditImage from "./Admin/EditprofilePic"
import EditAdminProfile from './Admin/EditAdminProfile';
import GetStudentProfile from './Admin/GetStudentProfiles';
import AEditStudentStatus from './Admin/ChangeStudentStatus'
import GetStudentFeedbacks from './Admin/GetStudentFeedback'
import GetStudentRoomIsses from './Admin/getStudentRoomIssues'
import CreateHostelForm from './Admin/CreateHostel';
import DeleteHostelForm from './Admin/DeleteHostel';
import GetHostelDetails from './Admin/RoomInfo';
import ShowStudentProfile from './Admin/ShowStudentProfile';
import ChangeRoomIssueStatus from './Admin/ChangeRoomIssueStatus'
import GetStudentLeaveApplication from "./Admin/GetLeaveApplication"
import AEditstudentLeaveApplication from './Admin/ChangeLeaveApplicationStatus'
import QRScanner from './Admin/Scanner'
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element= {<Landing />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/signin" element= {<Signin />} />

        <Route path="/uhomepage" element= {<UHomePage />} />
        <Route path="/ahomepage" element= {<AHomepage />} />

        <Route path="/editImage" element= {<EditImage />} />
        <Route path="/aeditImage" element= {<AeditImage />} />


        <Route path="/editStudentProfile" element= {<EditStudentProfile />} />
        <Route path="/editAdminProfile" element= {< EditAdminProfile/>} />

        <Route path="/getallStudents" element= {< GetStudentProfile/>} />
        <Route path="/changeStudentStatus" element= {< AEditStudentStatus/>} />

        <Route path="/getStudentFeedback" element= {< GetStudentFeedbacks/>} />

        <Route path="/getstudentroomissues" element= {< GetStudentRoomIsses/>} />


        <Route path="/applyHostel" element={<ApplyHostel />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/roomcomplaint" element={<Roomcomplaint />} />
        <Route path="/leaveapplication" element={<LeaveApplication />} />
        <Route path="/printleaveapplication" element={<PrintLeaveData />} />
        <Route path="/editStudentleaveapplication" element={<EditLeaveApplication />} />
        <Route path="/printFeedbackData" element={<PrintFeedBackData />} />
        <Route path="/printRoomComplaints" element={<PrintRoomComplaints />} />
        <Route path="/editStudentFeedBack" element={<EditStudentFeedBack />} />
        <Route path="/editStudentComplaint" element={<EditStudentComplaint />} />
        <Route path="/createHostel" element={<CreateHostelForm />} />
        <Route path="/deleteHostel" element={<DeleteHostelForm />} />
        <Route path="/getHostelDetails" element={<GetHostelDetails />} />
        <Route path="/changerooomissueStatus" element={<ChangeRoomIssueStatus />} />
        <Route path="/showStudentProfile" element={<ShowStudentProfile />} />
        <Route path="/getLeaveApplication" element={<GetStudentLeaveApplication />} />
        <Route path="/changeleaveApplicationStatus" element={<AEditstudentLeaveApplication />} />
        <Route path="/scanqrcode" element={<QRScanner />} />

      </Routes>
    </div>
  );
}

export default App;
