import { cookies } from "next/headers";

export default function PostsPage() {
  const name = cookies()?.get("user") || { name: "user", value: "User" };
  return (
    <div>
      <h1>Posts</h1>
      <p>Welcome, {name.value}!</p>
    </div>
  );
}
