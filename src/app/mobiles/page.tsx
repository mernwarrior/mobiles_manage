"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MobileType } from "@/types/mobile";

export default function MobileListPage() {
  const [mobiles, setMobiles] = useState<MobileType[]>([]);

  const fetchMobiles = async () => {
    const res = await fetch("/api/mobiles");
    const data = await res.json();
    setMobiles(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/mobiles/${id}`, { method: "DELETE" });
    fetchMobiles();
  };

  useEffect(() => {
    fetchMobiles();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mobile Devices</h2>
      <Link href="/mobiles/create" className="text-blue-500">
        + Add Mobile
      </Link>
      <ul className="mt-4 space-y-2">
        {mobiles.map((mobile) => (
          <li key={mobile._id} className="border p-2 rounded">
            <div>
              {mobile.name} ({mobile.brand}) - IMEI: {mobile.imei}
            </div>
            <div>Assigned To: {mobile.assignedTo}</div>
            <div>Damaged: {mobile.isDamaged ? "Yes" : "No"}</div>
            <button
              onClick={() => handleDelete(mobile._id!)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
