import React from "react";

function ViewerLoader() {
  return (
    <div
      className="lds-ripple"
      style={{
        position: "absolute",
        top: "47%",
        left: "47%",
        width: "100%",
        height: "100%",
        color: "white",
      }}
    >
      Loading...
    </div>
  );
}

export default ViewerLoader;
