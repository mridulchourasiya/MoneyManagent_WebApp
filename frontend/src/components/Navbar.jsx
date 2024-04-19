import { BsGithub, BsLinkedin, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex flex-row gap-5 justify-center items-center">
        <Link href="https://github.com/mridulchourasiya">
          <BsGithub />
        </Link>
        <Link href="">
          <BsLinkedin />
        </Link>
        <Link href="">
          <BsInstagram />
        </Link>
        <p className="text-bold text-xl text-gray-200 ">
          Developed By : Mridul Chourasia
        </p>
      </div>
    </div>
  );
};

export default Navbar;
