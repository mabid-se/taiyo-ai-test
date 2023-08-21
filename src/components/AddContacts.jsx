import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../store/contactsSlice";

const AddContact = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    const newContact = {
      id: Date.now(),
      firstName,
      lastName,
      status,
    };

    //  validation for form submission
    if (firstName === "" || lastName === "" || status === "") {
      if (firstName === "") console.log("please enter first name");
      else if (lastName === "") console.log("please enter the last name");
      else console.log("please select the status");
    } else dispatch(addContact(newContact));

    // Clear form fields
    setFirstName("");
    setLastName("");
    setStatus("");
  };

  return (
    <>
      <div className="flex justify-center align-center">
        <div className="w-10/12">
          <form class="w-full my-8 p-8 shadow-xl rounded-lg">
            <div className="flex flex-wrap mb-6 justify-center">
              <h2 className="text-2xl">Enter Contact Details</h2>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  First Name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div class="w-full md:w-1/2 px-3 mt-4 md:mt-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Status
            </label>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <div className="bg-[#E5E7EB] py-2 px-4 rounded-lg">
                  <input
                    type="radio"
                    className="radio"
                    value="active"
                    checked={status === "active"}
                    onChange={() => setStatus("active")}
                  />
                  <span className="ml-4 label-text text-lg">Active</span>
                </div>
              </div>
              <div class="w-full md:w-1/2 px-3 mt-4">
                <div className="bg-[#E5E7EB] py-2 px-4 rounded-lg">
                  <input
                    type="radio"
                    className="radio"
                    value="inactive"
                    checked={status === "inactive"}
                    onChange={() => setStatus("inactive")}
                  />
                  <span className="ml-4 label-text text-lg">Inactive</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <button
                class="w-full mx-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={handleSubmit}
              >
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContact;
