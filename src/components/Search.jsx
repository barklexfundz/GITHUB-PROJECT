import React, {useState} from "react";
import "../styles/search.css";
import { MdSearch } from "react-icons/md";
import { useGlobalContext } from "../hooks/useGlobalContext";



const Search = () => {
  const {error,requests,isLoading,searchUser} = useGlobalContext()
const [ user, setUser] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    searchUser(user)

  

  }
  return (
    <section className="section">
      <div className="section-center search-card">
        {error.show && <div className="error-wrapper"> <p>{error.msg}</p></div>}
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <MdSearch />
            <input type="text" placeholder="Enter Github user"value={user} onChange={(e) =>setUser (e.target.value) }/>

            {requests > 0 && !isLoading && <button type="submit">Search</button>}
          </div>
        </form>
        <h3 className="req"> Request: {` ${requests}` } /60</h3>
      </div>
    </section>
  );
};

export default Search;
