import { memo } from "react";
import { GlArticle } from "gitlanding/GlArticle";
import { GlProjectCard } from "gitlanding/GlCards/GlProjectCard";
import { GlCheckList } from "gitlanding/GlCheckList";
import { GlCards } from "gitlanding/GlCards";
import { GlSectionDivider } from "gitlanding/GlSectionDivider";
import articlePng from "../assets/img/article-page-example.png"
import pokemonPng from "../assets/img/pokemon.png";
import dataPng from "../assets/img/data-visualisation.png";
import kubernetesPng from "../assets/img/kubernetes.png";
import webinairePng from "../assets/img/webinaire.png";


export const PageExample = memo(() => {


	return (<>

		<GlArticle
			title={("articleTitle")}
			body={("articleBody")}
			buttonLabel={("articleButtonLabel")}
			buttonLink={{
				"href": "https://example.com",
			}}
			illustration={{
				"type": "image",
				"src": articlePng,
				"hasShadow": false
			}}
			hasAnimation={true}
		/>

		<GlCards>
			<GlProjectCard
				title={("projectCardTitle1")}
				subtitle={("projectCardSubtitle1")}
				projectImageUrl={pokemonPng}
			/>
			<GlProjectCard
				title={("projectCardTitle2")}
				subtitle={("projectCardSubtitle2")}
				projectImageUrl={dataPng}
			/>
			<GlProjectCard
				title={("projectCardTitle3")}
				subtitle={("projectCardSubtitle3")}
				projectImageUrl={kubernetesPng}
			/>
			<GlProjectCard
				title={("projectCardTitle4")}
				subtitle={("projectCardSubtitle4")}
				projectImageUrl={webinairePng}
			/>
		</GlCards>

		<GlSectionDivider />

		<GlCheckList
			heading={("checkListHeading")}
			hasAnimation={true}
			elements={

				[
					{
						"title": (`checkListElementTitle1`),
						"description": ("checkListElementDescription1")
					},
					{
						"title": (`checkListElementTitle2`),
						"description": ("checkListElementDescription2")
					},
					{
						"title": (`checkListElementTitle3`),
						"description": ("checkListElementDescription3")
					},
					{
						"title": (`checkListElementTitle4`),
						"description": ("checkListElementDescription4")
					},
					{
						"title": (`checkListElementTitle5`),
						"description": ("checkListElementDescription5")
					},
					{
						"title": (`checkListElementTitle6`),
						"description": ("checkListElementDescription6")
					},
				]
			}
		/>

	</>)
});
