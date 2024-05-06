import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import DropdownMessage from './DropdownMessage';
// import DropdownNotification from './DropdownNotification';
import DropDownFeedbacks from './User/Feedbacks';
import DropDownRoom from './User/RoomComplaints'
import DropDownSettings from './User/Setting'
import DropDownLeave from './User/LeaveApplications'
// import SidebarLinkGroup from '../Sidebar/SidebarLinkGroup';
import Logo from '../../images/logo/logo.png';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {


  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-blue-950 drop-shadow-1 dark:bg-pink-600 dark:drop-shadow-none" >
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

        </div>
        <NavLink to="/uhomepage">
          <img src={Logo} alt="Logo" width="125"
            height="125" />
        </NavLink>

        <div className="hidden sm:block">
          <NavLink
            to="/uhomepage"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950`}

          >

            DashBoard
          </NavLink>
        </div>
        <div className="hidden sm:block">
          <NavLink
            to="/applyHostel"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950`}
          >

            Apply Hostel
          </NavLink>
        </div>
        <div className="hidden sm:block">
          <NavLink
            to="/showStudentAnnouncements"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                    `}
          >

            Announcements
          </NavLink>
        </div>
        <div className="hidden sm:block">
          <NavLink
            to="/getinoutdetailStudent"
            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                    `}
          >

            In-Out Details
          </NavLink>
        </div>
        <div className="hidden sm:block">
          <DropDownLeave />
        </div>
        <div className="hidden sm:block">
          <DropDownFeedbacks />
        </div>
        <div className="hidden sm:block">
          <DropDownRoom />
        </div>

        <div className="hidden sm:block">
          <DropDownSettings />
        </div>


        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">

            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          {/* <DropDownFeedbacks /> */}
          {/* <!-- User Area --> */}
        </div>

      </div>
    </header>
  );
};

export default Header;
