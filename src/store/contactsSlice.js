import { createSlice } from "@reduxjs/toolkit";

const loadContactFromLocatStorage = () => {
  const contacts = localStorage.getItem("contacts");
  return contacts ? JSON.parse(contacts) : [];
};

const saveContactsToLocalStorage = (contacts) =>
  localStorage.setItem("contacts", JSON.stringify(contacts));

const contactsSlice = createSlice({
  name: "contacts",
  initialState: loadContactFromLocatStorage(),
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
      saveContactsToLocalStorage(state);
    },

    updateContact: (state, action) => {
      const { id, ...updatedContact } = action.payload;
      console.log("updatedContact hase:", updatedContact);
      const updatedContacts = state.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      );
      saveContactsToLocalStorage(updatedContacts);
      return updatedContacts;
    },

    deleteContact: (state, action) => {
      const idToDelete = action.payload;
      const updatedContacts = state.filter(
        (contact) => contact.id !== idToDelete
      );
      saveContactsToLocalStorage(updatedContacts);
      return updatedContacts;
    },
  },
});

export const { addContact, updateContact, deleteContact } =
  contactsSlice.actions;

export default contactsSlice.reducer;
