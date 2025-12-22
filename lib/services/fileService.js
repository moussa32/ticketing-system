import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'tickets');

// Ensure upload directory exists
export function ensureUploadDir() {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
  } catch (error) {
    console.error('Error creating upload directory:', error);
  }
}

export async function saveUploadedFile(fileBuffer, originalFileName) {
  try {
    ensureUploadDir();
    
    // Generate unique filename using crypto
    const fileExtension = path.extname(originalFileName);
    const fileNameWithoutExt = path.basename(originalFileName, fileExtension);
    const randomString = crypto.randomBytes(8).toString('hex');
    const uniqueFileName = `${fileNameWithoutExt}-${randomString}${fileExtension}`;
    
    // Save file
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);
    fs.writeFileSync(filePath, fileBuffer);
    
    // Return public path
    return {
      success: true,
      fileName: uniqueFileName,
      originalName: originalFileName,
      url: `/uploads/tickets/${uniqueFileName}`,
      size: fileBuffer.length
    };
  } catch (error) {
    console.error('Error saving file:', error);
    return {
      success: false,
      error: error.message || 'Failed to save file'
    };
  }
}

export function deleteUploadedFile(fileName) {
  try {
    const filePath = path.join(UPLOAD_DIR, fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    }
    return { success: true }; // File already deleted
  } catch (error) {
    console.error('Error deleting file:', error);
    return {
      success: false,
      error: error.message || 'Failed to delete file'
    };
  }
}

export function getUploadedFile(fileName) {
  try {
    const filePath = path.join(UPLOAD_DIR, fileName);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath);
    }
    throw new Error('File not found');
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}
