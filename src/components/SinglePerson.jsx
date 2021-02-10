import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios").default;

function SinglePerson() {
  const [person, setPerson] = useState();
  const [films, setFilms] = useState();
  const [homeworld, setHomeworld] = useState();
  const [species, setSpecies] = useState();
  const [starships, setStarships] = useState();
  const [vehicles, setVehicles] = useState();

  let { personid } = useParams();

  useEffect(() => {
    getOnePerson();
  }, []);

  async function getOnePerson() {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/${personid}/`
      );
      console.log(response.data);
      setPerson(response.data);
      getInfo(response.data.films, "film");
      getInfo(response.data.starships, "starships");
      getInfo(response.data.vehicles, "vehicles");
      getInfo(response.data.species, "species");
      getHomeworld(response.data.homeworld);
    } catch (error) {
      console.error(error);
    }
  }

  async function getInfo(urls, type) {
    let results = [];
    try {
      for (let index = 0; index < urls.length; index++) {
        const response = await axios.get(urls[index]);
        if (type === "film") {
          results.push(response.data.title);
        } else {
          results.push(response.data.name);
          console.log(response.data.name);
        }
      }
      switch (type) {
        case "film":
          setFilms(results);
          break;
        case "starships":
          setStarships(results);
          break;
        case "vehicles":
          setVehicles(results);
          break;
        case "species":
          setSpecies(results);
          console.log(results);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getHomeworld(homeworld) {
    try {
      const response = await axios.get(homeworld);
      // console.log(response.data.name);
      setHomeworld(response.data.name);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {person && (
        <div>
          <h1>Name: {person.name}</h1>
          <h1>
            Films:
            <ul>
              {films &&
                films.map((film, index) => {
                  return <li key={index}>{film}</li>;
                })}
            </ul>
          </h1>
          <h1>Homeworld: {homeworld && homeworld}</h1>
          <h1>Birth Year: {person.birth_year}</h1>
          <h1>
            Species:
            <ul>
              {species &&
                species.map((specie, index) => {
                  return <li key={index}>{specie}</li>;
                })}
            </ul>
          </h1>
          <h1>Height: {person.height}</h1>
          <h1>Mass: {person.mass}</h1>
          <h1>Hair Color: {person.hair_color}</h1>
          <h1>Eye Color: {person.eye_color}</h1>
          <h1>Skin Color: {person.skin_color}</h1>
          <h1>
            Starships:
            <ul>
              {starships &&
                starships.map((ship, index) => {
                  return <li key={index}>{ship}</li>;
                })}
            </ul>
          </h1>
          <h1>
            Vehicles:
            <ul>
              {vehicles &&
                vehicles.map((vehicle, index) => {
                  return <li key={index}>{vehicle}</li>;
                })}
            </ul>
          </h1>
        </div>
      )}
    </div>
  );
}

export default SinglePerson;
