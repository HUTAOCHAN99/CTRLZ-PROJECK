import DestinationList, { DestinationListSkeleton } from "@/components/DestinationList";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDestinations } from "@/firebase";
import { cities } from "@/util";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSearchParams, useParams, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

function DestinationHeader({ search, onSearchChanged, sortOption, onSortOptionChanged, kabupaten, onKabupatenChanged }) {
    const searchDispatcher = useRef(0);

    return <div className="flex flex-col gap-2 md:flex-row">
        <Input value={search} onChange={(event) => onSearchChanged(event.target.value)}></Input>
        <div className="flex flex-row gap-2">
            <div className="grow md:grow-0"></div>
            <Select value={kabupaten} onValueChange={onKabupatenChanged}>
                <SelectTrigger className="w-40 shrink-0">
                    <SelectValue placeholder="Kabupaten" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">Semua Kabupaten</SelectItem>
                    {cities.map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}
                </SelectContent>
            </Select>
            <Select
                value={sortOption}
                onValueChange={onSortOptionChanged}
            >
                <SelectTrigger className="w-36 shrink-0">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">By Rating</SelectItem>
                    <SelectItem value="most-view">Most Viewed</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
}

function getVisitCount(destination) {
    return destination.visitCount ? destination.visitCount : 0;
}

function getAvgRating(destination) {
    return destination.avgRating ? destination.avgRating : 0;
}

function getNumRating(destination) {
    return destination.numRating ? destination.numRating : 0;
}


export function Destinations() {
    const [searchParam, setSearchParam] = useSearchParams();
    const { loading, data, error } = useDestinations();
    const [search, setSearch] = useState(searchParam.has("q") ? searchParam.get("q") : "");
    const [kabupaten, setKabupaten] = useState(searchParam.has("kabupaten") ? searchParam.get("kabupaten") : "All");
    const [sortOption, setSortOption] = useState(searchParam.get("sort") ? searchParam.get("sort") : "recommended");
    const [debouncedSearch] = useDebounce(search, 1000)

    useEffect(() => {
        setSearch(searchParam.has("q") ? searchParam.get("q") : "");
        setKabupaten(searchParam.has("kabupaten") ? searchParam.get("kabupaten") : "All");
        setSortOption(searchParam.has("sort") ? searchParam.get("sort") : "recommended");
    }, [searchParam])

    const displayedDestinations = useMemo(() => {
        if (!data) return []

        let res = [...data];

        if (debouncedSearch) {
            res = res.filter((value) => value.name.includes(debouncedSearch))
        }

        if (kabupaten != "All") {
            res = res.filter((value) => value.kabupaten == kabupaten)
        }


        res.sort((a, b) => {
            if (sortOption === "recommended") {
                if (getNumRating(b) != getNumRating(a))
                    return getNumRating(b) - getNumRating(a);
                return getAvgRating(b) - getAvgRating(a);
            } else if (sortOption === "rating") {
                return getAvgRating(b) - getAvgRating(a);
            } else if (sortOption === "most-view") {
                return getVisitCount(b) - getVisitCount(a);
            }
            return 0; // Tidak ada urutan khusus
        })

        return res;
    }, [data, sortOption, debouncedSearch, kabupaten]);

    useEffect(() => {
        const queries = {};
        if (search) {
            queries["q"] = search;
        }
        if (kabupaten != "All") {
            queries["kabupaten"] = kabupaten;
        }
        if (sortOption != "recommended") {
            queries["sort"] = sortOption;
        }
        setSearchParam(createSearchParams(queries))
    }, [sortOption, search, kabupaten])

    return (
        <div className="container mx-auto px-4 py-6" id="destinasi">
            <div className="container mx-auto px-4 py-6">
                <h2 className="text-3xl font-bold mb-4">
                    Destinations
                </h2>

                <Card className="sticky top-24 bg-white p-4 px-4 z-50 mb-4">
                    <DestinationHeader kabupaten={kabupaten} onKabupatenChanged={setKabupaten} search={search} onSearchChanged={setSearch} sortOption={sortOption} onSortOptionChanged={setSortOption} />
                </Card>

                {error && <p>Data gagal dimuat. {error}</p>}
                {loading && !error && <DestinationListSkeleton count={9} />}
                {!loading && !error && data && (
                    <DestinationList
                        list={displayedDestinations}
                        createLink={({ id }) => `/destination/${id}`}
                    />
                )}
            </div>
        </div>
    );
}