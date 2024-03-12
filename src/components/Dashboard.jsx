import React from "react";

import FirstView from "./FirstView";
import SecondView from "./SecondView";

function Dashboard() {
  const [isConnected, setIsConnected] = React.useState(false);

  return (
    <main className="dashboard">
      <FirstView isConnected={isConnected} />
      <SecondView isConnected={isConnected} setIsConnected={setIsConnected} />
    </main>
  );
}

export default Dashboard;