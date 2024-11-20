import BrandMatcher from "./brand-matcher/App";


export default function Home() {
	return (
		<div className="container mx-auto px-5">
			<div className="grid justify-center content-center min-h-screen text-center">
				<h1 className="text-4xl font-bold mb-5">Match The Brands!</h1>
				<h4 className="text-l mb-5">Test your brand knowledge and try to match the brand name to the brand colour</h4>
				<div>
					<BrandMatcher />
				</div>

			</div>	
		</div>
	);
}
