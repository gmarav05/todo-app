import Image from "next/image";
import {Button} from "@/components/ui/button";
import connectDB from "@/lib/db.js"

export default async function Home() {

  const connection = await connectDB();
  console.log(connection)

  return (
    <Button>
      Welcome to Todo App
    </Button>
  );
}
