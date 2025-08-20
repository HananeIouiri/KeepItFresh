"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Item = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  expiry: string;
};

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState({
    name: "",
    category: "Fruits",
    quantity: 1,
    expiry: "",
  });

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Add item to inventory
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: Date.now(),
      ...form,
    };
    setItems((prev) => [...prev, newItem]);
    setIsOpen(false);
    setForm({ name: "", category: "Fruits", quantity: 1, expiry: "" });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">KeepItFresh</div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            <li className="hover:bg-green-600 rounded-md p-2 cursor-pointer">Dashboard</li>
            <li className="hover:bg-green-600 rounded-md p-2 cursor-pointer">Inventory</li>
            <li className="hover:bg-green-600 rounded-md p-2 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="text-gray-600">👤 Hello, User</div>
        </header>

        {/* Content area */}
        <main className="p-6 space-y-8">
          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center shadow-md">
              <CardContent className="p-6">
                <h2 className="text-gray-500">Total Items</h2>
                <p className="text-2xl font-bold">{items.length}</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardContent className="p-6">
                <h2 className="text-gray-500">Expiring Soon</h2>
                <p className="text-2xl font-bold">
                  {
                    items.filter(
                      (item) =>
                        new Date(item.expiry).getTime() - Date.now() <
                        3 * 24 * 60 * 60 * 1000 // 3 days
                    ).length
                  }
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardContent className="p-6">
                <h2 className="text-gray-500">Expired</h2>
                <p className="text-2xl font-bold">
                  {items.filter((item) => new Date(item.expiry) < new Date()).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Add Item button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
          >
            ➕ Add New Item
          </Button>

          {/* Inventory Table */}
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Inventory</h2>
            {items.length === 0 ? (
              <p className="text-gray-500">No items added yet.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">{item.category}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">{item.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Item</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="e.g. Milk"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  <option>Fruits</option>
                  <option>Vegetables</option>
                  <option>Meat</option>
                  <option>Dairy</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  min={1}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Expiry Date</label>
                <input
                  type="date"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 mt-1"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" onClick={() => setIsOpen(false)} variant="secondary">
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
