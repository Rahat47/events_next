// import { useRouter } from "next/router";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
// import { getEventById } from "../../dummy-data";
import Head from "next/head";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetailedPage = ({ event }) => {
    if (!event) {
        return (
            <>
                <Head>
                    <title>Event Details &mdash; Events</title>
                </Head>
                <div className="center">
                    <p>Loading...</p>
                </div>
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

export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            event,
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    // const allEvents = await getAllEvents();
    const featuredEvent = await getFeaturedEvents();

    const paths = featuredEvent.map(event => ({
        params: { eventId: event.id },
    }));
    return {
        paths: paths,
        fallback: "blocking",
    };
}

export default EventDetailedPage;
