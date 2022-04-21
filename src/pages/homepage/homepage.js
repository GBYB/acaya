import React, { useEffect, useState } from "react";
import "./homepage.css";
import { Carousel } from "react-bootstrap";
import ListProduct from "../product/listItem/ListProduct";
import { getAllItemId } from "../../Firebase";
//import { auth, search_item } from "../Firebase";
function Homepage() {
  //const [searchInput, setSearchInput] = useState("");
  // const [searchList, setSearchList] = useState(<></>);
  // const search = (event) => {
  //   event.preventDefault();
  //   if (searchInput.length != 0) {
  //     // do search query here and get data
  //     let idList = search_item(searchInput);
  //     console.log(idList);
  //     renderResult();
  //   }
  // };
  // const renderResult = () => {};
  const [item, setItem] = useState([]);
  // const [sortitem, setsortitem] = useState([]);
  var showItems = <div>empty</div>;
  useEffect(() => {
    if (item.length > 0) {
      setItem([]);
    } else {
      const getItems = async () => {
        await getAllItemId().then((element) => {
          setItem((arr) => [element.id, ...arr]);
        });
      };
      getItems();
    }
  }, []);
  if (item.length > 0) {
    console.log(item);
    console.log(item[0].length);
    var arr = [];
    var bigArr = [];

    item.forEach((element) =>
      element.map((data, index) => {
        arr.push(data);
        if (arr.length % 3 === 0) {
          bigArr.push(arr);
          arr = [];
        }
        if (element.length % 3 !== 0) {
          var last = parseInt(element.length / 3);
          var lastIndexes = last * 3; // get the last element added to bigArr
          var lastElements = element.length % 3; // 2 elements or 1 element left
          if (lastElements === 1) {
            if (index === lastIndexes) {
              bigArr.push(arr);
            }
          } else {
            if (index === lastIndexes + 1) {
              bigArr.push(arr);
            }
          }
        }
        return (showItems = bigArr.map((element, i) => (
          <div className="product-list-top" key={i}>
            <div className="product-list" key={i}>
              {element.map((id, i) => (
                <ListProduct id={id} key={i} />
              ))}
            </div>
          </div>
        )));
      })
    );
    console.log(bigArr);
  }

  return (
    <div className="app">
      {/* <Header /> */}
      <div className="home">
        <div className="title">
          <h3>Welcome to Acaya shop</h3>
          <br />
        </div>
        <div className="carousel">
          {/* carousel slider with images */}
          <Carousel>
            <Carousel.Item>
              <img
                height="700"
                width="900"
                className="d-block w-100"
                src="https://image.freepik.com/free-photo/interior-living-room-with-sofa-empty-dark-blue-wall-3d-rendering_41470-3621.jpg"
                alt="living room"
              />
              <Carousel.Caption>
                <h3>
                  Style your new living room with some classy chic style
                  furniture
                </h3>

                <a
                  className="link-style"
                  href="https://www.freepik.com/photos/wood"
                >
                  Wood photo created by vanitjan - www.freepik.com
                </a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                height="700"
                width="900"
                className="d-block w-100"
                src="https://image.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg"
                alt="pasta"
              />

              <Carousel.Caption>
                <h2>
                  Find out about how you can make pasta with your new kitchen
                  utensils
                </h2>

                <a
                  className="link-style"
                  href="https://www.freepik.com/photos/food"
                >
                  Food photo created by timolina - www.freepik.com
                </a>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                height="700"
                width="900"
                className="d-block w-100"
                src="https://image.freepik.com/free-photo/tv-cabinet-white-wall-living-room-with-armchair-minimal-design-3d-rendering_41470-3752.jpg"
                alt="tv room"
              />

              <Carousel.Caption>
                <h3>
                  Find your new OLED tv waiting for you to come sit on your
                  couch to give you an entertaining comfy experience
                </h3>

                <a
                  className="link-style"
                  href="https://www.freepik.com/photos/background"
                >
                  Background photo created by vanitjan - www.freepik.com
                </a>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <br />
        {/* image to offers*/}
        {/* <div>
          <form className="search" search bar
            
            <input
              className="search_input"
              id="search"
              name="search"
              placeholder="Search for an item"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="search_btn"> 
              <button className="search_btn" onClick={search}> 
              Search
            </button>
          </form>
          {/* <div className="product-list-top">{searchList}</div> 
        </div>*/}
        <br />
        <div className="home_itemlist">
          <div className="trending">
            <h3>trending items</h3>
            <p>Items trending for this week</p>
          </div>
        </div>
        <br />

        {showItems}
        {/* <div className="product-list">
            <ListProduct id="tQpAZJyvNr0PbKtmIVrW" />
            <ListProduct id="2kw5m9Blsx8HFMyEerrf" />
            <ListProduct id="ze0e396VKTQcZn8ldSkV" />
          </div>
          <div className="product-list">
            <ListProduct id="x6rrrCLSraTZDF1EMJ1Z" />
            <ListProduct id="xYA7MoywX0mQBngQZdJa" />
            <ListProduct id="8bnMUgqVHDVTjjvVeEk5" />
          </div> */}

        <br />
        <br />
      </div>
    </div>
  );
}

export default Homepage;
