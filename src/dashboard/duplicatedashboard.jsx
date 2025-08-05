import { useState,useEffect } from "react";
import UnauthenticatedNavbar from "../components/unauthnavbar";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function DuplicateDashboard() {
  const [botid, setbotid] = useState('');
  const [expensesdata, setexpensesdata] = useState([]);
  const [error, seterror] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [recurringexpenses, setRecurringExpenses] = useState([]);
  const [remainders, setRemainders] = useState([]);
  const [totalexpenses,settotalexpenses]=useState(0);
  const limit = 15;
//Fetch expenses and recent transactions using botid
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
        console.log(response.data.expenses);
        setRecurringExpenses(response.data.recurringexpenses || []);
        setRemainders(response.data.remainders || []);
        console.log('remainders:',response.data.remainders);
        settotalexpenses(response.data.totalexpenses);
        console.log("Total Expenses:", totalexpenses);
      
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

  const handledelteremainders=async(index)=>{
    const backendURL=process.env.REACT_APP_URL;
    try{
      const response=await axios.post(`${backendURL}/userdash/getexpenses/deleteremainders`,{botid,index})
      if(response.data.success){
        setRemainders((prev)=>prev.filter((_,i) => i!==index));
        console.log("Remainder deleted successfully");
      }

    }
    catch(error){
      seterror("Failed to delete reminder. Please try again.");
    }
  }

  // caluclate total expenses
useEffect(() => {
  console.log("Total Expenses (updated):", totalexpenses);
}, [totalexpenses]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="my-4">
        <UnauthenticatedNavbar />
      </div>
      
      <div className="p-6 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Expense Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">To fetch your expenses, paste your Telegram bot ID:</p>
          <div className="flex gap-4">
            <input
              type="text"
              name="botid"
              id="botid"
              value={botid}
              onChange={(e) => setbotid(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400"
              placeholder="Enter your bot ID here..."
            />
            <button
              onClick={handlesubmitbotid}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Submit
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-600 dark:text-red-300">
              {error}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Transactions</h2>
            </div>
            <div className="p-6">
              {expensesdata.length > 0 ? (
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">Category</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {expensesdata.map((expense, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                              {new Date(expense.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                              ₹{expense.amount}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                              {expense.category}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {hasMore && (
                    <div className="text-center mt-6">
                      <button
                        onClick={handleloadmore}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                      >
                        Load More
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                !error && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500 text-lg">
                      📊
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">No expenses are added yet.</p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right Column - Summary Cards */}
          <div className="space-y-6">
            {/* Total Expenses Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Expenses</h3>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                    ₹{totalexpenses.toLocaleString()}
                  </p>
                </div>
                <div className="text-4xl text-blue-500">💰</div>
              </div>
            </div>

            {/* Recurring Expenses Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recurring Expenses</h3>
                </div>
              </div>
              <div className="p-6">
                {recurringexpenses.length > 0 ? (
                  <div className="space-y-3">
                    {recurringexpenses.map((expense, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">₹{expense.amount}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{expense.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{expense.date}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">{expense.frequency}</p>
                          </div>
                          <button onClick={()=>handledeleterecurringexpenses(index)}></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">No recurring expenses</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reminders Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏰</span>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Reminders</h3>
                </div>
              </div>
              <div className="p-6">
                {remainders.length > 0 ? (
                  <div className="space-y-3">
                    {remainders.map((reminder, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">₹{reminder.amount}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{reminder.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{reminder.date}</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400">{reminder.duration} days</p>
                          </div>
                          <button  className="text-xl" onClick={() => handledelteremainders(index)}><MdDelete /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">No reminders set</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}