"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Settings,
  Boxes,
  Clock,
  AlertTriangle,
  Edit,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Item = {
  name: string;
  category: string;
  quantity: number;
  expiry: string;
};

export default function DashboardPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Item>({
    name: "",
    category: "Fruits",
    quantity: 1,
    expiry: "",
  });

  // editing state
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showExpiringSoon, setShowExpiringSoon] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "quantity" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // edit
      const updated = [...items];
      updated[editingIndex] = form;
      setItems(updated);
      setEditingIndex(null);
    } else {
      // add
      setItems([...items, form]);
    }
    setForm({ name: "", category: "Fruits", quantity: 1, expiry: "" });
    setIsOpen(false);
  };

  const handleEdit = (index: number) => {
    setForm(items[index]);
    setEditingIndex(index);
    setIsOpen(true);
  };

  const handleDelete = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // 🔥 Expiry status logic
  const getStatus = (expiry: string) => {
    const today = new Date();
    const expDate = new Date(expiry);
    const diffDays = Math.ceil(
      (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return "Expired";
    if (diffDays <= 3) return "Expiring Soon";
    return "Fresh";
  };

  // ✅ filtering logic (combined filters)
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    let matchesExpiry = true;
    if (showExpiringSoon) {
      const status = getStatus(item.expiry);
      matchesExpiry = status === "Expiring Soon";
    }

    return matchesSearch && matchesCategory && matchesExpiry;
  });

  // stats
  const totalItems = items.length;
  const expiringSoon = items.filter(
    (item) => getStatus(item.expiry) === "Expiring Soon"
  ).length;
  const expired = items.filter(
    (item) => getStatus(item.expiry) === "Expired"
  ).length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-8">KeepItFresh</h2>
        <nav className="flex flex-col gap-3">
          <div className="flex items-center gap-2 bg-green-800 p-2 rounded-md font-semibold">
            <LayoutDashboard size={18} /> Dashboard
          </div>
          <div className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-md cursor-pointer">
            <Package size={18} /> Inventory
          </div>
          <div className="flex items-center gap-2 hover:bg-green-600 p-2 rounded-md cursor-pointer">
            <Settings size={18} /> Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top bar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => setIsOpen(true)}>Add Item</Button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 p-6 rounded-lg shadow flex items-center gap-4">
            <Boxes className="text-green-600" size={28} />
            <div>
              <h2 className="text-xl font-bold">{totalItems}</h2>
              <p className="text-gray-600">Total Items</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow flex items-center gap-4">
            <Clock className="text-yellow-600" size={28} />
            <div>
              <h2 className="text-xl font-bold">{expiringSoon}</h2>
              <p className="text-gray-600">Expiring Soon</p>
            </div>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow flex items-center gap-4">
            <AlertTriangle className="text-red-600" size={28} />
            <div>
              <h2 className="text-xl font-bold">{expired}</h2>
              <p className="text-gray-600">Expired</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          <Input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option>All</option>
            <option>Fruits</option>
            <option>Vegetables</option>
            <option>Meat</option>
            <option>Dairy</option>
            <option>Other</option>
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showExpiringSoon}
              onChange={(e) => setShowExpiringSoon(e.target.checked)}
            />
            Show Expiring Soon
          </label>
        </div>

        {/* Items Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Inventory</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-green-100">
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Expiry Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => {
                const status = getStatus(item.expiry);
                return (
                  <tr
                    key={index}
                    className={`border-b odd:bg-gray-50 ${
                      status === "Expired"
                        ? "bg-red-100"
                        : status === "Expiring Soon"
                        ? "bg-yellow-100"
                        : ""
                    }`}
                  >
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.expiry}</td>
                    <td className="p-2 font-semibold">{status}</td>
                    <td className="p-2 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(index)}
                      >
                        <Trash size={16} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingIndex !== null ? "Edit Item" : "Add Item"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label className="block text-sm font-medium">Item Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Milk"
                  required
                />
              </div>

              <div>
                <Label className="block text-sm font-medium">Category</Label>
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
                <Label className="block text-sm font-medium">Quantity</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </div>

              <div>
                <Label className="block text-sm font-medium">Expiry Date</Label>
                <Input
                  type="date"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
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
