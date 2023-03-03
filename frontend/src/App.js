import React from "react";
import "./App.css";
import styled from "styled-components";
import { useState } from "react";
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
  margin: 25px;
  width: 250px;
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

  const addContact = (e) => {
    e.preventDefault();
    if (name == "") setNameError(true);
    if (phone == "") setPhoneError(true);
    else if (name != "" && phone != "") {
      setNameError(false);
      setPhoneError(false);

      console.log(name, "name");
      console.log(phone, "phone");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Title>Phone Directory</Title>
        <SearchBar
          name="searchInput"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Your Contact Name"
        ></SearchBar>

        <br />
        <br />

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
          <DeleteContact>Delete Contact</DeleteContact>
        </GridCont>
      </header>
    </div>
  );
}

export default App;
