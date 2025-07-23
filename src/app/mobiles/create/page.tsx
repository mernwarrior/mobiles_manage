"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMobilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    imei: "",
    purchaseDate: "",
    assignedTo: "",
    isDamaged: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/mobiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/mobiles");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Add Mobile</h2>
      {["name", "brand", "imei", "purchaseDate", "assignedTo"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "purchaseDate" ? "date" : "text"}
          placeholder={field}
          value={(form as any)[field]}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border rounded"
        />
      ))}
      <label className="block mb-2">
        <input
          type="checkbox"
          name="isDamaged"
          checked={form.isDamaged}
          onChange={handleChange}
        />{" "}
        Is Damaged?
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
