import { useRouter } from "next/router";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById } from "../../dummy-data";
import Head from "next/head";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
const EventDetailedPage = () => {
    const router = useRouter();

    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return (
            <>
                <Head>
                    <title>Event Details &mdash; Events</title>
                </Head>
                <ErrorAlert>
                    <p>No Event Found</p>
                </ErrorAlert>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{event.title} &mdash; Events </title>
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    );
};

export default EventDetailedPage;
