"use client";

import { useState } from "react";
import { CarsParams, getCars } from "@/lib/api/api";
import Filters from "@/components/Filters/Filters";
import css from "./Catalog.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import CarCard from "@/components/CarCard/CarCard";
import Loader from "@/components/Loader/Loader";

const PER_PAGE = 4;

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarsParams>({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["cars", filters],
      queryFn: ({ pageParam }) =>
        getCars({ ...filters, page: pageParam, perPage: PER_PAGE }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return Number(lastPage.page) + 1;
        }
        return undefined;
      },
    });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  const handleSearch = (newFilters: CarsParams) => {
    setFilters(newFilters);
  };

  return (
    <main>
      <div className={css.filtersContainer}>
        <Filters onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className={css.carsList}>
            {cars.map((car) => (
              <li key={car.id}>
                <CarCard car={car} />
              </li>
            ))}
          </ul>

          {hasNextPage && (
            <div className={css.loadMore}>
              <button
                className={css.loadMoreButton}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? <Loader /> : "Load more"}
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
