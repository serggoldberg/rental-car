"use client";

import { useState } from "react";
import { CarsParams } from "@/lib/api/api";
import Filters from "@/components/Filters/Filters";
import css from "./Catalog.module.css";

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarsParams>({});
  console.log(filters);

  return (
    <main>
      <div className={css.filtersContainer}>
        <Filters onSearch={setFilters} />
      </div>
      <div className={css.carsContainer}>
        <p>Cars will be here</p>
      </div>
    </main>
  );
}
