import React, { useState, useCallback } from "react";
import Searchbar from '../../components/Users/Searchbar/Searchbar'
import Users from '../../components/Users/Users'

function SearchUsers() {

  const [users,setUsers] = useState([])

  const onLoadUsers = useCallback((response) => {
    const users = Object.keys(response).map(key => ({key: key, ...response[key]}))
    setUsers(users)
  }, [])

  return (
      <div>
       <Searchbar loadData={onLoadUsers} dbDoc={"users"} />
        <hr />
        <Users loadedUsers={users}/>
      </div>
  )



}

export default SearchUsers;