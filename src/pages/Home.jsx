import { memo } from "react";
import { GlArticle } from "gitlanding/GlArticle";
import issueImage from "../assets/img/sera-issues.png";
import HomeFlow from "../components/Home.Flow.Example";
import HomeFlowImage from "../components/Home.Flow.Image";

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
							<HomeFlow />
						);
					},
				}}
			/>

			<GlArticle
				className="article"
				title={"Optimize Your Ecosystem With Sera"}
				body={
					"Sera leverages your existing ecosystem to enhance security efficiency and decision-making, integrating seamlessly with automation and custom tool development for a streamlined, adaptable security posture."}
				illustration={{
					"type": "custom component",
					"Component": () => {
						return (
							<HomeFlow />
						);
					},
				}}
			/>

			<GlArticle
				className="article-right"
				title={"Optimize Your Ecosystem With Sera"}
				body={
					"Sera leverages your existing ecosystem to enhance security efficiency and decision-making, integrating seamlessly with automation and custom tool development for a streamlined, adaptable security posture."}
				illustration={{
					"type": "custom component",
					"Component": () => {
						return (
							<HomeFlowImage img={issueImage} />
						);
					},
				}}
				illustrationPosition="left"
			/>
		</>
	);
});
