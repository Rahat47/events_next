// import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
// import { getFilteredEvents } from "../../dummy-data";
import Head from "next/head";
import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventsPage = props => {
    // const router = useRouter();

    // const filteredData = router.query.slug;

    // if (!filteredData) {
    //     return <p className="center">Loading...</p>;
    // }

    // const filteredYear = filteredData[0];
    // const filteredMonth = filteredData[1];

    // const numYear = Number(filteredYear);
    // const numMonth = Number(filteredMonth);

    if (props.hasError) {
        return (
            <>
                <Head>
                    <title>Filtered Events &mdash; Events</title>
                </Head>
                <ErrorAlert>
                    <p className="center">
                        Invalid Filters. Please Adjust your values...
                    </p>
                </ErrorAlert>

                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <>
                <Head>
                    <title>Filtered Events &mdash; Events</title>
                </Head>
                <ErrorAlert>
                    <p className="center">No events found for this filter!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events">Show All Events</Button>
                </div>
            </>
        );
    }
    const date = new Date(props.date.year, props.date.month - 1);
    return (
        <>
            <Head>
                <title>Filtered Events &mdash; Events</title>
            </Head>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
};

export async function getServerSideProps(context) {
    const { params } = context;

    const filteredData = params.slug;

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = Number(filteredYear);
    const numMonth = Number(filteredMonth);

    if (
        isNaN(numMonth) ||
        isNaN(numYear) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: { hasError: true },
            // notFound: true,
            // redirect: {
            //     destination: "/error"
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
}

export default FilteredEventsPage;
