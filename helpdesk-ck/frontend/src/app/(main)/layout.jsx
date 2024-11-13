import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div>
        <Sidebar />
        {children}
      </div>
    </>
  );
}
