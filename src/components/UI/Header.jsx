import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import {
	ArrowRightOnRectangleIcon,
	MagnifyingGlassIcon,
	QueueListIcon,
	BellIcon,
} from "@heroicons/react/24/outline";
import HeaderNavMenu from "./HeaderNavMenu";
import { useEffect, useState } from "react";
import axios from "axios";

import userImagePlaceholder from "@/assets/user-image-placeholder.jpg";

const Header = () => {
	const [input, setInput] = useState("");
	const [user, setUser] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		const getMe = async () => {
			try {
				const response = await axios.get(
					`https://pragosacademy.et.r.appspot.com/user`
				);
				const data = response.data.data;
				setUser(data);
			} catch (error) {
				console.error(error);
			}
		};
		getMe();
	}, []);

	return (
		<header className="fixed top-0 z-50 w-full py-3 bg-darkblue-05">
			<nav className="container flex items-center justify-between">
				<div className="md:w-1/3">
					<Link to="/" className="text-xl font-semibold text-white">
						EduPulse
					</Link>
				</div>
				<search className="items-center hidden md:flex md:w-1/3">
					<input
						type="search"
						className="w-full px-4 py-3 outline-none rounded-2xl"
						onChange={(e) => setInput(e.target.value)}
					/>
					{/* <Link */}
					<span className="p-2 text-white -ml-11 rounded-xl bg-darkblue-05 hover:cursor-pointer">
						<Link to={`/search/${input}`}>
							<MagnifyingGlassIcon className="w-5 h-5" />
						</Link>
					</span>
					{/* </Link> */}
				</search>
				<div className="flex items-center justify-end md:w-1/3">
					{user ? (
						<div className="flex gap-2">
							<HeaderNavMenu
								href="/my-class"
								path={"/my-class"}
								icon={<QueueListIcon className="w-5 h-5" />}
								name="Kelas"
							/>
							<HeaderNavMenu
								href="/notifikasi"
								path={"/notifikasi"}
								icon={<BellIcon className="w-5 h-5" />}
								name="Notifikasi"
							/>
							<HeaderNavMenu
								href="/user"
								path={"/user"}
								icon={
									<div className="w-10 h-10 aspect-square overflow-hidden object-cover rounded-full">
										<img
											src={
												user.imageProfile
													? user.imageProfile
													: userImagePlaceholder
											}
											className="w-full"
										/>
									</div>
								}
								name="Akun"
							/>
						</div>
					) : (
						<Button
							icon={
								<ArrowRightOnRectangleIcon className="w-5 h-5" />
							}
							iconPosition="left"
							size="md"
							onClick={() => navigate("/auth/login")}
						>
							Masuk
						</Button>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
