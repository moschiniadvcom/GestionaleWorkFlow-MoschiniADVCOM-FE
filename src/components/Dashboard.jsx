import React from "react";

import FirstView from "./FirstView";
import AutoRefresh from "./AutoRefresh";

function Dashboard() {
  return (
    <main className="dashboard">
      <FirstView />
      <AutoRefresh />
    </main>
  );
}

export default Dashboard;