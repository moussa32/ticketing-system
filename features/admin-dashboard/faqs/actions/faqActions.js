'use server';

import { revalidatePath } from 'next/cache';
import { Faq } from '@/lib/database';

export async function getAllFaqs() {
  try { 
    const faqs = await Faq.findAll({
      order: [['created_at']]
    });
    
    return JSON.parse(JSON.stringify(faqs));
  } catch (error) {
    console.error('Error fetching faqs:', error);
    return [];
  }
}

export async function createFaq(data) {
  try {
    const { question, answer } = data;
    
    if (!question || question.trim() === '') {
      return { success: false, message: 'FAQ question is required' };
    }
    
    const existingFaq = await Faq.findOne({ 
      where: { question: question.trim() } 
    });
    
    if (existingFaq) {
      return { success: false, message: 'FAQ with this question already exists' };
    }

    const faq = await Faq.create({
      question: question.trim(),
      answer: answer?.trim() || null
    });
    
    revalidatePath('/dashboard/admin/faqs');
    
    return { 
      success: true, 
      message: 'FAQ created successfully',
      data: JSON.parse(JSON.stringify(faq))
    };
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return { success: false, message: error.message };
  }
}

export async function updateFaq(id, data) {
  try {
    const faq = await Faq.findByPk(id);
    
    if (!faq) {
      return { success: false, message: 'FAQ not found' };
    }

    const { question, answer } = data;

    if (question && question.trim() === '') {
      return { success: false, message: 'FAQ question cannot be empty' };
    }

    if (question && question.trim() !== faq.question) {
      const existingFaq = await Faq.findOne({ 
        where: { question: question.trim() } 
      });
      
      if (existingFaq) {
        return { success: false, message: 'FAQ with this question already exists' };
      }
    }

    await faq.update({
      question: question ? question.trim() : faq.question,
      answer: answer !== undefined ? (answer?.trim() || null) : faq.answer
    });

    revalidatePath('/dashboard/admin/faqs');
        
    return { 
      success: true, 
      message: 'FAQ updated successfully',
      data: JSON.parse(JSON.stringify(faq))
    };
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return { success: false, message: error.message };
  }
}

export async function deleteFaq(id) {
  try {
    const faq = await Faq.findByPk(id);
    
    if (!faq) {
      return { success: false, message: 'FAQ not found' };
    }
    
    await faq.destroy();

    revalidatePath('/dashboard/admin/faqs');
    
    return { success: true, message: 'FAQ deleted successfully' };
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return { success: false, message: error.message };
  }
}
