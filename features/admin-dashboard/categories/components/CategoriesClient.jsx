'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import CategoriesTable from '../components/CategoriesTable';
import AddCategoryModal from './AddCategoryModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createCategory, updateCategory, deleteCategory } from '../actions/categoryActions';

export default function CategoriesClient({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    try {
      let result;
      
      if (editingCategory) {
        // Update existing category
        result = await updateCategory(editingCategory.id, data);
      } else {
        // Create new category
        result = await createCategory(data);
      }

      if (result.success) {
        toast.success(result.message);
        
        // Optimistic update
        if (editingCategory) {
          setCategories(categories.map(cat => 
            cat.id === editingCategory.id ? result.data : cat
          ));
        } else {
          setCategories([result.data, ...categories]);
        }
        
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.message || 'Failed to save category');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const result = await deleteCategory(id);

      if (result.success) {
        toast.success(result.message);
        
        // Optimistic update
        setCategories(categories.filter(cat => cat.id !== id));
        
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">Manage ticket categories</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <CategoriesTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingCategory}
        isLoading={isLoading}
      />
    </div>
  );
}
