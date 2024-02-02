import { cookies } from "next/headers";

export default function PostsPage() {
  const name = cookies()?.get("user") || { name: "user", value: "User" };
  return (
    <div>
      <span>{name?.value}</span>
    </div>
  );
}
