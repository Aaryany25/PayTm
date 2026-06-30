import React from 'react'
// import { Button } from "./Button"

import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from './Button';

function Users() {
      const [users, setUsers] = useState([]);

      const [filter, setFilter] = useState("");
 useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

  return (
    <>
     <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200 mt-5"></input>
      <div className='mt-5'>
            {users.map(user => <User user={user} />)}
        </div>
    </>
  )
}
function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
            {/* <Button label={}/> */}
        </div>
    </div>
}
export default Users