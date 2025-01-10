// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// function Create() {
//   const [user, setUser] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const changeHandler = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setUser({ ...user, [name]: value });
//   };
//   async function submitHandler(e) {
//     e.preventDefault();
//     const data = await axios.post("http://localhost:5000/create", user);
//     setUser({ firstName: "", lastName: "", email: "", password: "" });
//     console.log("data", data);
//     toast.success("User created successfully");
//   }
//   return (
//     <div className="w-1/2 mx-auto">
//       <h1 className="text-2xl font-semibold">Create User</h1>
//       <form onSubmit={submitHandler}>
//         <label className="input input-bordered flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="h-4 w-4 opacity-70"
//           >
//             <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//             <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//           </svg>
//           <input
//             type="text"
//             className="grow"
//             placeholder="First name"
//             value={user.firstName}
//             onChange={changeHandler}
//             name="firstName"
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="h-4 w-4 opacity-70"
//           >
//             <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//             <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//           </svg>
//           <input
//             type="text"
//             className="grow"
//             placeholder="Last name"
//             value={user.lastName}
//             onChange={changeHandler}
//             name="lastName"
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="h-4 w-4 opacity-70"
//           >
//             <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//             <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//           </svg>
//           <input
//             type="text"
//             className="grow"
//             placeholder="Email"
//             value={user.email}
//             onChange={changeHandler}
//             name="email"
//           />
//         </label>

//         <label className="input input-bordered flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 16 16"
//             fill="currentColor"
//             className="h-4 w-4 opacity-70"
//           >
//             <path
//               fillRule="evenodd"
//               d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input
//             type="password"
//             className="grow"
//             placeholder="Password"
//             value={user.password}
//             onChange={changeHandler}
//             name="password"
//           />
//         </label>
//         <button className="btn btn-neutral mt-2" type="submit">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Create;


import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Create() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);

  // Handle input field changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.post("http://localhost:5000/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form fields
      setUser({ firstName: "", lastName: "", email: "", password: "" });
      setAvatar(null);

      console.log("Response data:", response.data);
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  return (
    <div>
      <div className="w-1/2 mx-auto p-4 bg-yellow-200 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Create User</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* First Name */}
          <label className="flex items-center gap-2">
            {/* SVG Icon */}
            <input
              type="text"
              className="flex-grow p-2 border rounded"
              placeholder="First name"
              value={user.firstName}
              onChange={changeHandler}
              name="firstName"
              required
            />
          </label>

          {/* Last Name */}
          <label className="flex items-center gap-2">
            {/* SVG Icon */}
            <input
              type="text"
              className="flex-grow p-2 border rounded"
              placeholder="Last name"
              value={user.lastName}
              onChange={changeHandler}
              name="lastName"
              required
            />
          </label>

          {/* Email */}
          <label className="flex items-center gap-2">
            {/* SVG Icon */}
            <input
              type="email"
              className="flex-grow p-2 border rounded"
              placeholder="Email"
              value={user.email}
              onChange={changeHandler}
              name="email"
              required
            />
          </label>

          {/* Password */}
          <label className="flex items-center gap-2">
            {/* SVG Icon */}
            <input
              type="password"
              className="flex-grow p-2 border rounded"
              placeholder="Password"
              value={user.password}
              onChange={changeHandler}
              name="password"
              required
            />
          </label>

          {/* Avatar Upload */}
          <label className="flex items-center gap-2">
            {/* SVG Icon */}
            <input
              type="file"
              accept="image/*"
              className="flex-grow p-2 border rounded"
              onChange={handleFileChange}
              name="avatar"
            />
          </label>

          {/* Submit Button */}
          <button className="btn btn-neutral w-full" type="submit">
            Register
          </button>
        </form>
      </div>
      <div className="w-full mx-auto flex justify-center">
        <Link to="/"> <button className="  bg-green-600 text-white px-5 py-2 border-white border-[2px] rounded-lg mt-6">Show All Users</button> </Link>
      </div>
    </div>
  );
}

export default Create;
