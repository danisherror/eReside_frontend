import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div className="relative">
            <Link
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950`}
                to="#"
            >

                Hostel
            </Link>

            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-blue-950 shadow-default dark:border-strokedark dark:bg-pink-700 ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
            >
                <ul className="hidden sm:block">
                    <li>
                        <Link
                            to="/getHostelDetails"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                              `}
                        >
                            Hostel Details
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/createHostel"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                              `}
                        >
                            Create Hostel
                        </Link>
                    </li>
                    <li>
                        <Link
                           to="/deleteHostel"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                              `}
                        >
                            Delete Hostel
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/showAllWardenDetails"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                              `}
                        >
                            Wardens Details
                        </Link>
                    </li>
                    <li>
                        <Link
                           to="/createWarden"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                              `}
                        >
                            Create Warden
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/deleteWarden"
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-pink-700 dark:hover:bg-blue-950
                              `}
                        >
                            Delete Warden
                        </Link>
                    </li>
                </ul>
            </div>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};

export default DropdownUser;
