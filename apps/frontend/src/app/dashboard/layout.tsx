import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("[DashboardLayout] render");

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 240, padding: 24, width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
