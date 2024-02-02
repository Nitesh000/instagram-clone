import Sidebar from "../_components/Sidebar";

interface ApplicationLayoutProps {
  children: Readonly<React.ReactNode>;
}

export default function ApplicationLayout({
  children,
}: ApplicationLayoutProps) {
  return (
    <div>
      {/* NOTE: header of the instagram */}

      {/* NOTE: sidebar of the instagram */}
      <Sidebar>{children}</Sidebar>
    </div>
  );
}
