import EventsList from '@/components/events-list';
import H1 from '@/components/heading-h1';
import { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next';
import { capitaliseString } from '@/lib/utils';
import { z } from 'zod';

type MetadataProps = {
	params: {
		city: string;
	};
};

type EventsPageProps = MetadataProps & {
	searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: MetadataProps): Metadata {
	const city = params.city;

	return {
		title:
			city === 'all' ? 'All Events' : `Events in ${capitaliseString(city)}`,
	};
}

const pageNumeberSchema = z.coerce.number().int().positive().optional();

export default function Eventspage({ params, searchParams }: EventsPageProps) {
	const city = params.city;
	// const page = searchParams.page || 1;
	const pasedPage = pageNumeberSchema.safeParse(searchParams.page);

	if (!pasedPage.success) {
		throw new Error('Invalid page number');
	}

	return (
		<main className='flex flex-col items-center py-24 px-[20px] min-h-[110vh]'>
			<H1 className='mb-28'>
				{city === 'all' && 'All Events'}
				{city !== 'all' && `Events in ${capitaliseString(city)}`}
			</H1>

			<Suspense key={city + pasedPage.data} fallback={<Loading />}>
				<EventsList city={city} page={pasedPage.data} />
			</Suspense>
		</main>
	);
}
