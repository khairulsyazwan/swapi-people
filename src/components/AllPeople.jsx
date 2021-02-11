import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios").default;

function AllPeople() {
  const [people, setPeople] = useState();
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pages, setPages] = useState();
  const [pgeBtns, setPgeBtns] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllPeople();
    createPages();
  }, [pages]);

  async function getAllPeople() {
    try {
      const response = await axios.get("https://swapi.dev/api/people/");
      // console.log(response.data);
      setPeople(response.data.results);

      let next = response.data.next.split("=").slice(-1)[0];
      setNextPage(next);

      setIsLoaded(true);
      setPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error(error);
    }
  }

  async function pageSelect(page) {
    try {
      const response = await axios.get(
        `http://swapi.dev/api/people/?page=${page}`
      );
      setPeople(response.data.results);
      // console.log(response.data);
      if (response.data.next != null) {
        let next = response.data.next.split("=").slice(-1)[0];
        setNextPage(next);
      } else {
        setNextPage(null);
      }
      if (response.data.previous != null) {
        let previous = response.data.previous.split("=").slice(-1)[0];
        setPrevPage(previous);
        console.log(previous);
      } else {
        setPrevPage(null);
      }
      setCurrentPage(parseInt(page));
    } catch (error) {
      console.error(error);
    }
  }

  function createPages() {
    let buttons = [];
    for (let index = 1; index <= pages; index++) {
      buttons.push(
        <p className="page-link" onClick={() => pageSelect(index)}>
          {index}
        </p>
      );
    }

    setPgeBtns(buttons);
  }

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center col-md-12">
        <h1 className="title">THE PEOPLE OF STAR WARS</h1>

        <div className="row">
          <div className="container col-md-12 col-sm-6">
            <div className="card-group">
              {isLoaded ? (
                people.map((people, index) => {
                  return (
                    <div className="col-md-6 col-sm-6 container">
                      <div className="card mt-2" key={index}>
                        <div className="card-body">
                          <Link
                            to={`people/${people.url.split("/").slice(-2)[0]}`}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            {/* link numbers are not in order of array index */}
                            <h4>{people.name}</h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-grow text-warning"
                    role="status"
                  ></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* pagination */}
        {pages && (
          <div className="my-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${prevPage == null && "disabled"}`}>
                  <p className="page-link" onClick={() => pageSelect(prevPage)}>
                    Previous
                  </p>
                </li>

                {pgeBtns ? (
                  pgeBtns.map((btn, index) => {
                    return (
                      <li
                        className={`page-item ${
                          currentPage === index + 1 && "active"
                        }`}
                        key={index}
                      >
                        {btn}
                      </li>
                    );
                  })
                ) : (
                  <p>Loading</p>
                )}

                <li className={`page-item ${nextPage == null && "disabled"}`}>
                  <p className="page-link" onClick={() => pageSelect(nextPage)}>
                    Next
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPeople;
