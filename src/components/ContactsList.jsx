import React, { Fragment, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../store/contactsSlice";
import { Dialog, Transition } from "@headlessui/react";

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);

  //  reverse the contacts list to show the last added contact first
  const reversedContacts = contacts
    .slice(0)
    .reverse()
    .map((item) => item);

  // handel modal open state
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  //  handle the contact delete request
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  //  handle updated first-name, last-name and status states
  const [firstNameUpdate, setFirstNameUpdate] = useState("");
  const [lastNameUpdate, setLastNameUpdate] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("active");

  // handle current active contact to which update request is being made
  const [currentContact, setCurrentContact] = useState(null);

  //  handle the update button click
  const handleEditClick = (contact) => {
    setCurrentContact(contact);
    setFirstNameUpdate(contact.firstName);
    setLastNameUpdate(contact.lastName);
    setStatusUpdate(contact.status);
    setOpen(true);
  };

  // handle the update contact request
  const handleUpdate = (contact) => {
    const id = contact.id;
    const updateContactData = {
      firstName: firstNameUpdate,
      lastName: lastNameUpdate,
      status: statusUpdate,
    };

    //  validation for form submission
    if (
      updateContactData.firstName === "" ||
      updateContactData.lastName === "" ||
      updateContactData.status === ""
    ) {
      // alert messages for every empty form field
      if (firstNameUpdate === "") console.log("Please enter the First Name");
      else if (lastNameUpdate === "")
        console.log("Please enter the Last Name!");
      else console.log("Please select the Status!");
    } else {
      dispatch(updateContact({ id, ...updateContactData }));
      console.log("User Updated Sucessfully!");
    }

    // Clear form fields
    setFirstNameUpdate("");
    setLastNameUpdate("");
    setStatusUpdate("");
    setCurrentContact("");
    setOpen(false);
  };

  return (
    <div>
      <>
        {/* saved contacts data table */}
        <div class="relative">
          <div className="flex justify-center align-center">
            <div className="w-10/12 overflow-x-auto">
              {reversedContacts.length > 0 ? (
                //  show this if there are stored contacts.
                <table class="my-8 w-full text-sm text-left text-gray-500 shadow-xl rounded-lg">
                  <thead class="text-xs text-gray-700 uppercase bg-[#F1F0E8]">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-4 text-md md:text-xl rounded-tl-lg capitalize"
                      >
                        first name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-4 text-md md:text-xl capitalize"
                      >
                        last name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-4 text-md md:text-xl capitalize"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-4 text-md md:text-xl capitalize"
                      >
                        update contact
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-4 text-md md:text-xl capitalize rounded-tr-lg"
                      >
                        delete contact
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reversedContacts.map((contact, index) => (
                      <>
                        <tr
                          className={`${
                            index % 2 !== 0 ? "bg-[#F1F0E8]" : "bg-[#ffffff]"
                          }`}
                        >
                          <td class="px-6 py-4 text-md md:text-lg capitalize">
                            {contact.firstName}
                          </td>
                          <td class="px-6 py-4 text-md md:text-lg capitalize">
                            {contact.lastName}
                          </td>
                          <td class="px-6 py-4 text-md md:text-lg capitalize">
                            {contact.status}
                          </td>
                          <td class="px-6 py-4">
                            <button
                              class="w-2/3 mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 md:py-2 px-3 md:px-4 border border-blue-500 hover:border-transparent rounded"
                              onClick={() => handleEditClick(contact)}
                            >
                              Update
                            </button>
                          </td>
                          <td class="px-6 py-4">
                            <button
                              class="w-2/3 mx-2 bg-transparent hover:bg-[#ed5e68] text-[#ed5e68] font-semibold hover:text-white py-1 md:py-2 px-3 md:px-4 border border-[#ed5e68] hover:border-transparent rounded"
                              onClick={() => handleDelete(contact.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              ) : (
                //  show this if there is no stored contact.
                <div className="flex p-8 justify-center shadow-xl rounded-lg">
                  <h2 className="text-2xl text-blue-800">
                    There are no saved contacts to show!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Update contact  */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <Dialog.Title
                        as="h3"
                        className="mt-2 mb-8 text-center text-2xl font-semibold leading-6 text-gray-900"
                      >
                        Update Contact
                      </Dialog.Title>
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
                        value={firstNameUpdate}
                        onChange={(e) => setFirstNameUpdate(e.target.value)}
                      />
                      <label
                        class="mt-6 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Last Name
                      </label>
                      <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="text"
                        placeholder="First Name"
                        value={lastNameUpdate}
                        onChange={(e) => setLastNameUpdate(e.target.value)}
                      />
                      <label
                        class="mt-6 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-last-name"
                      >
                        Status
                      </label>
                      <div className="flex flex-wrap">
                        <div className="w-1/2 pr-2 sm:pr-4">
                          <div className="bg-[#E5E7EB] py-2 px-2 sm:px-4 rounded-lg">
                            <input
                              type="radio"
                              className="radio"
                              value="active"
                              checked={statusUpdate === "active"}
                              onChange={() => setStatusUpdate("active")}
                            />
                            <span className="ml-2 sm:ml-4 label-text text-lg">
                              Active
                            </span>
                          </div>
                        </div>
                        <div className="w-1/2 pr-2 sm:pl-4">
                          <div className="bg-[#E5E7EB] py-2 px-2 sm:px-4 rounded-lg">
                            <input
                              type="radio"
                              className="radio"
                              value="inactive"
                              checked={statusUpdate === "inactive"}
                              onChange={() => setStatusUpdate("inactive")}
                            />
                            <span className="ml-2 sm:ml-4 label-text text-lg">
                              Inactive
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          handleUpdate(currentContact);
                        }}
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    </div>
  );
};

export default ContactsList;
