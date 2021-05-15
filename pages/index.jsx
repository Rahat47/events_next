import EventList from "../components/events/EventList";

import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";

const HomePage = ({ events }) => {
    // const featuredEvents = getFeaturedEvents();
    return (
        <>
            <Head>
                <title>Home &mdash; Events </title>
                <meta
                    name="description"
                    content="Find great events for your personality"
                />
            </Head>
            <div>
                <EventList items={events} />
            </div>
        </>
    );
};

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    };
}

export default HomePage;
