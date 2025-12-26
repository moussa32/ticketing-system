"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllUrgencies } from "../actions/categoryActions";

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    urgencyId: "",
  });
  const [urgencies, setUrgencies] = useState([]);
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const urgencyData = await getAllUrgencies();
        setUrgencies(urgencyData);
        // Set default urgency if available
        if (urgencyData.length > 0 && !initialData) {
          // Default to first option or specific one if logic dictates
          setFormData((prev) => ({
            ...prev,
            urgencyId: urgencyData[0].urgency_id.toString(),
          }));
        }
      } catch (error) {
        console.error("Failed to fetch urgencies", error);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!urgencies.length) return;
    
    if (initialData) {
      setFormData({
        name: initialData.category_name || "",
        urgencyId: initialData.urgency_id
          ? initialData.urgency_id.toString()
          : urgencies.length > 0
          ? urgencies[0].urgency_id.toString()
          : "",
      });
    } else {
      setFormData((prev) => ({
        name: "",
        urgencyId:
          urgencies.length > 0 ? urgencies[0].urgency_id.toString() : "",
      }));
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({
        ...formData,
        urgencyId: parseInt(formData.urgencyId),
      });
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Hardware"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgencyId">Urgency</Label>
            <Select
              value={formData.urgencyId}
              onValueChange={(value) =>
                setFormData({ ...formData, urgencyId: value })
              }
              disabled={loadingConfig}
            >
              <SelectTrigger id="urgencyId">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                {urgencies.map((option) => (
                  <SelectItem
                    key={option.urgency_id}
                    value={option.urgency_id.toString()}
                  >
                    {option.urgency_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
