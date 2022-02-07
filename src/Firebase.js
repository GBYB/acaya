// import { applicationDefault } from "firebase-admin/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// const admin = require("firebase-admin");
// admin.initializeApp({
//   credential: applicationDefault(),
//   databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
// });

// const auth = admin.auth();
// const db = admin.firestore();
// export { auth, db };

// var admin = require("firebase-admin");

// var serviceAccount = require("./acaya-f7aa0-firebase-adminsdk-6vsf9-7526b79acd.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:
//     "https://acaya-f7aa0-default-rtdb.europe-west1.firebasedatabase.app",
// });
// const auth = admin.auth();
// const db = admin.firestore();
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  documentId,
  where,
  query,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
initializeApp({
  apiKey: "AIzaSyD88bpTZ6klXWjJqIIkzmOeqb0OkuLQQAs",

  authDomain: "acaya-f7aa0.firebaseapp.com",

  databaseURL:
    "https://acaya-f7aa0-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "acaya-f7aa0",

  storageBucket: "acaya-f7aa0.appspot.com",

  messagingSenderId: "909394051447",

  appId: "1:909394051447:web:7cee759b564c522a502172",

  measurementId: "G-F55KBLRDT0",
});

const db = getFirestore();
const auth = getAuth();
const add_user = async (username, password, email) => {
  const docRef = await addDoc(collection(db, "user"), {
    username: username,
    password: password,
    email: email,
    address: "",
    phone: "",
    budget: 0,
  });
};

