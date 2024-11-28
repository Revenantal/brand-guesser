import BrandMatcher from "./brand-matcher/App";


export default function Home() {
	return (
		<div className="container mx-auto px-5">
			<div className="grid justify-center content-center min-h-screen text-center py-5">

				<div>
					<BrandMatcher />
				</div>

			</div>	
		</div>
	);
}
