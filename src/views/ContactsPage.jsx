import React from "react";
import ContactsList from "../components/ContactsList";
import AddContact from "../components/AddContacts";

const ContactsPage = () => {
  return (
    <div>
      <AddContact />
      <ContactsList />
    </div>
  );
};

export default ContactsPage;
