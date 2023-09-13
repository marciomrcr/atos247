import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      LandingPage
      <div>
        <Link href="/dashboard">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
