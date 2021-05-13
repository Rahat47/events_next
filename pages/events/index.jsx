import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";
// import { getAllEvents } from "../../dummy-data";

const EventsPage = ({ events }) => {
    const router = useRouter();
    // const events = getAllEvents();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;

        router.push(fullPath);
    };

    return (
        <>
            <Head>
                <title> All Events &mdash; Events </title>
            </Head>

            <>
                <EventsSearch onSearch={findEventsHandler} />
                <EventList items={events} />
            </>
        </>
    );
};

export default EventsPage;

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events,
        },
    };
}
