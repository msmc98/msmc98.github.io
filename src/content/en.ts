import { professionalSummary } from './professional-summary';
export const content = {
	navigation: {
		profile: "Profile",
		projects: "Projects",
		experience: "Experience",
		skills: "Skills",
		contact: "Contact",
	},

	hero: {
		status: "System online",
		role: "Full Stack Web Developer",
		value: "Applications, APIs and websites built around real needs.",
		contact: "Let’s talk",
		projects: "Explore projects",
		experience: "View experience",
		assistant: "Explore with J.A.R.V.I.S.",
		intro: "Play intro",
		description: professionalSummary.en.description,
		cvDownload: "Download CV",
	},

	system: {
		label: "System",
		status: "Online",
		location: "Córdoba, Spain",
	},

	language: {
		label: "Language",
		english: "EN",
		spanish: "ES",
	},

    	profile: {
		eyebrow: "Profile",
		title: "More than code",
		intro:
			"I work across the full development process, from understanding an idea to turning it into a functional digital product.",

		approach: [
			{
				title: "Build",
				description:
					"I develop digital products from scratch, combining frontend, backend and database architecture.",
			},
			{
				title: "Solve",
				description:
					"I translate real business needs into practical, scalable and maintainable technical solutions.",
			},
			{
				title: "Connect",
				description:
					"I work directly with clients, understanding requirements, shaping ideas and turning conversations into products.",
			},
		],

		description:
			"My experience goes beyond development. I have been involved in design decisions, usability, client communication, requirements analysis and project delivery.",
	},

    projects: {
	eyebrow: "Selected work",
	title: "Projects",
	description:
		"A selection of digital products and websites developed across different industries and use cases.",
	visit: "Visit project",
},
};
