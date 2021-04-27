import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../dummy-data";
import Head from "next/head";

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();

    return (
        <>
            <Head>
                <title>Home &mdash; Events </title>
            </Head>
            <div>
                <EventList items={featuredEvents} />
            </div>
        </>
    );
};

export default HomePage;
