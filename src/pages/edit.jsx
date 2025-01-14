// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function Edit() {
//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         password: "",
//     });

//     const { id } = useParams();
//     const navigate = useNavigate();



//     const [avatar, setAvatar] = useState(null);

//     // Handle input field changes
//     const changeHandler = (e) => {
//         const { name, value } = e.target;
//         setUser((prevUser) => ({ ...prevUser, [name]: value }));
//     };

//     // Handle file selection
//     const handleFileChange = (e) => {
//         setAvatar(e.target.files[0]);
//     };

//     // Handle form submission
//     const submitHandler = async (e) => {
//         e.preventDefault();

//         // Create a FormData object to handle file upload
//         const formData = new FormData();
//         formData.append("firstName", user.firstName);
//         formData.append("lastName", user.lastName);
//         formData.append("email", user.email);
//         formData.append("password", user.password);
//         if (avatar) {
//             formData.append("avatar", avatar);
//         }

//         try {
//             const response = await axios.patch(`http://localhost:5000/users/${id}`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             // Reset form fields
//             setUser({ firstName: "", lastName: "", email: "", password: "" });
//             setAvatar(null);

//             console.log("Response data:", response.data);
//             toast.success("User Updated successfully");
//             navigate("/");

//         } catch (error) {
//             console.error("Error Updating user:", error);
//             toast.error("Failed to Update user");
//         }

//     };


//     async function fatchUser() {
//         const data = await axios.get(`http://localhost:5000/user/${id}`);
//         console.log(data.data);
//         setUser(data.data);
//     }

//     useEffect(() => {
//         fatchUser();
//     }, [fatchUser]);

//     return (
//         <div>
//             <div className="w-1/2 mx-auto p-4 bg-yellow-200 rounded-lg">
//                 <h1 className="text-2xl font-semibold mb-4">Edit User</h1>
//                 <form onSubmit={submitHandler} className="space-y-4">
//                     {/* First Name */}
//                     <label className="flex items-center gap-2">
//                         {/* SVG Icon */}
//                         <input
//                             type="text"
//                             className="flex-grow p-2 border rounded"
//                             placeholder="First name"
//                             value={user.firstName}
//                             onChange={changeHandler}
//                             name="firstName"
//                             required
//                         />
//                     </label>

//                     {/* Last Name */}
//                     <label className="flex items-center gap-2">
//                         {/* SVG Icon */}
//                         <input
//                             type="text"
//                             className="flex-grow p-2 border rounded"
//                             placeholder="Last name"
//                             value={user.lastName}
//                             onChange={changeHandler}
//                             name="lastName"
//                             required
//                         />
//                     </label>

//                     {/* Email */}
//                     <label className="flex items-center gap-2">
//                         {/* SVG Icon */}
//                         <input
//                             type="email"
//                             className="flex-grow p-2 border rounded"
//                             placeholder="Email"
//                             value={user.email}
//                             onChange={changeHandler}
//                             name="email"
//                             required
//                         />
//                     </label>

//                     {/* Password */}
//                     <label className="flex items-center gap-2">
//                         {/* SVG Icon */}
//                         <input
//                             type="password"
//                             className="flex-grow p-2 border rounded"
//                             placeholder="Password"
//                             value={user.password}
//                             onChange={changeHandler}
//                             name="password"
//                             required
//                         />
//                     </label>

//                     {/* Avatar Upload */}
//                     <label className="flex items-center gap-2">
//                         {/* SVG Icon */}
//                         <input
//                             type="file"
//                             accept="image/*"
//                             className="flex-grow p-2 border rounded"
//                             onChange={handleFileChange}
//                             name="avatar"
//                         />
//                     </label>

//                     {/* Submit Button */}
//                     <button className="btn btn-neutral w-full" type="submit">
//                         Update
//                     </button>
//                 </form>
//             </div>
//             <div className="w-full mx-auto flex justify-center">
//                 <Link to="/"> <button className="  bg-green-600 text-white px-5 py-2 border-white border-[2px] rounded-lg mt-6">Show All Users</button> </Link>
//             </div>
//         </div>
//     );
// }

// export default Edit;

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Edit() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const { id } = useParams();
    const navigate = useNavigate();

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

    // Fetch user data (memoized to prevent unnecessary re-renders)
    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKED_URL}/user/${id}`);
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            toast.error("Failed to fetch user details");
        }
    }, [id]);

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
            const response = await axios.patch(`${process.env.REACT_APP_BACKED_URL}/users/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Reset form fields
            setUser({ firstName: "", lastName: "", email: "", password: "" });
            setAvatar(null);

            console.log("Response data:", response.data);
            toast.success("User updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
        }
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg p-6 bg-yellow-200 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4 text-center">Edit User</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <label className="flex flex-col">
                        <span className="mb-1 font-medium">First Name</span>
                        <input
                            type="text"
                            className="p-2 border rounded"
                            placeholder="First name"
                            value={user.firstName}
                            onChange={changeHandler}
                            name="firstName"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 font-medium">Last Name</span>
                        <input
                            type="text"
                            className="p-2 border rounded"
                            placeholder="Last name"
                            value={user.lastName}
                            onChange={changeHandler}
                            name="lastName"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 font-medium">Email</span>
                        <input
                            type="email"
                            className="p-2 border rounded"
                            placeholder="Email"
                            value={user.email}
                            onChange={changeHandler}
                            name="email"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 font-medium">Password</span>
                        <input
                            type="password"
                            className="p-2 border rounded"
                            placeholder="Password"
                            value={user.password}
                            onChange={changeHandler}
                            name="password"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1 font-medium">Avatar</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="p-2 border rounded"
                            onChange={handleFileChange}
                            name="avatar"
                        />
                    </label>
                    <button
                        className="w-full p-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-800"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
            <div className="mt-6">
                <Link to="/">
                    <button className="bg-green-600 text-white px-4 py-2 border-white border-[2px] rounded-lg hover:bg-green-700">
                        Show All Users
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Edit;
