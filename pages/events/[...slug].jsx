import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/results-title/results-title";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import { getFilteredEvents } from "../../dummy-data";
import Head from "next/head";

const FilteredEventsPage = () => {
    const router = useRouter();

    const filteredData = router.query.slug;

    if (!filteredData) {
        return <p className="center">Loading...</p>;
    }

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

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

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
    const date = new Date(numYear, numMonth - 1);
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

export default FilteredEventsPage;
