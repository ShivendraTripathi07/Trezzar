import React, { useState } from "react";
import ROLE from "../common/role";
import { X, UserCog } from "lucide-react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm perspective-1000">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 
        transform rotate-x-3 hover:rotate-x-0 hover:scale-105 transition-all duration-500 ease-in-out 
        origin-center bg-gradient-to-br from-white via-white to-blue-50 
        border border-gray-100 p-1"
      >
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none transition-colors duration-300 
            hover:rotate-90 transform"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="relative bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-full shadow-md transform transition-transform hover:scale-110">
              <UserCog className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
              Modify User Role
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-inner">
              <div className="flex justify-between items-center mb-2 group">
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                  Name
                </span>
                <p
                  className="text-sm font-bold text-gray-800 tracking-wide 
                  group-hover:text-blue-800 transition-colors"
                >
                  {name}
                </p>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                  Email
                </span>
                <p
                  className="text-sm font-bold text-gray-800 tracking-wide 
                  group-hover:text-blue-800 transition-colors truncate max-w-[200px]"
                >
                  {email}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select New Role
              </label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    transition-all duration-300 appearance-none 
                    bg-white text-gray-900 font-medium
                    hover:border-blue-400 hover:shadow-md"
                  value={userRole}
                  onChange={handleOnChangeSelect}
                >
                  {Object.values(ROLE).map((el) => (
                    <option
                      key={el}
                      value={el}
                      className="text-gray-900 font-medium"
                    >
                      {el.charAt(0).toUpperCase() + el.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={updateUserRole}
              className="px-6 py-2 bg-blue-600 text-white rounded-md 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 transition-all duration-300 ease-in-out 
                transform hover:scale-105 hover:shadow-lg font-semibold tracking-wide"
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
