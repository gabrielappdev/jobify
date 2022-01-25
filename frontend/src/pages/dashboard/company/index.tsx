import CreateCompany from "@/components/CreateCompany";
import DashboardTemplate from "templates/dashboard";

const Company = () => {
  return (
    <DashboardTemplate>
      <CreateCompany onSuccess={(data) => console.log(data)} />
    </DashboardTemplate>
  );
};

export default Company;
