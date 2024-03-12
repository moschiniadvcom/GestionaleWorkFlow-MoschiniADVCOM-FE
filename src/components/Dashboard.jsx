import React from "react";

import FirstView from "./FirstView";
import SecondView from "./SecondView";

function Dashboard() {
  return (
    <main className="dashboard">
      <FirstView />
      <SecondView />
    </main>
  );
}

export default Dashboard;