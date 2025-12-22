import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

export default function FaqsTable({ faqs, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              <TableHead className="pl-6">ID</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No faqs available
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((faq) => {
                return (
                <TableRow key={faq.id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                  <TableCell className="font-mono text-gray-500 pl-6">
                    #{faq.id}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {faq.question}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {faq.answer || '-'}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(faq.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(faq)}
                        className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(faq.id)}
                        className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )})
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
