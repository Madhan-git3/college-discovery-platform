export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center mt-auto">
      <p>&copy; {new Date().getFullYear()} CollegeQuest Platform. All rights reserved.</p>
      <p className="text-sm mt-2">Built for the MERN/Next.js Internship Task</p>
    </footer>
  );
}