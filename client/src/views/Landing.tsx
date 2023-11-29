// import { Libre_Baskerville, Kalam } from "next/font/google";
import arrow from "../assets/arrow.png";
import phoneHand from "../assets/phone-hand.png";
import { Link } from "react-router-dom";

// const libreBaskerville = Libre_Baskerville({
//     weight: "700",
//     subsets: ["latin"],
// });

// const kalam = Kalam({
//     weight: "700",
//     subsets: ["latin"],
// });

export default function Landing() {
    return (
        <main className="w-full h-full grid md:grid-cols-2 items-center justify-center">
            {/* // <main className="w-screen h-screen grid grid-cols-2 items-center justify-center gap-20"> */}
            <div className="m-10 flex flex-col items-center justify-center text-center">
                <div
                    className={
                        "font-libreBaskerville md:text-6xl text-5xl mb-10 text-[#334155]"
                    }
                >
                    Welcome to
                    <p className="text-blue-600">Milestoned</p>
                </div>
                {/* <div className="md:w-full w-[300px]"> */}
                <p className="max-w-[400px]  md:min-w-[400px] text-base mb-10">
                    Whether you want to remember a major career breakthrough, or
                    simply mark a personal milestone, we made it easy to stay
                    organized and motivated.
                </p>
                <Link to={"/login"}>
                    <button className="rounded-2xl bg-[#334155] text-white px-16 py-2 text-center w-[300px] mb-4">
                        LOGIN
                    </button>
                </Link>
                <p className="text-base">
                    Don't have an account?{" "}
                    <Link to={"/register"} className="text-blue-600 ">
                        Register here!
                    </Link>
                </p>
                {/* </div> */}
            </div>
            {/* <div className="max-w-[650px] h-full max-h-[1000px] flex items-center justify-start p-5 pr-10 relative bottom-10"> */}
            {/* <div className="rounded-3xl border-0 border-black relative w-full min-w-[600px] h-5/6"> */}
            <div className="flex p-5 relative items-center md:m-auto mt-20 mx-auto bg-gray-200 w-full">
                <p
                    className={
                        "font-kalam text-[#EA580C] text-3xl absolute min-w-[155px] md:left-[-140px] left-[190px] md:top-[80px] top-[-35px] z-50"
                    }
                >
                    Try it now!
                </p>
                <Link
                    to={"/dashboard"}
                    className="absolute md:left-[200px] left-[118px] md:top-[70px] top-[45px] z-20"
                >
                    <button className="rounded-lg bg-blue-600 text-white md:px-10 px-4 py-1 text-center max-w-[270px] text-[10px] md:text-base">
                        Create a New Milestone
                    </button>
                </Link>
                <img
                    src={arrow}
                    alt="Arrow pointing at button to use app as guest"
                    className="absolute z-30 object-fill md:w-[200px] w-[90px] rotate-[140deg] md:rotate-0 md:left-[5px] left-[110px] md:top-[80px] top-[-5px]"
                />
                <img
                    src={phoneHand}
                    alt="Hand holding phone"
                    className="rounded-3xl w-[339px] h-[434px] md:h-[750px] md:min-w-[610px] bg-gray-200"
                />
            </div>
            {/* </div> */}
        </main>
    );
}
