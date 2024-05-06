import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/homeindex';
import Sidebar from '../components/Sidebar/HomePage';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-blue-950 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        {/*Uncomment the below line if you want to display the sidebar in the homepage*/}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">

          {/*comment the below line if you dont want to display the sidebar in the homepage*/}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
