import "@testing-library/jest-dom";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

global.createjs = {
	Sound: {
		INTERRUPT_ANY: "",
		WebAudioPlugin: {
			context: {
				state: "",
				resume: () => {},
			},
		},
		play: () => {},
		initializeDefaultPlugins: () => {},
		registerSound: () => {},
	},
} as any;
