import Header from "./components/header";
import Welcome from "./components/Welcome";
import React, { useState } from "react";
import Admin from "./components/Admin";
import LoginPage from "./components/LoginPage";
import Citizen from "./components/Citizen";
import { v4 as uuidv4 } from "uuid";
import Supervisor from "./components/Supervisor";
import Crew from "./components/Crew";
import Mayor from "./components/Mayor";
import RegisterPage from "./components/RegisterPage";

function App() {
	const [page, setPage] = useState(0);

	const [users, setUsers] = useState([
		{
			id: uuidv4(),
			userName: "ABHISHEK",
			password: "ABHISHEK",
			name: "ABHISHEK",
			role: "citizen",
		},
		{
			id: uuidv4(),
			userName: "Citizen 1",
			password: "Citizen 1",
			name: "Citizen 1",
			role: "citizen",
		},
		{
			id: uuidv4(),
			userName: "Admin",
			password: "Admin",
			name: "Admin",
			role: "admin",
		},
		{
			id: uuidv4(),
			userName: "Work Crew 1",
			password: "Work",
			name: "Work Crew 1",
			members: "10",
			role: "crew",
			available: true,
		},
		{
			id: uuidv4(),
			userName: "Work Crew 2",
			password: "Work",
			name: "Work Crew 2",
			members: "21",
			role: "crew",
			available: true,
		},
		{
			id: uuidv4(),
			userName: "Supervisor 1",
			password: "Supervisor 1",
			name: "Supervisor 1",
			role: "Supervisor",
		},
		{
			id: uuidv4(),
			userName: "Mayor",
			password: "Mayor",
			name: "Mayor",
			role: "mayor",
		},
	]);

	// array of potholes
	const [potholes, setPotholes] = useState([]);

	const reportPothole = (id, place) => {
		setPage(1);
		console.log(id, place);
		setPotholes((prevPotholes) => {
			const potholes = prevPotholes.slice();
			potholes.push({
				id: id,
				place: place,
				status: "pending",
				_id: uuidv4(),
			});
			return potholes;
		});
		setPage(2);
	};
	function setThePage(page){
		setPage(page);
	}

	const [loginError, setLoginError] = useState(false);
	const [registerError, setRegisterError] = useState(false);

	function Display({ page, setPage }) {
		if (page === 0)
			return <Welcome showLoginPage={showLoginPage} showRegisterPage={showRegisterPage} setPage={setPage} />;
		if (page === 1)
			return (
				<LoginPage
					handleLogin={handleLogin}
					loginError={loginError}
					setLoginError={setLoginError}
					setpage={setThePage}
				/>
			);
		

		if (page === 2)
			return (
				<Citizen
					id={user.id}
					name={user.name}
					potholes={potholes}
					reportPothole={reportPothole}
					logout={logout}
				/>
			);

		if (page === 4)
			return (
				<Supervisor
					id={user.id}
					name={user.name}
					potholes={potholes}
					users={users}
					logout={logout}
					denyRequest={denyRequest}
					assignWorkCrew={assignWorkCrew}
					signOff={signOff}
					reassignPothole={reassignPothole}
				/>
			);

		if (page === 6) {
			return (
				<Crew
					id={user.id}
					name={user.name}
					potholes={potholes}
					users={users}
					logout={logout}
					markForReview={markForReview}
				/>
			);
		}
		if (page === 8) {
			return (
				<Admin
					id={user.id}
					name={user.name}
					potholes={potholes}
					users={users}
					logout={logout}
					addCrew={addCrew}
				/>
			);
		}

		if (page === 10)
			return (
				<Mayor
					id={user.id}
					name={user.name}
					potholes={potholes}
					users={users}
					logout={logout}
				/>
			);
			if (page === 11)
			return (
				// <div>register</div>
				<RegisterPage
					handleRegister={handleRegister}
					RegisterError={registerError}
					setRegisterError={setRegisterError}
					setpage={setThePage}
				/>
			);
	}

	const logout = () => {
		setPage(0);
	};

	const [user, setUser] = useState();

	function handleLogin(userName, password) {
		let userValid = false;
		users.forEach((user) => {
			if (user.name === userName && user.password === password) {
				setUser(user);
				userValid = true;
				if (user.role === "citizen") {
					setPage(2);
				}
				if (user.role === "Supervisor") {
					setPage(4);
				}

				if (user.role === "crew") setPage(6);

				if (user.role === "admin") setPage(8);

				if (user.role === "mayor") setPage(10);
				return;
			}
		});

		// show user not found error! on the login page
		if (!userValid) window.alert("User not found!");
	}

	function handleRegister(userName, password,role) {
		let userExists = false;
		users.forEach((user) => {
			if (user.name === userName && user.password === password) {
				userExists=true;
				return ;
			}
		});

		// show user not found error! on the login page
		if (userExists)
		{ window.alert("User already exists!");
	      
	    }
		else
		{
		const user2={
			id: uuidv4(),
			userName: userName,
			password: password,
			name: userName,
			role: role,
		}
		addUser(user2);
		setUser(user2);
		console.log(user);
		if (user.role === "citizen") {
			setPage(2);
		}
		if (user.role === "Supervisor") {
			setPage(4);
		}

		if (user.role === "crew") setPage(6);

		if (user.role === "admin") setPage(8);

		if (user.role === "mayor") setPage(10);
	    }
		return;

	}
	function addUser(user){
		const newUserList=users;
		newUserList.push(user);
		setUsers(newUserList);
		console.log(users);
	}

	function showLoginPage(setPage) {
		setPage(1);
	}
	function showRegisterPage(setPage){
		setPage(11);
	}

	const denyRequest = (id) => {
		// the pothole with the given id needs to be altered
		setPotholes((prevPotholes) => {
			const potholes = prevPotholes.slice();
			// we have to find the pothole with _id equals id and change its status to denied
			potholes.forEach((pothole) => {
				if (pothole._id === id) {
					if (pothole.status === "pending") pothole.status = "denied";
					else
						window.alert(
							"Pothole should be in initial stage (pending) to be denied!"
						);
				}
			});
			return potholes;
		});
	};

	const assignWorkCrew = (holeId, crewId) => {
		// assign to this pothole the given crewId
		// we also have to mark the given crew unavailable
		let userAvailable = true;
		if (holeId && crewId) {
			users.forEach((user) => {
				if (user.id === crewId) {
					if (!user.available) {
						userAvailable = false;
					}
				}
			});
			if (userAvailable)
				potholes.forEach((pothole) => {
					if (pothole._id === holeId) {
						if (pothole.status === "pending") {
							pothole.crewId = crewId;
							pothole.status = "wip";

							// now we change the availability status of the work crew to occupied
							users.forEach((user) => {
								if (user.id === crewId) {
									user.available = false;
									user.potholeId = holeId;
								}
							});
						} else
							window.alert(
								"Pothole should be in initial stage (pending) to be assigned to a work crew!"
							);
					}
				});
			else {
				window.alert("Please select an available work crew!");
			}
		} else
			window.alert(
				"Please select both pothole and work crew for assignment!"
			);
	};

	const signOff = (holeId) => {
		setPotholes((prevPotholes) => {
			let potholes = prevPotholes.slice();
			potholes.forEach((pothole) => {
				if (pothole._id === holeId) {
					// get the user with pothole.crew and change its status to available
					users.forEach((user) => {
						if (user.id === pothole.crewId) {
							user.potholeId = null;
							user.available = true;
						}
					});
					pothole.status = "fixed";
				}
			});
			return potholes;
		});
	};

	const reassignPothole = (holeId) => {
		setPotholes((prevPotholes) => {
			let potholes = prevPotholes.slice();
			potholes.forEach((pothole) => {
				if (pothole._id === holeId) {
					pothole.status = "wip";
				}
			});
			return potholes;
		});
	};

	const markForReview = (holeId) => {
		setPotholes((prevPotholes) => {
			let potholes = prevPotholes.slice();
			potholes.forEach((pothole) => {
				if (pothole._id === holeId) {
					pothole.status = "review";
				}
			});
			return potholes;
		});
	};

	const addCrew = (userName, password, name, members) => {
		if (userName === "" || password === "" || name === "" || members === "")
			window.alert("Please enter all fields!");
		else {
			setUsers((prevUsers) => {
				prevUsers.push({
					id: uuidv4(),
					userName: userName,
					password: password,
					name: name,
					role: "crew",
					available: true,
					members: members,
				});
				return prevUsers;
			});
			window.alert("New Crew Added!");
		}
	};

	return (
		<div className="App">
			<Header />
			<Display page={page} setPage={setPage} />
		</div>
	);
}

export default App;