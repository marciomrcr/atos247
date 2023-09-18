import MobileSidebar from "@/components/MobileSidebar";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="flex items-center  bg-[#111827] pl-8 pt-4 pb-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
