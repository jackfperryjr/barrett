import React, { useState } from "react";

const ACTIVITY_TYPES = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

function FriendCard({ data }) {
  const [friend, setFriend] = useState(data);

  const onTypeChange = (e) => {
    e.persist();
    setFriend((f) => {
      return { ...f, type: e.target.value };
    });
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{friend.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{friend.email}</h6>
        <p className="card-text lead">{friend.activity}</p>
        <div className="form-group row justify-content-center">
          <select
            className="form-control col-sm-6"
            value={friend.type}
            id={`activity-type-select-${friend.id}`}
            onChange={onTypeChange}
          >
            {ACTIVITY_TYPES.map((type, idx) => {
              return (
                <option key={idx} value={type}>
                  {type}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="btn btn-success"
          onClick={() => {
            /** Step 2: Implement! */
          }}
        >
          Get New Idea
        </button>
      </div>
    </div>
  );
}

export default FriendCard;