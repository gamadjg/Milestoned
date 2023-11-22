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
            <div className="p-10">
                <div className="flex flex-col items-center justify-center text-center">
                    <div
                        className={
                            "font-libreBaskerville text-6xl mb-10 text-[#334155]"
                        }
                    >
                        Welcome to
                        <p className="text-blue-600">Milestoned</p>
                    </div>
                    <p className="max-w-[400px]  min-w-[400px] text-base mb-10">
                        Whether you want to remember a major career
                        breakthrough, or simply mark a personal milestone, we
                        made it easy to stay organized and motivated. Start
                        celebrating your journey today with Milestoned!
                    </p>
                    <Link to={"/login"}>
                        <button className="rounded-lg bg-[#334155] text-white px-16 py-2 text-center w-full mb-2">
                            LOGIN
                        </button>
                    </Link>
                    <p className="text-base">
                        Don't have an account?{" "}
                        <Link to={"/register"} className="text-blue-600 ">
                            Register here!
                        </Link>
                    </p>
                </div>
            </div>
            {/* <div className="max-w-[650px] h-full max-h-[1000px] flex items-center justify-start p-5 pr-10 relative bottom-10"> */}
            {/* <div className="rounded-3xl border-0 border-black relative w-full min-w-[600px] h-5/6"> */}
            <div className="flex p-5 relative items-center">
                <p
                    className={
                        "font-kalam text-[#EA580C] text-3xl absolute min-w-[155px] md:left-[-140px] left-[-80px] top-[130px] z-50"
                    }
                >
                    Try it now!
                </p>
                <Link
                    to={"/dashboard"}
                    className="absolute md:left-[200px] left-[210px] top-[70px] z-20"
                >
                    <button className="rounded-lg bg-blue-600 text-white px-10 py-2 text-center max-w-[270px] text-base">
                        Create a New Milestone
                    </button>
                </Link>
                <img
                    src={arrow}
                    alt="Arrow pointing at button to use app as guest"
                    className="absolute z-30 object-fill md:left-[-35px] left-[10px] top-[140px]"
                    width={200}
                />
                {/* <div className="rounded-3xl bg-[#334155] w-full h-5/6 absolute bottom-0"></div> */}
                <img
                    src={phoneHand}
                    alt="Hand holding phone"
                    className="rounded-3xl w-[610px] h-[750px] min-w-[610px]"
                    // width={600}
                />
                {/* <Image
                        src={handPic}
                        priority={true}
                        className="absolute left-[0px] object-none object-left-top rounded-3xl h-full w-full"
                        alt="Hand holding phone"
                        width={876}
                        height={1023}
                    /> */}
            </div>
            {/* </div> */}
        </main>
    );
}
