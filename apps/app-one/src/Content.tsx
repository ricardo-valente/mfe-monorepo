import React from "react";
import Header from "host/Header";
import Footer from "host/Footer";
import { useUser } from "host/context";

interface ContentProps {
  title?: string;
}

export default function Content({ title }: ContentProps) {
  const [user, setUser] = useUser();

  console.log("Content user: ", user);

  return (
    <div className="text-3xl mx-auto max-w-6xl">
      <Header title={title} backHome />

      <div className="text-center">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
          className="rounded-full w-32 mb-4 mx-auto"
          alt="Avatar"
        />
        {/* <h5 className="text-xl font-medium leading-tight mb-2">{user.name}</h5> */}
        {/* <p className="text-gray-500">{user.email}</p> */}
      </div>

      <Footer />
    </div>
  );
}
