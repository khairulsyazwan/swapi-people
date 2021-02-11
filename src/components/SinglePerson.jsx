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
        `http://swapi.dev/api/people/${personid}/`
      );
      // console.log(response.data);
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
          // console.log(response.data.name);
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
    <>
      {person && (
        <div
          className="container-fluid d-flex align-items-center justify-content-center "
          style={{ height: "100vh" }}
        >
          <div className="align-items-center col-md-12">
            <h1 className="text-center" id="name">
              {person.name}
            </h1>

            <div className="d-flex justify-content-center container">
              <div className="col-md-6">
                <h1 className="title">Films: </h1>
                <ul>
                  <h2>
                    {films &&
                      films.map((film, index) => {
                        return <li key={index}>{film}</li>;
                      })}
                  </h2>
                </ul>

                {starships && starships.length !== 0 && (
                  <>
                    <h1 className="title">Starships: </h1>
                    <ul>
                      <h2>
                        {starships.map((ship, index) => {
                          return <li key={index}>{ship}</li>;
                        })}
                      </h2>
                    </ul>
                  </>
                )}
                {vehicles && vehicles.length !== 0 && (
                  <>
                    <h1 className="title">Vehicles: </h1>
                    <ul>
                      <h2>
                        {vehicles.map((vehicle, index) => {
                          return <li key={index}>{vehicle}</li>;
                        })}
                      </h2>
                    </ul>
                  </>
                )}
              </div>

              <div className="col-md-6">
                <h1 className="title">
                  Homeworld: <span>{homeworld && homeworld}</span>
                </h1>
                <h1 className="title">
                  Birth Year:<span> {person.birth_year}</span>
                </h1>
                {species && species.length !== 0 && (
                  <>
                    <h1 className="title">Species:</h1>
                    <ul>
                      <h2>
                        {species.map((specie, index) => {
                          return <li key={index}>{specie}</li>;
                        })}
                      </h2>
                    </ul>
                  </>
                )}
                <h1 className="title">
                  Height: <span> {person.height}</span>
                </h1>
                <h1 className="title">
                  Mass: <span>{person.mass}</span>
                </h1>
                <h1 className="title">
                  Hair Color:<span> {person.hair_color}</span>
                </h1>
                <h1 className="title">
                  Eye Color:<span> {person.eye_color}</span>
                </h1>
                <h1 className="title">
                  Skin Color: <span>{person.skin_color}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SinglePerson;
