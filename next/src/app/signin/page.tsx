import SignInBlock from "./signin";

export default function JobManagementPage() {
  return (
    <div>
      <h1>Sign In</h1>
      {/* Use InteractiveSection to handle fetching and displaying jobs */}
      <SignInBlock />
    </div>
  );
}
