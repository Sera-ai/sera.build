import { memo } from "react";
import { GlFooter } from "gitlanding/GlFooter";


export const Footer = memo(() => {
	return <GlFooter
		bottomDivContent={("license")}
		className="footer"
		email="email@email.com"
		phoneNumber="+33545345676"
		
	/>
})

