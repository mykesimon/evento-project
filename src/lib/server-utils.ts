import 'server-only';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import prisma from './db';
import { capitaliseString } from './utils';

export const getEvents = unstable_cache(async (city: string, page = 1) => {
	// const response = await fetch(
	// 	`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
	// );
	// const events: EventoEvent[] = await response.json();

	const events = await prisma.eventoEvent.findMany({
		where: {
			city: city === 'all' ? undefined : capitaliseString(city),
		},
		orderBy: {
			date: 'asc',
		},
		take: 6,
		skip: (page - 1) * 6,
	});

	let totalEvents;

	if (city === 'all') {
		totalEvents = await prisma.eventoEvent.count();
	} else {
		totalEvents = await prisma.eventoEvent.count({
			where: {
				city: capitaliseString(city),
			},
		});
	}

	return { events, totalEvents };
});

export const getEvent = unstable_cache(async (slug: string) => {
	// const response = await fetch(
	// 	`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
	// );
	// const event: EventoEvent = await response.json();

	const event = await prisma.eventoEvent.findUnique({
		where: {
			slug: slug,
		},
	});
	if (!event) {
		return notFound();
	}
	return event;
});
