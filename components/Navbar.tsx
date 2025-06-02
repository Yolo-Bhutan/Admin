export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <div className="bg-white p-4 shadow flex justify-between">
      <button onClick={toggleSidebar}>☰</button>
    </div>
  );
}
