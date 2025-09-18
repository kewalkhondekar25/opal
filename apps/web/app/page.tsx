import { ModeToggle } from "@/components/common/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen justify-center items-center
      text-7xl font-bold ">
      <div>
        Opal
      </div>
      <div className="absolute top-0 right-5">
        <ModeToggle />
      </div>
    </div>
  );
}
