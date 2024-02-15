import { memo } from "react";
import { GlHero } from "gitlanding/GlHero/GlHero";
import { GlArticle } from "gitlanding/GlArticle";
import { GlCards } from "gitlanding/GlCards";
import { GlLogoCard } from "gitlanding/GlCards/GlLogoCard";
import { GlCodeBlock } from "gitlanding/GlCodeBlock";
import balloonIcon from "../assets/icons/balloon.png";
import drawioIcon from "../assets/icons/drawio.png";
import githubIcon from "../assets/icons/github.png";
import plusIcon from "../assets/icons/plus.png";
import rocketIcon from "../assets/icons/rocket-chat.png";
import tchapIcon from "../assets/icons/tchap.png";
import networkVideo from "../assets/video/network.mp4";
import NodeAsHandleFlow from "../components/Home.Flow.Example";

export const Home = memo(() => {
	return (
		<>
			<GlArticle
				className="article"
				title={"Optimize Your Ecosystem With Sera"}
				body={
					"Sera leverages your existing ecosystem to enhance security efficiency and decision-making, integrating seamlessly with automation and custom tool development for a streamlined, adaptable security posture."}
				illustration={{
					"type": "custom component",
					"Component": () => {
						return (
							<NodeAsHandleFlow />
						);
					},
				}}
			/>

			<GlArticle
				className="article2"
				title="Empower Your Security Infrastructure with Sera"
				body='Sera is designed to seamlessly integrate with your existing security tools, offering a powerful and user-friendly GUI for crafting advanced API policy playbooks. By automating and enhancing security operations, Sera provides a flexible platform for all your SOAR needs, making it easier than ever to manage and evolve your security strategy.'
				buttonLabel={("articleButtonLabel")}
				buttonLink={{
					"href": "https://example.com",
				}}

				illustration={{
					"type": "video",
					"sources": [
						{
							"src": networkVideo,
							"type": "video/mp4",
						},
					],
				}}
				hasAnimation={true}
				illustrationPosition="left"
			/>

		</>
	);
});
