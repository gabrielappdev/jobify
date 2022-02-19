import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardTemplate from "templates/dashboard";

const Dashboard = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/jobs");
  }, [router]);
  return (
    <DashboardTemplate>
      <></>
    </DashboardTemplate>
  );
};

export default Dashboard;
