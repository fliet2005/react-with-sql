import React from "react";

function getUsers() {
  fetch(`/api/test`)
    .then((response) => response.json())
    .then((users) => console.log(users));
}

export function SampleComponent() {
  return (
    <div>
      This is a sample component
      {getUsers()}
    </div>
  );
}
