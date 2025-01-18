import InteractiveSection from './testinteraction'; // Client-side component

export default function JobManagementPage() {
  return (
    <div>
      <h1>Job Management</h1>
      {/* Use InteractiveSection to handle fetching and displaying jobs */}
      <InteractiveSection />
    </div>
  );
}
