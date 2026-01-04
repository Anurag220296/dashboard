export default function DashboardPage() {
  console.log("[DashboardPage] render");

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 4 }}>Dashboard</h1>
        <p style={{ color: "#64748b" }}>
          Welcome to the admin dashboard.
        </p>
      </header>

      {/* Stats */}
      <section style={{ display: "flex", gap: 16, marginBottom: 32 }}>

        <StatCard title="Total Orders" value="128" />
        <StatCard title="Products" value="54" />
        <StatCard title="Users" value="23" />
      </section>

      {/* Recent Activity */}
      <section>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>
          Recent Activity
        </h2>

        <ul
          style={{
            background: "#f8fafc",
            padding: 16,
            borderRadius: 8,
            listStyle: "none",
          }}
        >
          <li>Anurag is angry as your payment is pending.</li>
        </ul>
      </section>
    </div>
  );
}

/* ---------------------------------- */
/* Small reusable component            */
/* ---------------------------------- */

function StatCard({ title, value }: { title: string; value: string }) {
  console.log(`[StatCard] render ${title}`);

  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
      }}
    >
      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
        {title}
      </p>
      <strong style={{ fontSize: 22 }}>{value}</strong>
    </div>
  );
}
