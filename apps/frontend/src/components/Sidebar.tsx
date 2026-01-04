"use client";

import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  console.log("[Sidebar] render", user);

  return (
    <aside className={styles.sidebar}>
      {/* Top */}
      <div className={styles.top}>
        <h2 className={styles.logo}>Admin Panel</h2>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
        <button onClick={() => router.push("/dashboard/data")}>Data</button>
        <button onClick={() => router.push("/dashboard/orders")}>Orders</button>
        <button onClick={() => router.push("/dashboard/products")}>Products</button>
        <button onClick={() => router.push("/dashboard/users")}>Users</button>
        <button onClick={() => router.push("/dashboard/settings")}>Settings</button>
      </nav>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.user}>
          <span className={styles.username}>
            Logged in as <b>{user?.username}</b>
          </span>
        </div>

        <button className={styles.logout} onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
