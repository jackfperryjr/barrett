import React, { useState } from "react";
import FriendCard from "./FriendCard";
import "./App.css";

function App() {
  const [friends] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "jdoe123456789@yahoo.com",
      activity: "Learn to juggle",
      type: "recreational",
    },
  ]);

  /** Step 1: Fetch friends from the api by calling "/api/friends".
   */

  return (
    <div className="App">
      <div className="navbar navbar-dark bg-dark box-shadow">
        <span className="navbar-brand d-flex align-items-center">
          <strong>Activity Ideas</strong>
        </span>
      </div>
      <div className="container pt-4">
        <div className="card-deck">
          {friends.map((friend) => {
            return (
              <div key={friend.id} className="col-md-6">
                <FriendCard data={friend} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;