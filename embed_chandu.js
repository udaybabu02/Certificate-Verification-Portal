import fs from 'fs';
import path from 'path';

const mockDataPath = 'src/mockData.js';
const imagePath = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\34b6b9e0-c820-452d-a620-a44ed4cbf2a7\\media__1783807706855.png';

if (!fs.existsSync(mockDataPath)) {
  console.error('mockData.js not found!');
  process.exit(1);
}

if (!fs.existsSync(imagePath)) {
  console.error('Chandu certificate image not found at:', imagePath);
  process.exit(1);
}

// Convert image to base64
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

// Read mockData.js
let content = fs.readFileSync(mockDataPath, 'utf-8');

// Parse the array out (since it's simple JSON array export)
const jsonStart = content.indexOf('[');
const jsonEnd = content.lastIndexOf(']') + 1;
const jsonText = content.substring(jsonStart, jsonEnd);

let mockCertificates = JSON.parse(jsonText);

// Add Gajjalakonda Chandu record
const chanduRecord = {
  registrationNumber: "2200040049",
  studentName: "Gajjalakonda Chandu",
  course: "AI ENGINEER",
  issueDate: "14-07-2026",
  grade: "Completed (Internship)",
  duration: "10 DEC 2025 to 4 APRIL 2026 (4 Months)",
  credentialId: "ARMS/0004/2025-2026",
  institution: "Koneru Lakshmaiaha University",
  avatarUrl: "/student_headshot_male.jpg",
  certificateImage: base64Image
};

mockCertificates.push(chanduRecord);

// Write back to mockData.js
const updatedContent = `export const mockCertificates = ${JSON.stringify(mockCertificates, null, 2)};`;
fs.writeFileSync(mockDataPath, updatedContent, 'utf-8');

console.log('Successfully embedded Gajjalakonda Chandu certificate image and updated mockData.js!');
