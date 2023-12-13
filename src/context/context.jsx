import { createContext, useState, useEffect } from "react";
import mockUser from "./Data/user";
import mockFollowers from "./Data/followers";
import axios from "axios";

export const GithubContext = createContext();
const baseUrl = "https://api.github.com";

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });
  const [isLoading, setIsLoading] = useState(false);

  const searchUser = async (user) => {
    setIsLoading(true);
    const url = `${baseUrl}/users/${user}`;

    // fetch req to the user url
    const { data } = await axios(url);
    if (data){
        //set up user
        setGithubUser(data)
        const { followers_url} = data
        const {data : followData}  = await axios(`${followers_url}?per_page=100`)
        setFollowers(followData)


    } else {
        //display error
        setError({ show: true, msg: "There is no user with that name"})
    }

    setIsLoading(false);
    checkReq();
  };
  //fetchrequest to the user url
  //fetchrequest to the user followers

  const checkReq = async () => {
    try {
      const {
        data: {
          rate: { remaining },
        },
      } = await axios(`${baseUrl}/rate_limit`);
      setRequests(remaining);

      if (remaining === 0) {
        setError({
          show: true,
          msg: "Sorry you have exceeded your hourly rate limit",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkReq();
  }, []);

  return (
    <GithubContext.Provider
      value={{ githubUser, followers, requests, error, isLoading, searchUser }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubProvider;
