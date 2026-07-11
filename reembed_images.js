import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity\\brain\\34b6b9e0-c820-452d-a620-a44ed4cbf2a7';

// The correct JPEG files for all 7 certificates
const images = {
  chitraja: path.join(brainDir, 'media__1783800503950.jpg'),
  pramod: path.join(brainDir, 'media__1783800503960.jpg'),
  keerthika: path.join(brainDir, 'media__1783800503969.jpg'),
  niranjan: path.join(brainDir, 'media__1783800503976.jpg'),
  kiran: path.join(brainDir, 'media__1783800503981.jpg'),
  msvk: path.join(brainDir, 'media__1783800005201.jpg'),
  clarence: path.join(brainDir, 'media__1783794699003.jpg')
};

function getBase64(filePath) {
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
    const data = fs.readFileSync(filePath);
    return `data:${mimeType};base64,${data.toString('base64')}`;
  }
  console.log('File not found:', filePath);
  return '';
}

const mockCertificates = [
  {
    registrationNumber: "2023002818",
    studentName: "Koppadi Chitraja Sri Varshini",
    course: "SMART ATTENDANCE SYSTEM WITH FACE RECOGNITION",
    issueDate: "13-07-2026",
    grade: "Completed (Internship)",
    duration: "25th May 2026 to 13th July 2026 (8 Weeks)",
    credentialId: "ARMS/0007/2025-2026",
    institution: "GITAM Deemed to be University, Hyderabad",
    avatarUrl: "/student_headshot.jpg",
    certificateImage: getBase64(images.chitraja)
  },
  {
    registrationNumber: "23B91A61D0",
    studentName: "Pramod Kumar Nukathoti",
    course: "GST BILLING SOFTWARE",
    issueDate: "13-07-2026",
    grade: "Completed (Internship)",
    duration: "25th May 2026 to 13th July 2026 (8 Weeks)",
    credentialId: "ARMS/0008/2025-2026",
    institution: "SRKR Engineering College",
    avatarUrl: "/student_headshot_male.jpg",
    certificateImage: getBase64(images.pramod)
  },
  {
    registrationNumber: "23891A051L",
    studentName: "Nallagonda Keerthika",
    course: "EXPENSE SPLITTER APP",
    issueDate: "20-07-2026",
    grade: "Completed (Internship)",
    duration: "20th May 2026 to 20th July 2026 (8 Weeks)",
    credentialId: "ARMS/0009/2025-2026",
    institution: "SRKR Engineering College, Bhimavaram",
    avatarUrl: "/student_headshot.jpg",
    certificateImage: getBase64(images.keerthika)
  },
  {
    registrationNumber: "2400040402",
    studentName: "Kavitapu Niranjan",
    course: "SMART HOME AUTOMATION",
    issueDate: "30-05-2026",
    grade: "Completed (Internship)",
    duration: "15th May 2026 to 30th May 2026 Batch",
    credentialId: "ARMS/0010/2025-2026",
    institution: "KL University",
    avatarUrl: "/student_headshot_male.jpg",
    certificateImage: getBase64(images.niranjan)
  },
  // Support the search typo variation from user's screenshots
  {
    registrationNumber: "240091A05L2",
    studentName: "Kovitapu Niranjan",
    course: "SMART HOME AUTOMATION",
    issueDate: "30-05-2026",
    grade: "Completed (Internship)",
    duration: "15th May 2026 to 30th May 2026 Batch",
    credentialId: "ARMS/0010/2025-2026",
    institution: "KL University",
    avatarUrl: "/student_headshot_male.jpg",
    certificateImage: getBase64(images.niranjan)
  },
  {
    registrationNumber: "2400040078",
    studentName: "Orsu Kiran",
    course: "SMART TRAFFIC LIGHTS",
    issueDate: "30-05-2026",
    grade: "Completed (Internship)",
    duration: "15th May 2026 to 30th May 2026 Batch",
    credentialId: "ARMS/0011/2025-2026",
    institution: "KL University",
    avatarUrl: "/student_headshot_male.jpg",
    certificateImage: getBase64(images.kiran)
  },
  {
    registrationNumber: "2400040474",
    studentName: "Msvk Datla",
    course: "SMART IOT-BASED HOME AUTOMATION SYSTEM USING ESP32 AND BLYNKDD",
    issueDate: "21-06-2026",
    grade: "Completed (Internship)",
    duration: "21st May 2026 to 21st June 2026 Batch",
    credentialId: "ARMS/0012/2025-2026",
    institution: "KL University",
    avatarUrl: "/student_headshot_male.jpg",
    certificateImage: getBase64(images.msvk)
  },
  {
    registrationNumber: "23891A05L1",
    studentName: "Moka Clarence Nightingale",
    course: "SOCIAL MEDIA SENTIMENT ANALYZER",
    issueDate: "14-07-2026",
    grade: "Completed (Internship)",
    duration: "8 Weeks (25th May 2026 to 13th July 2026)",
    credentialId: "ARMS/0006/2025-2026",
    institution: "Sagi Rama Krishnam Raju Engineering College, Bhimavaram",
    avatarUrl: "/student_headshot.jpg",
    certificateImage: getBase64(images.clarence)
  },
  {
    registrationNumber: "ASH-2026-001",
    studentName: "John Doe",
    course: "Advanced React & Tailwind CSS Development",
    issueDate: "May 15, 2026",
    grade: "Distinction",
    duration: "12 Weeks",
    credentialId: "ASH-REG-2026-001A",
    institution: "Amaramam Skill Hub"
  },
  {
    registrationNumber: "ASH-2026-002",
    studentName: "Jane Smith",
    course: "Full-Stack Web Development Bootcamp",
    issueDate: "June 20, 2026",
    grade: "Outstanding",
    duration: "24 Weeks",
    credentialId: "ASH-REG-2026-002B",
    institution: "Amaramam Skill Hub"
  }
];

const fileContent = `export const mockCertificates = ${JSON.stringify(mockCertificates, null, 2)};`;

fs.writeFileSync('src/mockData.js', fileContent);
console.log('Successfully updated src/mockData.js with CORRECT base64 images!');
