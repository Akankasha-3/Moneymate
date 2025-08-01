import { useState } from "react";
import UnauthenticatedNavbar from "../components/unauthnavbar";
import axios from 'axios';

export default function DuplicateDashboard() {
  const [botid, setbotid] = useState('');
  const [expensesdata, setexpensesdata] = useState([]);
  const [error, seterror] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const limit = 15;

  const handlesubmitbotid = async () => {
    if (botid.trim() === '') {
      alert("Please enter a valid bot ID");
      return;
    }

    try {
      const backendURL = process.env.REACT_APP_URL;
      const response = await axios.post(`${backendURL}/userdash/getexpenses`, { botid, offset: 0, limit });

      if (response.data.success) {
        setexpensesdata(response.data.expenses);
        seterror(null);
        setOffset(limit);
        setHasMore(response.data.expenses.length === limit); // more if full page
      } else {
        setexpensesdata([]);
        seterror("User not found.");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
      seterror("Failed to fetch expenses. Please try again.");
      setexpensesdata([]);
      setHasMore(false);
    }
  };

  const handleloadmore = async () => {
    try {
      const backendURL = process.env.REACT_APP_URL;
      const response = await axios.post(`${backendURL}/userdash/getexpenses`, {
        botid,
        offset,
        limit,
      });

      if (response.data.success) {
        setexpensesdata((prev) => [...prev, ...response.data.expenses]);
        setOffset((prev) => prev + limit);
        setHasMore(response.data.expenses.length === limit); // if fewer than limit, no more to load
      }
    } catch (error) {
      console.error("Error loading more:", error);
      seterror("Something went wrong while loading more data.");
    }
  };

  return (
    <div>
      <div className="my-4">
        <UnauthenticatedNavbar />
      </div>
      <div className="p-4 mx-auto max-w-3xl">
        <p>To fetch your expenses, paste your Telegram bot ID:</p>
        <input
          type="text"
          name="botid"
          id="botid"
          value={botid}
          onChange={(e) => setbotid(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={handlesubmitbotid}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <h1 className="text-xl font-bold mt-6">Recent Transactions</h1>
        <section>
          <div className="container mx-auto px-4">
            {expensesdata.length > 0 ? (
              <table className="w-full mt-4 border-collapse border border-gray-300">
                <thead className="bg-gray-200 dark:bg-gray-800">
                  <tr>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Amount</th>
                    <th className="border p-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {expensesdata.map((expense, index) => (
                    <tr key={index} className="text-center">
                      <td className="border p-2">
                        {new Date(expense.date).toLocaleDateString()}
                      </td>
                      <td className="border p-2">{expense.amount}</td>
                      <td className="border p-2">{expense.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !error && <p className="mt-4">No expenses are added.</p>
            )}

            {hasMore && (
              <div className="text-center mt-4">
                <button
                  onClick={handleloadmore}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
