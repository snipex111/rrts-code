import { useState } from "react";



const RegisterPage = (props) => {
	const [userName, setUserName] = useState("");
	const [pwd, setPwd] = useState("");
	const [role, setRole] = useState("");
	return (
		<div className="loginPage">
			<form action="/">
				<input
					className="userName loginInfo"
					type="text"
					placeholder="Username"
					onChange={(event) => {
						setUserName(event.target.value);
					}}
				/>
				<input
					className="userName loginInfo"
					type="password"
					placeholder="Password"
					onChange={(event) => {
						setPwd(event.target.value);
					}}
				/>
				<input
					className="userName loginInfo"
					type="text"
					placeholder="Role"
					onChange={(event) => {
						setRole(event.target.value);
					}}
				/>
				{props.registerError && (
					<div className="loginError">User aleady registered</div>
				)}
			</form>
			<div
				className="btn"
				onClick={() => {
					props.handleRegister(userName, pwd,role);
				}}
			>
				Register
			</div>
			<div
				className="btn"
				onClick={() => {
					props.setpage(0);
				}}
			>
				Login
			</div>
			
		</div>
	);
};


export default RegisterPage;