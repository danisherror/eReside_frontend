import { Package } from '../../types/package';

const packageData: Package[] = [
  {
    type: 'Breakfast',
    day: 'Mon - Sat',
    timings: `7.30 A.M to 9.30 A.M`,
  },
  {
    type: 'Lunch',
    day: 'Mon - Sat',
    timings: `12.00 P.M to 2.15 P.M`,
  },
  {
    type: 'Snacks & Tea ',
    day: 'Mon - Fri',
    timings: `4.30 P.M to 5.30 P.M`,
  },
  {
    type: 'Dinner',
    day: 'Mon - Fri',
    timings: `7.30 P.M to 9.30 P.M`,
  },
];
const packageData1: Package[] = [
  {
    type: 'Breakfast',
    timings: `8.00 A.M to 10.00 A.M`,
  },
  {
    type: 'Lunch',
    timings: `12.30 P.M to 2.30 P.M`,
  },
  {
    type: 'Snacks & Tea ',
    timings: `4.30 P.M to 5.30 P.M`,
  },
  {
    type: 'Dinner',
    timings: `7.30 P.M to 9.30 P.M`,
  },
];

const TableThree = () => {
  return (
    <>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Monday to Saturday
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Timings
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.type}
                  </h5>
                  <p className="text-sm">{packageItem.day}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.timings}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
              Sunday and Holidays
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Timings
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData1.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.type}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.timings}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default TableThree;
