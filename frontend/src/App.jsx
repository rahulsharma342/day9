import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);

  //  fetch data from json server
  function fetchData() {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        console.log("FULL RESPONSE 👉", response);
        console.log("DATA 👉", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }

  console.log("DATA IN STATE 👉", data);

  useEffect(() => {
    fetchData();
  }, []);

  // add user function
  function handlesubmit(e) {
    e.preventDefault();
    const { name, email, mobile_n } = e.target;
    // console.log(name.value, email.value, mobile_n.value);
    if(name.value==="" || email.value==="" || mobile_n.value===""){
      alert("Please fill all the fields");
      return;
    }
    // post request to json server
    axios.post("http://localhost:3000/users", {
      name: name.value,
      email: email.value,
      mobile_n: mobile_n.value,
    })
    .then((res)=>{
      console.log(res.data);
      fetchData();
    })
    .catch((err)=>{
      console.log("Error adding user:", err);
    });
  } 
 function deleteUser(id){
  axios.delete(`http://localhost:3000/users/${id}`)
  .then((res)=>{
    console.log(res.data);
    fetchData();
  })
  .catch((err)=>{
    console.log("Error deleting user:", err);
  });
 }
  function UpdateUser(id, name, email, mobile_n) {
    if (!id) {
      console.log("No ID provided for update");
      return;
    }
    
    const newName = prompt("Enter new name", name);
    const newEmail = prompt("Enter new email", email);
    const newMobileN = prompt("Enter new mobile number", mobile_n);
    
    if(newName === null || newEmail === null || newMobileN === null) {
      // User cancelled the prompt
      return;
    }
    
    if(newName === "" || newEmail === "" || newMobileN === "") {
      alert("Please fill all the fields");
      return;
    }
    
    axios.patch(`http://localhost:3000/users/${id}`, {
      name: newName,
      email: newEmail,
      mobile_n: newMobileN,
    })
    .then((res) => {
      console.log(res.data);
      fetchData();
    })
    .catch((err) => {
      console.log("Error updating user:", err);
    });
  }

 

  return (
    <div>
      <form onSubmit={handlesubmit} className="flex m-4 p-4  space-x-4">
        <input
          name="name"
          className="border p-3"
          type="text"
          placeholder="name"
        />
        <input
          name="email"
          className="border p-3"
          type="email"
          placeholder="email"
        />
        <input
          name="mobile_n"
          className="border p-3"
          type="Number"
          placeholder="mobile_n"
        />
        <button className="border p-3" type="submit">
          Add User
        </button>
      </form>
      <div className="Users flex flex-wrap ">
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="UsersCards m-4 p-4 h-40 w-50 border rounded bg-black/80 text-white "
            >
              <h2 className="">{data.name}</h2>
              <p>{data.email}</p>
              <p>{data.mobile_n}</p>
              <button onClick={() =>{deleteUser(data._id)}} className="border p-2 mt-2 m-2 bg-white text-black rounded">Delete</button>
              <button onClick={()=>{UpdateUser(data._id,data.name,data.email,data.mobile_n)}} className="border p-2 mt-2 m-2 bg-white text-black rounded">Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
