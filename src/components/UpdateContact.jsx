import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateContact } from "../store/contactsSlice";

const UpdateContact = ({ contactId }) => {
  const dispatch = useDispatch();
  const contactToUpdate = useSelector((state) =>
    state.contacts.find((contact) => contact.id === contactId)
  );

  const [firstName, setFirstName] = useState(contactToUpdate.firstName);
  const [lastName, setLastName] = useState(contactToUpdate.lastName);
  const [status, setStatus] = useState(contactToUpdate.status);

  const handleSubmit = () => {
    const updatedContact = {
      id: contactId,
      firstName,
      lastName,
      status,
    };
    dispatch(updateContact(updatedContact));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label>
        Active
        <input
          type="radio"
          value="active"
          checked={status === "active"}
          onChange={() => setStatus("active")}
        />
      </label>
      <label>
        Inactive
        <input
          type="radio"
          value="inactive"
          checked={status === "inactive"}
          onChange={() => setStatus("inactive")}
        />
      </label>
      <button onClick={handleSubmit}>Update Contact</button>
    </div>
  );
};

export default UpdateContact;
