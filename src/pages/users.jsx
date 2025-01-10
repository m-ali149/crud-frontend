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
    <div className="bg-yellow-200">
      <div className="w-full mx-auto flex justify-center">
        <Link to="/users/create"> <button className="  bg-green-600 text-white px-5 py-2 border-white border-[2px] rounded-lg mt-6"> Add User</button> </Link>
      </div>
      <div className="flex flex-wrap gap-4 w-[90%]  mx-auto pt-14 justify-left">
        {users.map((mereusers) => {
          return (
            <>
              <div className="card rounded-md bg-slate-300  w-52 h-80" key={mereusers._id}>
                <figure>
                  <img src={mereusers.avatar} alt="car!" className="h-52 w-full" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{mereusers.firstName}</h2>
                  <p>{mereusers.lastName}</p>
                  <div className=" flex space-x-3">
                    <Link
                      to={`/user/${mereusers._id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-error"
                      onClick={() => deleteUser(mereusers._id)}
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div >
            </>
          );
        })}
      </div>
    </div >
  );
}
