import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

type ButtonProps = {
  text?: string;
  width: string;
  bg?: string;
  state?: boolean;
  handler?: () => void;
};

const Button = ({ width, text, bg, state, handler }: ButtonProps) => {
  const heartState = state ? (
    <IoMdHeart className="text-2xl" />
  ) : (
    <IoIosHeartEmpty className="text-2xl" />
  );
  return (
    <div
      className="h-14"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #000",
        width: width,
        backgroundColor: bg ? bg : "#fff",
        color: bg ? "#fff" : bg,
      }}
      onClick={handler}
    >
      {text ? text : heartState}
    </div>
  );
};
export default Button;
