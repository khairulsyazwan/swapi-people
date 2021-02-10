import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios").default;

function AllPeople() {
  const [people, setPeople] = useState();
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    getAllPeople();
  }, []);

  async function getAllPeople() {
    try {
      const response = await axios.get("https://swapi.dev/api/people/");
      // console.log(response.data.results);
      setPeople(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error(error);
    }
  }

  async function pageSelect(page) {
    try {
      const response = await axios.get(page);
      // console.log(response.data.results);
      setPeople(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>All people</h1>
      <ul>
        {people &&
          people.map((people, index) => {
            return (
              <li key={index}>
                <Link to={`people/${people.url.split("/").slice(-2)[0]}`}>
                  {people.name}
                </Link>
              </li>
            );
          })}
      </ul>
      {prevPage != null && (
        <h2 onClick={() => pageSelect(prevPage)}>Previous</h2>
      )}
      {nextPage != null && <h2 onClick={() => pageSelect(nextPage)}>Next</h2>}
    </div>
  );
}

export default AllPeople;
