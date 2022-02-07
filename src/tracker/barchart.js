import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { User_Context } from "../useContext";
import { get_purchases, get_username } from "../Firebase";
function BarChart() {
  const [username, setusername] = useState("");
  const [load, setload] = useState(true);
  const { userEmail } = User_Context();
  const [product, setProduct] = useState([]);
  // const [chartData, setChartData] = useState({});
  var showTitle = <div></div>;
  //var dayChart;
  //var monthChart;

  useEffect(() => {
    if (userEmail !== undefined) {
      const getUser = async () => {
        await get_username(userEmail)
          .then((element) => {
            setusername(element.data.username);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getUser();
    }

    if (username !== undefined || username !== "") {
      var data;
      const getItems = async () => {
        await get_purchases(username)
          .then((item) => {
            data = item.data;
          })
          .catch((err) => {
            console.log(err, "an error occured");
          });
        setProduct(data);
      };
      getItems();
      setload(false);
    }
  }, [userEmail, username]);
  if (
    (username !== undefined || username !== "") &&
    !load &&
    product.length > 0
  ) {
    product.sort(function (a, b) {
      return a.orderNum - b.orderNum;
    });
    //console.log(product);
    var totArr = [];
    var avgArr = [];
    var tot = 0;
    var avg = 0;
    var getDates = [];
    var last = product[0].purchaseTime;
    var nbOfitems = 0;
    product.map((element, i) => {
      if (i === 0) getDates.push(element.purchaseTime.slice(0, 10));
      if (last !== element.purchaseTime) {
        avg = tot / nbOfitems;
        // console.log(nbOfitems);
        avgArr.push(avg);
        totArr.push(tot);
        nbOfitems = 0;
        tot = 0;
        tot += element.price * element.quantity;
        nbOfitems += 1;
        getDates.push(element.purchaseTime.slice(0, 10));
      } else {
        nbOfitems += 1;
        tot += element.price * element.quantity;
      }
      if (i === product.length - 1) {
        if (last === element) {
          nbOfitems += 1;
          tot += element.price * element.quantity;

          //console.log(nbOfitems);
          avg = tot / nbOfitems;
          avgArr.push(avg);
          totArr.push(tot);
          getDates.push(element.purchaseTime.slice(0, 10));
        } else {
          nbOfitems = 1;
          //console.log(nbOfitems);
          avg = tot / nbOfitems;
          avgArr.push(avg);
          totArr.push(tot);
        }
      }
      //console.log(getDates);
      last = element.purchaseTime;
      return null;
    });
    console.log(totArr);
    // dayChart = () => {
    //   totArr = [];
    //   avgArr = [];
    //   tot = 0;
    //   avg = 0;
    //   getDates = [];
    //   last = product[0].purchaseTime;
    //   nbOfitems = 0;
    //   product.map((element, i) => {
    //     if (last !== element.purchaseTime) {
    //       avg = tot / nbOfitems;
    //       console.log(nbOfitems);
    //       avgArr.push(avg);
    //       totArr.push(tot);
    //       nbOfitems = 0;
    //       tot = 0;
    //       tot += element.price * element.quantity;
    //       nbOfitems += 1;
    //       getDates.push(element.purchaseTime.slice(0, 10));
    //     } else {
    //       nbOfitems += 1;
    //       tot += element.price * element.quantity;
    //     }
    //     if (i === product.length - 1) {
    //       if (last === element) {
    //         nbOfitems += 1;
    //         tot += element.price * element.quantity;
    //       }
    //       console.log(nbOfitems);
    //       avg = tot / nbOfitems;
    //       avgArr.push(avg);
    //       totArr.push(tot);
    //       getDates.push(element.purchaseTime.slice(0, 10));
    //     }
    //     last = element.purchaseTime;
    //     return showBar;
    //   });
    // };
    // monthChart = () => {
    //   totArr = [];
    //   avgArr = [];
    //   tot = 0;
    //   avg = 0;
    //   getDates = [];
    //   last = product[0].purchaseTime;
    //   nbOfitems = 0;
    //   product.map((element, i) => {
    //     console.log(element.purchaseTime.slice(4, 7));
    //     if (!last.includes(element.purchaseTime.slice(4, 7))) {
    //       avg = tot / nbOfitems;
    //       console.log(nbOfitems);
    //       avgArr.push(avg);
    //       totArr.push(tot);
    //       nbOfitems = 0;
    //       tot = 0;
    //       tot += element.price * element.quantity;
    //       nbOfitems += 1;
    //       getDates.push(element.purchaseTime.slice(4, 7));
    //     } else {
    //       nbOfitems += 1;
    //       tot += element.price * element.quantity;
    //     }
    //     if (i === product.length - 1) {
    //       if (last.includes(element.purchaseTime.slice(4, 7))) {
    //         nbOfitems += 1;
    //         tot += element.price * element.quantity;
    //       }
    //       console.log(nbOfitems);
    //       avg = tot / nbOfitems;
    //       avgArr.push(avg);
    //       totArr.push(tot);
    //       getDates.push(element.purchaseTime.slice(4, 7));
    //     }
    //     last = element.purchaseTime;
    //     return null;
    //   });
    // };
    // totArr = [];
    // avgArr = [];
    // tot = 0;
    // avg = 0;
    // getDates = [];
    // last = product[0].purchaseTime;
    // nbOfitems = 0;
    // product.map((element, i) => {
    //   console.log(element.purchaseTime.slice(4, 7));
    //   if (!last.includes(element.purchaseTime.slice(4, 7))) {
    //     avg = tot / nbOfitems;
    //     console.log(nbOfitems);
    //     avgArr.push(avg);
    //     totArr.push(tot);
    //     nbOfitems = 0;
    //     tot = 0;
    //     tot += element.price * element.quantity;
    //     nbOfitems += 1;
    //     getDates.push(element.purchaseTime.slice(4, 7));
    //   } else {
    //     nbOfitems += 1;
    //     tot += element.price * element.quantity;
    //   }
    //   if (i === product.length - 1) {
    //     if (last.includes(element.purchaseTime.slice(4, 7))) {
    //       nbOfitems += 1;
    //       tot += element.price * element.quantity;
    //     }
    //     console.log(nbOfitems);
    //     avg = tot / nbOfitems;
    //     avgArr.push(avg);
    //     totArr.push(tot);
    //     getDates.push(element.purchaseTime.slice(4, 7));
    //   }
    //   last = element.purchaseTime;
    //   return null;
    // });
  } else {
    showTitle = (
      <div className="no-purchases">
        <p>No purchases yet recorded</p>
        <hr />
      </div>
    );
  }
  var showBar = (
    <Bar
      redraw={true}
      height="600"
      width="400"
      data={{
        labels: getDates,
        datasets: [
          {
            label: "Total",
            data: totArr,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
          {
            label: "Average",
            data: avgArr,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],
      }}
      options={{
        responsive: true,
      }}
    ></Bar>
  );
  return (
    <div>
      {/* <div>
        <button onClick={() => dayChart()}>Day</button>
        <button onClick={() => monthChart()}>Month</button>
        <button>Year</button>
      </div> */}
      <div>{product.length > 0 ? showBar : showTitle}</div>
    </div>
  );
}

export default BarChart;
