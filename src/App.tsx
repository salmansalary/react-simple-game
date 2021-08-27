import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AppProvider } from "./hooks/appHook";
import "./index.scss";
import Home from "./routes/home";
import Play from "./routes/play";
import { audioObject } from "./utils";
/*
    The preLoadImages is helping on deployed and production Mode,
    Since i have some number of graphic assets and images i preload
    them to browser cache to provide smooth game journey
*/
async function preLoadImages() {
	new Image().src = await (await import("./assets/images/1.png")).default;
	new Image().src = await (await import("./assets/images/2.png")).default;
	new Image().src = await (await import("./assets/images/3.png")).default;
	new Image().src = await (await import("./assets/images/4.png")).default;
	new Image().src = await (await import("./assets/images/5.png")).default;
	new Image().src = await (await import("./assets/images/6.png")).default;
	new Image().src = await (await import("./assets/images/7.png")).default;
	new Image().src = await (await import("./assets/images/8.png")).default;
	new Image().src = await (await import("./assets/images/backImg.png")).default;
	new Image().src = await (await import("./assets/images/backImgMain.png")).default;
	new Image().src = await (await import("./assets/images/hole.png")).default;

	await audioObject.loadFiles();
}

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		//Redirect to home on hard refresh if user manually reload the page
		if (window.location.pathname === "/play") {
			window.location = window.location.origin as any;
			return;
		}

		preLoadImages().then(() => {
			setLoading(false);
		});
	}, []);

	return (
		<>
			{loading && (
				<div className="loaderContainer">
					<label className="loader">Loading ...</label>
				</div>
			)}
			<AppProvider>
				<Router>
					<Switch>
						<Route exact path="/home" component={Home} />
						<Route path="/play" component={Play} />
						<Redirect from="/" to="/home" />
					</Switch>
				</Router>
			</AppProvider>
		</>
	);
}

export default App;
