import H1 from '@/components/heading-h1';
import { EventoEvent } from '@prisma/client';
import { getEvent } from '@/lib/server-utils';
import { Metadata } from 'next';
import Image from 'next/image';

type EventPageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({
	params,
}: EventPageProps): Promise<Metadata> {
	const slug = params.slug;
	const event: EventoEvent = await getEvent(slug);

	return {
		title: event.name,
	};
}

export default async function EventPage({ params }: EventPageProps) {
	const slug = params.slug;
	const event: EventoEvent = await getEvent(slug);

	return (
		<main>
			<section className='flex justify-center items-center relative overflow-hidden py-14 md:py-20'>
				<Image
					src={event.imageUrl}
					alt='Event background image'
					fill
					sizes='(max-width: 1280px) 100vw, 1280px'
					className='object-cover blur-3xl z-0'
					quality={50}
					priority
				/>
				<div className='flex-col lg:flex-row gap-6 lg:gap-16 flex z-1 relative'>
					<Image
						src={event.imageUrl}
						alt={event.name}
						width={300}
						height={201}
						className='rounded-xl border-2 border-white/50 object-cover'
					/>
					<div className='flex flex-col'>
						<p className='text-white/75'>
							{new Date(event.date).toLocaleDateString('en-US', {
								weekday: 'long',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<H1 className='mb-2 mt-1 whitespace-nowrap lg:text-5xl'>
							{event.name}
						</H1>
						<p className='whitespace-nowrap text-xl text-white/75'>
							Organised by <span className='italic'>{event.organizerName}</span>
						</p>

						<button className='bg-white/20 bg-blur text-lg capitalize mt-5 lg:mt-auto w-[95vw] sm:w-full py-2 rounded-md border-white/10 border-2 state-effect'>
							Get tickets
						</button>
					</div>
				</div>
			</section>

			<div className='min-h-[75vh] text-center px-5 py-16'>
				<Section>
					<SectionHeading>About this event</SectionHeading>
					<SectionContent>{event.description}</SectionContent>
				</Section>

				<Section>
					<SectionHeading>Location</SectionHeading>
					<SectionContent>{event.location}</SectionContent>
				</Section>
			</div>
		</main>
	);
}

function Section({ children }: { children: React.ReactNode }) {
	return <section className='mb-12'>{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
	return <h2 className='text-2xl mb-8'>{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
	return (
		<p className='max-w-4xl mx-auto text-lg leading-8 text-white/75'>
			{children}
		</p>
	);
}
