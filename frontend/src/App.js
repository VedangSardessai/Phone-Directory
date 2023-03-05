import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contactState } from "./reducers/contactSlice";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: whitesmoke;
`;
const SearchBar = styled.input`
  color: white;
  background-color: transparent;
  font-size: 22px;
  padding: 10px;
  ::placeholder {
    color: white;
  }
`;

const GridCont = styled.div`
  padding-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 80px;
`;

const Name = styled.input`
  color: white;
  background-color: transparent;
  font-size: 22px;
  padding: 10px;
  ::placeholder {
    color: white;
  }
`;

const Phone = styled.input`
  color: white;
  background-color: transparent;
  font-size: 22px;
  padding: 10px;
  ::placeholder {
    color: white;
  }
`;

const AddContact = styled.button`
  color: white;
  margin: 25px;
  width: 250px;
  height: 50px;
  font-size: 20px;
  background-color: green;
  border-radius: 5px;
  border: none;
  :hover {
    background-position: right center; /* change the direction of the change here */
    color: lightgreen;
    text-decoration: none;
  }
`;

const DeleteContact = styled.button`
  color: white;
  margin: 5px 0 5px 0;
  height: 50px;
  font-size: 20px;
  background-color: red;
  border-radius: 5px;
  border: none;
  :hover {
    background-position: right center; /* change the direction of the change here */
    color: orange;
    text-decoration: none;
  }
`;

const ErrorDiv = styled.p`
  color: red;
  font-size: 18px;
`;

function App() {
  const [nameError, setNameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");

  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();
  const contactArr = contacts.contactReducer;
  const [dataArray, setDataArray] = useState(contactArr);

  const addContact = (e) => {
    e.preventDefault();
    if (!name) setNameError(true);
    if (!phone) setPhoneError(true);

    console.log(contacts);
    if (phone) setPhoneError(false);

    if (name) setNameError(false);

    const checkName = contactArr.find(
      (contact) => contact.name === name && name
    );

    const checkPhone = contactArr.find(
      (contact) => contact.number === phone && phone
    );

    if (checkName || checkPhone)
      return toast.error("Contact Already Exists", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    if (phone && name) {
      const contactData = {
        id:
          contactArr.length > 0 ? contactArr[contactArr.length - 1].id + 1 : 0,
        name: name,
        number: phone,
      };

      dispatch({
        type: "ADD_CONTACT",
        payload: contactData,
      });

      toast.success("Contact Saved");
      // console.log(contactData);
    }

    console.log(contactState);
  };

  const deleteContact = (id) => {
    dispatch({
      type: "DELETE_CONTACT",
      payload: id,
    });
  };

  useEffect(() => {
    setDataArray(contacts.contactReducer);
    console.log(contacts.contactReducer);
  }, [contacts.contactReducer]);

  return (
    <div className="App">
      <header className="App-header">
        {/* Same as */}
        <ToastContainer
          style={{
            color: "red",
            fontSize: "18px",
          }}
        />
        <Title>Phone Directory</Title>
        <SearchBar
          name="searchInput"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Your Contact Name"
        ></SearchBar>

        <br />
        <br />
        <div>{contacts.contactReducer.name}</div>
        <Title>Add New Contact Or Delete Contact</Title>
        <GridCont>
          <Name
            required
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Name"
          ></Name>
          {nameError && <ErrorDiv>Name cannot be empty</ErrorDiv>}
          <Phone
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Enter Phone"
          ></Phone>
          {phoneError && <ErrorDiv>Phone cannot be empty</ErrorDiv>}
        </GridCont>

        <GridCont>
          <AddContact onClick={addContact}>Add Contact</AddContact>
        </GridCont>
      </header>
      {contactArr.length > 0 ? (
        <table id="customers">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Delete</th>
            </tr>
          </thead>
          {dataArray.map((friend, index) => (
            <>
              <tr key={index}>
                <td>{friend.id}</td>
                <td>{friend.name}</td>
                <td>{friend.number}</td>
                <td>
                  {" "}
                  <DeleteContact onClick={() => deleteContact(friend.id)}>
                    Delete Contact
                  </DeleteContact>
                </td>
              </tr>
            </>
          ))}
        </table>
      ) : (
        <Title>Contact List Is Empty</Title>
      )}
    </div>
  );
}

export default App;
