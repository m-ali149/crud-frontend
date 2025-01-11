import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    // const res = await fetch("http://localhost:5000");
    // const data = await res.json();
    const data = await axios.get("http://localhost:5000");
    console.log("data", data.data);
    setUsers(data.data);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  async function deleteUser(id) {
    await axios.delete(`http://localhost:5000/users/${id}`);
    const singleUser = users.filter((mereusers) => mereusers._id !== id);
    setUsers(singleUser);
    toast.success("User removed");
  }
  return (
    <div className="bg-yellow-200 min-h-screen">
      {/* Add User Button */}
      <div className="w-full mx-auto flex justify-center py-4">
        <Link to="/users/create">
          <button className="bg-green-600 text-white px-5 py-2 border-white border-[2px] rounded-lg hover:bg-green-700">
            Add User
          </button>
        </Link>
      </div>

      {/* User Cards */}
      <div className="flex flex-wrap gap-6 justify-center w-[90%] mx-auto pt-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="card bg-slate-300 rounded-lg shadow-lg w-60 md:w-72 flex flex-col"
          >
            {/* Avatar */}
            <div className="h-52 w-full overflow-hidden rounded-t-lg">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col items-start space-y-2">
              <h2 className="text-lg font-semibold">{user.firstName}</h2>
              <p className="text-sm text-gray-700">{user.lastName}</p>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-2">
                <Link
                  to={`/user/${user._id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
