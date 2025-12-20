'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import FaqsTable from '../components/FaqsTable';
import AddFaqModal from './AddFaqModal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createFaq, updateFaq, deleteFaq } from '../actions/faqActions';

export default function FaqsClient({ initialFaqs }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreate = () => {
    setEditingFaq(null);
    setIsModalOpen(true);
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setIsModalOpen(true);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    try {
      let result;
      
      if (editingFaq) {
        // Update existing faq
        result = await updateFaq(editingFaq.id, data);
      } else {
        // Create new faq
        result = await createFaq(data);
      }

      if (result.success) {
        toast.success(result.message);
        
        // Optimistic update
        if (editingFaq) {
          setFaqs(faqs.map(faq => 
            faq.id === editingFaq.id ? result.data : faq
          ));
        } else {
          setFaqs([result.data, ...faqs]);
        }
        
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error(result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error saving faq:', error);
      toast.error(error.message || 'Failed to save faq');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this faq?')) {
      return;
    }

    try {
      const result = await deleteFaq(id);

      if (result.success) {
        toast.success(result.message);
        
        // Optimistic update
        setFaqs(faqs.filter(faq => faq.id !== id));

        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deleting faq:', error);
      toast.error('Failed to delete faq');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
          <p className="text-sm text-gray-500">Manage frequently asked questions</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      <FaqsTable
        faqs={faqs}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddFaqModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingFaq}
        isLoading={isLoading}
      />
    </div>
  );
}