const updateUser = async (username, address, phone) => {
  var ref;
  var refExists = false;
  await get_userId(username)
    .then((data) => {
      if (data !== undefined) {
        console.log(data);
        ref = data.id;
        refExists = true;
      } else {
        console.log("is undefined");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(ref);
  if (refExists) {
    console.log(ref);
    const userRef = await doc(db, "user", ref);

    console.log(address, phone);
    await updateDoc(userRef, { address: address, phone: phone })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
const get_userId = async (username) => {
  var id;
  var data;
  const colRef = collection(db, "user");
  const userRef = query(colRef, where("username", "==", username));
  const userSnap = await getDocs(userRef);
  userSnap.forEach((doc) => {
    id = doc.id;
    data = doc.data();
  });

  return { id, data };
};

const get_itemID = async (id) => {
  var id;
  var data;
  const colItem = collection(db, "item");
  const itemRef = query(colItem, where(documentId(), "==", id));
  const itemSnap = await getDocs(itemRef);
  itemSnap.forEach((doc) => {
    id = doc.id;
    data = doc.data();
  });
  return { id, data };
};

const get_username = async (email) => {
  var data;
  var id;
  const colRef = collection(db, "user");
  const userRef = query(colRef, where("email", "==", email));
  const userSnap = await getDocs(userRef);
  userSnap.forEach((doc) => {
    data = doc.data();
    id = doc.id;
  });
  var docRef = colRef;
  return { data, id, docRef };
};
//get all basket items
const get_basket = async (username) => {
  var data = [];
  var id;
  if (username === undefined) return;
  else {
    const basketRef = collection(db, "basket");
    const basketQuery = query(basketRef, where("username", "==", username));
    const basketSnap = await getDocs(basketQuery);

    basketSnap.forEach((doc) => {
      data.push(doc.data());
      id = doc.id;
      console.log("item", data);
    });

    return { data, id };
  }
};
//get a certain item from the basket
const get_basket_item = async (name, username) => {
  var data;
  var id;
  var quantity;
  const basketRef = collection(db, "basket");
  const basketQuery = query(
    basketRef,
    where("username", "==", username),
    where("name", "==", name)
  );
  const basketSnap = await getDocs(basketQuery);
  basketSnap.forEach((doc) => {
    data = doc.data();
    id = doc.id;
    quantity = data.quantity;
    console.log("quantity basket", quantity);
    console.log("Basket item", data);
  });

  return { data, quantity, id };
};
//add item to the basket / increase its quantity
const add_basket = async (name, price, image, quantity, username) => {
  var exists = false;
  var ref;
  var oldQuantity = 0;
  await get_basket_item(name, username)
    .then((element) => {
      console.log(element.data);
      //if the item was never added add it
      if (element.data === undefined) {
        const itemRef = async () => {
          await addDoc(collection(db, "basket"), {
            name: name,
            price: price,
            quantity: quantity,
            username: username,
            image: image,
          })
            .then()
            .catch((err) => {
              console.log("error from setting item", err);
            });
        };
        itemRef();
        return;
      } else {
        exists = true;
        ref = element.id;
        oldQuantity = element.quantity;
      }
    })
    .catch((err) => {
      console.log("Server error from getting item", err);
    });
  //increase quantity if the item was added
  if (exists) {
    quantity += oldQuantity;
    var basketRef = doc(db, "basket", ref);
    await updateDoc(basketRef, { quantity: quantity });
  }
};

const delete_basket_item = async (name, username) => {
  await get_basket_item(name, username)
    .then((element) => {
      if (element.data === undefined) {
        console.log("data is undefined", element);
      } else {
        console.log("data found!:", element);
        const deleteRef = async () => {
          await deleteItem(name)
            .then(() => {
              console.log("object deleted");
            })
            .catch((err) => {
              console.log(err);
            });
        };
        deleteRef();

        return;
      }
    })
    .catch((err) => {
      console.log("Server error from getting item", err);
    });
};

const deleteItem = async (name) => {
  const colRef = collection(db, "basket");
  const userRef = query(colRef, where("name", "==", name));
  const userSnap = await getDocs(userRef);
  console.log("hellp");
  userSnap.forEach((doc) => {
    console.log("i am deleting this:", doc);
    deleteDoc(doc.ref);
  });
};

const addPurchase = async (username) => {
  var num;
  if (username !== undefined)
    await getOrdNum(username)
      .then((data) => {
        num = data.newMax;
      })
      .catch((err) => console.log(err));
  var ref;
  await get_basket(username)
    .then((element) => {
      ref = element.data;
    })
    .catch((err) => {
      console.log(err);
    });
  if (ref !== undefined && username !== undefined && !isNaN(num)) {
    ref.forEach((element) => {
      console.log(element);
      const add_purchase = async () => {
        await addDoc(collection(db, "purchase"), {
          username: username,
          purchaseTime: serverTimestamp(),
          name: element.name,
          price: element.price,
          quantity: element.quantity,
          orderNum: num,
        });
        await delete_basket(username)
          .then(() => {
            // console.log("deleting...");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      add_purchase();
    });
  }
};

const delete_basket = async (username) => {
  const colRef = collection(db, "basket");
  const userRef = query(colRef, where("username", "==", username));
  const userSnap = await getDocs(userRef);
  userSnap.forEach((doc) => {
    // console.log("i am deleting this:", doc);
    deleteDoc(doc.ref);
  });
};

const getOrdNum = async (username) => {
  var max = 0;

  await get_purchases(username)
    .then((data) => {
      console.log(data.data);
      if (data.data.length > 0)
        data.data.forEach((element) => {
          console.log("ordernum", element.orderNum);
          if (element.orderNum > max) max = element.orderNum;
        });
      else return max;
    })
    .catch((err) => {
      console.log(err);
    });
  var newMax = max + 1;
  return { newMax };
};
const get_purchases = async (username) => {
  var data = [];
  var id;
  var date = [];
  var dateSolo;

  const basketRef = collection(db, "purchase");
  const basketQuery = query(
    basketRef,
    where("username", "==", username),
    orderBy("purchaseTime", "desc")
  );
  const basketSnap = await getDocs(basketQuery);

  basketSnap.forEach((doc) => {
    data.push(doc.data());
    data.forEach((element) => {
      //console.log(element.purchaseTime);
      // date.push(new Date(element.purchaseTime.seconds * 1000).toDateString());
      // dateSolo = new Date(element.purchaseTime.seconds * 1000).toDateString();
      dateSolo = new Date(element.purchaseTime.seconds * 1000).toDateString();
      if (dateSolo !== "Invalid Date") element.purchaseTime = dateSolo;
      // console.log(element.purchaseTime);
      //console.log(dateSolo);
    });

    id = doc.id;
    //  console.log("item", data);
  });

  return { data, id, date, dateSolo };
};

const setBudget = async (budget, ref) => {
  await updateDoc(doc(db, "user", ref.id), { budget: budget }).then(() => {
    console.log(budget);
  });
};

const getAllItemId = async () => {
  var id = [];
  const colItem = collection(db, "item");
  const itemSnap = await getDocs(colItem);
  itemSnap.forEach((item) => {
    id.push(item.id);
  });
  return { id };
};

const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email, {
    url: "http://localhost:3000/",
  })
    .then(() => {
      console.log("hello");
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeUsername = async (email, username) => {
  var id;
  const userRef = collection(db, "user");
  const userQuery = query(userRef, where("email", "==", email));
  const userSnap = await getDocs(userQuery);

  userSnap.forEach((doc) => {
    id = doc.id;
  });

  await updateDoc(doc(db, "user", id), { username: username }).then(() => {
    console.log(username);
  });
};

const changeAddress = async (email, address) => {
  var id;
  const userRef = collection(db, "user");
  const userQuery = query(userRef, where("email", "==", email));
  const userSnap = await getDocs(userQuery);

  userSnap.forEach((doc) => {
    id = doc.id;
  });

  await updateDoc(doc(db, "user", id), { address: address }).then(() => {
    console.log(address);
  });
};
const changePhone = async (email, phone) => {
  var id;
  const userRef = collection(db, "user");
  const userQuery = query(userRef, where("email", "==", email));
  const userSnap = await getDocs(userQuery);

  userSnap.forEach((doc) => {
    id = doc.id;
  });

  await updateDoc(doc(db, "user", id), { phone: phone }).then(() => {
    console.log(phone);
  });
};
// const getPurchaseOrdNum = async (username) => {
//   var ordNumArr = [];
//   await get_purchases(username)
//     .then((data) => {
//       data.map((element) => {
//         ordNumArr.push(element.orderNum);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   return { ordNumArr };
// };
// const search_item = async (item) => {
//   var id;
//   var data;
//   const colItem = collection(db, "item");
//   const itemRef = query(colItem, where("name", "==", item));
//   const itemSnap = await getDocs(itemRef);
//   itemSnap.forEach((doc) => {
//     id = doc.id;
//     data = doc.data();
//   });

//   return { id, data };
// };

export {
  db,
  auth,
  add_user,
  updateUser,
  get_userId,
  get_itemID,
  get_username,
  add_basket,
  deleteItem,
  get_basket,
  delete_basket_item,
  addPurchase,
  get_purchases,
  setBudget,
  getAllItemId,
  resetPassword,
  changeUsername,
  changePhone,
  changeAddress,
  //getPurchaseOrdNum,
};
