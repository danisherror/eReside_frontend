import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//------------------------------------------------------------------------------
//student
import Landing from './college/Logins/LandingPage';
import LeaveApplication from './Student/LeaveApplication/ApplyLeave'
import Printleaveapplication from './Student/LeaveApplication/Showleave'
import EditLeaveApplication from './Student/LeaveApplication/EditLeave'
import Roomcomplaint from "./Student/RoomComplaint/RoomComplaint";
import PrintRoomComplaints from "./Student/RoomComplaint/ShowComplaint";
import EditComplaint from "./Student/RoomComplaint/EditComplaint";
import FeedbackPage from "./Student/FeedBack/FeedBack";
import PrintStudentFeedbacks from "./Student/FeedBack/ShowFeedback";
import EditStudentFeedBack from "./Student/FeedBack/EditFeedBack"
import ApplyHostel from "./Student/Hostel/ApplyHostel"
import UProfile from './Student/Profile/Profile';
import USettings from './Student/Profile/Settings';
import ShowStudentAnnouncements from "./Student/Announcements/showAnnouncements"
import GetinoutdetailStudent from "./Student/InoutDetails/InoutDetaile"
//------------------------------------------------------------------------------
//admin
import AdminDashBoard from './pages/Dashboard/AdminDashBoard';
import AProfile from "./Admin/Profile/Profile";
import ASetting from "./Admin/Profile/Setting";
import GetHostelDetails from "./Admin/Hostel/RoomInfo";
import CreateHostel from "./Admin/Hostel/CreateHostel";
import DeleteHostel from "./Admin/Hostel/DeleteHostel";
import GetStudentLeaveApplication from "./Admin/LeaveApplication/showLeaveApplication";
import AEditstudentLeaveApplication from "./Admin/LeaveApplication/EditLeaveApplication";
import ChangeRoomIssueStatus from "./Admin/RoomComplaints/EditRoomCOmplaints";
import GetStudentRoomIsses from "./Admin/RoomComplaints/ShowRoomComplaints";
import GetStudentFeedbacks from "./Admin/FeedBack/ShowFeedback";
import ShowStudentProfile from "./Admin/Student/ShowStudentProfile";
import GetStudentProfile from "./Admin/Student/GetStudentProfiles";
import QRScanner from "./Admin/Scanner/Scanner";
import GetAllQrTokens from "./Admin/Scanner/GetAllQrcodes";
import CreateAnnouncements from "./Admin/Announcment/CreateAnnouncements";
import ShowAllAnouncements from "./Admin/Announcment/ShowAnnouncemets";
import EditAnnouncement from "./Admin/Announcment/EditAnnouncements";
import CreateWarden from "./Admin/Warden/CreateWarden";
import ShowAllWardenDetails from "./Admin/Warden/ShowWardens"
import ShowWardenProfile from "./Admin/Warden/ShowSingleWarden";
import DeleteWarden from "./Admin/Warden/DeleteWarden";
import Agetinoutdetail from "./Admin/Scanner/InoutDetails"
//-----------------------------------------------------------------------------
//warden
import WardenDashboard from './pages/Dashboard/WardenDashBoard';
import WcreateAnnouncement from "./Warden/Announcements/CreateAnnouncements";
import ShowWardenAnnouncement from "./Warden/Announcements/ShowAnnouncemets";
import WEditAnnouncement from "./Warden/Announcements/EditAnnouncements";
import WShowFeedback from "./Warden/Feedback/ShowFeedback";
import WRoomInfo from "./Warden/Hostel/RoomInfo";
import WgetLeaveApplication from "./Warden/LeaveApplication/showLeaveApplication"
import WEditstudentLeaveApplication from "./Warden/LeaveApplication/EditLeaveApplication";
import WGetStudentRoomIsses from "./Warden/RoomComplaint/ShowRoomComplaints";
import WChangeRoomIssueStatus from "./Warden/RoomComplaint/EditRoomCOmplaints";
import WGetStudentProfile from "./Warden/Student/GetStudentProfiles";
import WShowStudentProfile from "./Warden/Student/ShowStudentProfile"
import WQRScanner from "./Warden/Scanner/Scanner";
import WGetAllQrTokens from "./Warden/Scanner/GetAllQrcodes";
import WProfile from "./Warden/Profile/Profile";
import Wgetinoutdetail from "./Warden/Scanner/InoutStudent"
//-----------------------------------------------------------------------------
//Homepage
import HomePage from "./pages/Dashboard/HomePage"
import HostelRules from "./HomePage/HostelRules/HostelRules"
import Contact from './HomePage/Contact/Contact_info';
import Guidelines from "./HomePage/Guidelines/Guidelines";
import Mess from "./HomePage/Mess/Mess"
import Imagess from "./HomePage/HostelRules/Images"
import HRoomInfo from "./HomePage/RoomsInfo/RoomInfo";
//-----------------------------------------------------------------------------
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>

        <Route
          index
          element={
            <>
              <PageTitle title="eReside" />
              <HomePage />
            </>
          }
        />
        <Route
          path="/uhomepage"
          element={
            <>
              <PageTitle title="eReside" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/uprofile"
          element={
            <>
              <PageTitle title="eReside" />
              <UProfile />
            </>
          }
        />
        <Route
          path="/usettings"
          element={
            <>
              <PageTitle title="eReside" />
              <USettings />
            </>
          }
        />
        <Route
          path="/imagess"
          element={
            <>
              <PageTitle title="eReside" />
              <Imagess />
            </>
          }
        />
        <Route
          path="/leaveapplication"
          element={
            <>
              <PageTitle title="eReside" />
              <LeaveApplication />
            </>
          }
        />
        <Route
          path="/printleaveapplication"
          element={
            <>
              <PageTitle title="eReside" />
              <Printleaveapplication />
            </>
          }
        />
        <Route
          path="/editStudentleaveapplication"
          element={
            <>
              <PageTitle title="eReside" />
              <EditLeaveApplication />
            </>
          }
        />

        <Route
          path="/roomcomplaint"
          element={
            <>
              <PageTitle title="eReside" />
              <Roomcomplaint />
            </>
          }
        />
        <Route
          path="/printRoomComplaints"
          element={
            <>
              <PageTitle title="eReside" />
              <PrintRoomComplaints />
            </>
          }
        />
        <Route
          path="/editStudentComplaint"
          element={
            <>
              <PageTitle title="eReside" />
              <EditComplaint />
            </>
          }
        />

         <Route
          path="/feedback"
          element={
            <>
              <PageTitle title="eReside" />
              <FeedbackPage />
            </>
          }
        />
        <Route
          path="/printFeedbackData"
          element={
            <>
              <PageTitle title="eReside" />
              <PrintStudentFeedbacks />
            </>
          }
        />
        <Route
          path="/editStudentFeedBack"
          element={
            <>
              <PageTitle title="eReside" />
              <EditStudentFeedBack />
            </>
          }
        />
        <Route
          path="/getinoutdetailStudent"
          element={
            <>
              <PageTitle title="eReside" />
              <GetinoutdetailStudent />
            </>
          }
        />
        <Route
          path="/agetinoutdetail"
          element={
            <>
              <PageTitle title="eReside" />
              <Agetinoutdetail />
            </>
          }
        />
         <Route
          path="/wgetinoutdetail"
          element={
            <>
              <PageTitle title="eReside" />
              <Wgetinoutdetail />
            </>
          }
        />
        <Route
          path="/applyHostel"
          element={
            <>
              <PageTitle title="eReside" />
              <ApplyHostel />
            </>
          }
        />
        {/* Admin Start*/}

        <Route
          path="/ahomepage"
          element={
            <>
              <PageTitle title="eReside" />
              <AdminDashBoard />
            </>
          }
        />
        <Route
          path="/aprofile"
          element={
            <>
              <PageTitle title="eReside" />
              <AProfile />
            </>
          }
        />
        <Route
          path="/asettings"
          element={
            <>
              <PageTitle title="eReside" />
              <ASetting />
            </>
          }
        />

        <Route
          path="/getHostelDetails"
          element={
            <>
              <PageTitle title="eReside" />
              <GetHostelDetails />
            </>
          }
        />
        <Route
          path="/createHostel"
          element={
            <>
              <PageTitle title="eReside" />
              <CreateHostel />
            </>
          }
        />
         <Route
          path="/deleteHostel"
          element={
            <>
              <PageTitle title="eReside" />
              <DeleteHostel />
            </>
          }
        />
        <Route
          path="/getLeaveApplication"
          element={
            <>
              <PageTitle title="eReside" />
              <GetStudentLeaveApplication />
            </>
          }
        />
        <Route
          path="/changeleaveApplicationStatus"
          element={
            <>
              <PageTitle title="eReside" />
              <AEditstudentLeaveApplication />
            </>
          }
        />
        <Route
          path="/getstudentroomissues"
          element={
            <>
              <PageTitle title="eReside" />
              <GetStudentRoomIsses />
            </>
          }
        />
        <Route
          path="/changerooomissueStatus"
          element={
            <>
              <PageTitle title="eReside" />
              <ChangeRoomIssueStatus />
            </>
          }
        />
        <Route
          path="/getStudentFeedback"
          element={
            <>
              <PageTitle title="eReside" />
              <GetStudentFeedbacks />
            </>
          }
        />
        <Route
          path="/ShowStudentProfile"
          element={
            <>
              <PageTitle title="eReside" />
              <ShowStudentProfile />
            </>
          }
        />
        <Route
          path="/getallStudents"
          element={
            <>
              <PageTitle title="eReside" />
              <GetStudentProfile />
            </>
          }
        />
        <Route
          path="/scanqrcode"
          element={
            <>
              <PageTitle title="eReside" />
              <QRScanner />
            </>
          }
        />
        <Route
          path="/getAllQrTokens"
          element={
            <>
              <PageTitle title="eReside" />
              <GetAllQrTokens />
            </>
          }
        />
        <Route
          path="/createAnnouncement"
          element={
            <>
              <PageTitle title="eReside" />
              <CreateAnnouncements />
            </>
          }
        />
        <Route
          path="/showAllAnouncements"
          element={
            <>
              <PageTitle title="eReside" />
              <ShowAllAnouncements />
            </>
          }
        />

        <Route
          path="/showStudentAnnouncements"
          element={
            <>
              <PageTitle title="eReside" />
              <ShowStudentAnnouncements />
            </>
          }
        />
        <Route
          path="/editAnnouncement"
          element={
            <>
              <PageTitle title="eReside" />
              <EditAnnouncement />
            </>
          }
        />
        <Route
          path="/createWarden"
          element={
            <>
              <PageTitle title="eReside" />
              <CreateWarden />
            </>
          }
        />
        <Route
          path="/showAllWardenDetails"
          element={
            <>
              <PageTitle title="eReside" />
              <ShowAllWardenDetails />
            </>
          }
        />
        <Route
          path="/showWardenProfile"
          element={
            <>
              <PageTitle title="eReside" />
              <ShowWardenProfile />
            </>
          }
        />
        <Route
          path="/deleteWarden"
          element={
            <>
              <PageTitle title="eReside" />
              <DeleteWarden />
            </>
          }
        />
        <Route
          path="/whomepage"
          element={
            <>
              <PageTitle title="eReside" />
              <WardenDashboard />
            </>
          }
        />

        <Route
          path="/wcreateAnnouncement"
          element={
            <>
              <PageTitle title="eReside" />
              <WcreateAnnouncement />
            </>
          }
        />
        <Route
          path="/wshowAnnouncement"
          element={
            <>
              <PageTitle title="eReside" />
              <ShowWardenAnnouncement />
            </>
          }
        />
        <Route
          path="/weditAnnouncement"
          element={
            <>
              <PageTitle title="eReside" />
              <WEditAnnouncement />
            </>
          }
        />
        <Route
          path="/wgetStudentFeedback"
          element={
            <>
              <PageTitle title="eReside" />
              <WShowFeedback />
            </>
          }
        />
        <Route
          path="/wgetHostelDetails"
          element={
            <>
              <PageTitle title="eReside" />
              <WRoomInfo />
            </>
          }
        />
        <Route
          path="/wgetLeaveApplication"
          element={
            <>
              <PageTitle title="eReside" />
              <WgetLeaveApplication />
            </>
          }
        />
        <Route
          path="/wchangeleaveApplicationStatus"
          element={
            <>
              <PageTitle title="eReside" />
              <WEditstudentLeaveApplication />
            </>
          }
        />
        <Route
          path="/wgetstudentroomissues"
          element={
            <>
              <PageTitle title="eReside" />
              <WGetStudentRoomIsses />
            </>
          }
        />
        <Route
          path="/wchangerooomissueStatus"
          element={
            <>
              <PageTitle title="eReside" />
              <WChangeRoomIssueStatus />
            </>
          }
        />
        <Route
          path="/wgetallStudents"
          element={
            <>
              <PageTitle title="eReside" />
              <WGetStudentProfile />
            </>
          }
        />
        <Route
          path="/wShowStudentProfile"
          element={
            <>
              <PageTitle title="eReside" />
              <WShowStudentProfile />
            </>
          }
        />
        <Route
          path="/wscanqrcode"
          element={
            <>
              <PageTitle title="eReside" />
              <WQRScanner />
            </>
          }
        />
        <Route
          path="/wgetAllQrTokens"
          element={
            <>
              <PageTitle title="eReside" />
              <WGetAllQrTokens />
            </>
          }
        />
        <Route
          path="/wprofile"
          element={
            <>
              <PageTitle title="eReside" />
              <WProfile />
            </>
          }
        />
        <Route
          path="/hostelrules"
          element={
            <>
              <PageTitle title="eReside" />
              <HostelRules />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageTitle title="eReside" />
              <Contact />
            </>
          }
        />
        <Route
          path="/guidelines"
          element={
            <>
              <PageTitle title="eReside" />
              <Guidelines />
            </>
          }
        />
        <Route
          path="/mess"
          element={
            <>
              <PageTitle title="eReside" />
              <Mess />
            </>
          }
        />
        <Route
          path="/hroominfo"
          element={
            <>
              <PageTitle title="eReside" />
              <HRoomInfo />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="eReside" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="eReside" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="eReside" />
              <Tables />
            </>
          }
        />

        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="eReside" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="eReside" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="eReside" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="eReside" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="eReside" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
