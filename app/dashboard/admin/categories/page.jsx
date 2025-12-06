import CategoriesClient from '@/features/admin-dashboard/categories/components/CategoriesClient';
import { getAllCategories } from '@/features/admin-dashboard/categories/actions/categoryActions';

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return <CategoriesClient initialCategories={categories} />;
}
