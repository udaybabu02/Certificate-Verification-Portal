import fs from 'fs';
import path from 'path';

const mockDataPath = 'src/mockData.js';
const imagePath = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\34b6b9e0-c820-452d-a620-a44ed4cbf2a7\\media__1785006573010.jpg';

if (!fs.existsSync(mockDataPath)) {
  console.error('mockData.js not found!');
  process.exit(1);
}

if (!fs.existsSync(imagePath)) {
  console.error('Sameerupeta Vivek certificate image not found at:', imagePath);
  process.exit(1);
}

// Convert image to base64
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

// Read mockData.js
let content = fs.readFileSync(mockDataPath, 'utf-8');

// Parse the array out (since it's simple JSON array export)
const jsonStart = content.indexOf('[');
const jsonEnd = content.lastIndexOf(']') + 1;
const jsonText = content.substring(jsonStart, jsonEnd);

let mockCertificates = JSON.parse(jsonText);

// Add Sameerupeta Vivek record
const vivekRecord = {
  registrationNumber: "2400040156",
  studentName: "Sameerupeta Vivek",
  course: "DRIVER DROWSINESS DETECTION SYSTEM FOR ACCIDENT PREVENTION",
  issueDate: "30-06-2026",
  grade: "Completed (Internship)",
  duration: "1st June 2026 to 30th June 2026 (1 Month)",
  credentialId: "ARMS/0013/2025-2026",
  institution: "KL University",
  avatarUrl: "/student_headshot_male.jpg",
  certificateImage: base64Image
};

mockCertificates.push(vivekRecord);

// Write back to mockData.js
const updatedContent = `export const mockCertificates = ${JSON.stringify(mockCertificates, null, 2)};`;
fs.writeFileSync(mockDataPath, updatedContent, 'utf-8');

console.log('Successfully embedded Sameerupeta Vivek certificate image and updated mockData.js!');
