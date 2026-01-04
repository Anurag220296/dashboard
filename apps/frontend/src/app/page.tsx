"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("[Home] auth state", { user, loading });

    if (!loading) {
      if (user) {
        console.log("[Home] user authenticated → redirecting to /dashboard");
        router.replace("/dashboard");
      } else {
        console.log("[Home] user not authenticated → redirecting to /login");
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="p-6">
      <p>Checking authentication...</p>
    </div>
  );
}
