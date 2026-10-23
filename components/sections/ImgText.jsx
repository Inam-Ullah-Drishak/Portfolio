import { CircleGauge, RefreshCw, Share2 } from "lucide-react";
import Image from "next/image";

const benefits = [
	{
		icon: CircleGauge,
		text: "We don't reinvent self-care - we perfect it",
	},
	{
		icon: RefreshCw,
		text: "We make wellness easier and more effective",
	},
	{
		icon: Share2,
		text: "We combine proven therapies into one powerful system",
	},
];

export default function ImgText() {
	return (
		<section className="text-black" aria-labelledby="img-text-title">
			<div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2">
				<div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24">
					<h2
						id="img-text-title"
						className="max-w-xl text-3xl font-semibold leading-none tracking-tight sm:text-4xl"
					>
						Technology that helps you move, recover, and glow - well-being from the inside out.
					</h2>

					<div className="mt-16 max-w-2xl sm:mt-20">
						{benefits.map(({ icon: Icon, text }) => (
							<div
								key={text}
								className="flex items-center gap-5 border-b border-[#ded7cc] py-6 first:border-t"
							>
								<Icon className="h-8 w-8 shrink-0 stroke-[2.5]" aria-hidden="true" />
								<p className="text-sm font-medium sm:text-base">{text}</p>
							</div>
						))}
					</div>
				</div>

				<div className="relative min-h-144 overflow-hidden sm:min-h-144 lg:min-h-0 rounded-2xl">
					<Image
						src="/img-text-img.jpg"
						alt="Person using a wellness recovery device"
						fill
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
			</div>
		</section>
	);
}
