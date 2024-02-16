import { memo } from "react";
import { GlHeader } from "gitlanding/GlHeader";
import { routes } from "../router";
import { GlLogo } from "gitlanding/utils/GlLogo";
import logoSvg from "../assets/icons/sera-icon.png";


export const Header = memo(() => {
	return <GlHeader
		className="header"
		title={<GlLogo
			fill="orange"
			logoUrl={logoSvg}
			width={50}
		/>}
		links={[
			{
				"label": ("Use Cases"),
				...routes.pageExample().link
			},
			{
				"label": ("GitHub"),
				"href": "https://example.com",
			},
			{
				"label": ("Documentation"),
				"href": "https://example.com",
			},
		]}
		enableDarkModeSwitch={false}
		githubRepoUrl="https://github.com/Sera-ai/sera"
		githubButtonSize="large"
		showGithubStarCount={true}
	/>
});