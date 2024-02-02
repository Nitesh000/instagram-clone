import Image from "next/image";

export function ProfileOutlineIcon({ profileUrl }: { profileUrl: string }) {
  return (
    <div className="flex justify-center items-center rounded-full">
      <Image
        src={profileUrl}
        alt="profile"
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
  );
}
