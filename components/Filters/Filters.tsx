"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarsParams, getCarFilters } from "@/lib/api/api";
import css from "./Filters.module.css";

interface FiltersProps {
  onSearch: (params: CarsParams) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const { data: filters } = useQuery({
    queryKey: ["filters"],
    queryFn: getCarFilters,
  });

  const handleSearch = () => {
    onSearch({
      brand: brand || undefined,
      price: price ? Number(price) : undefined,
      minMileage: minMileage ? Number(minMileage) : undefined,
      maxMileage: maxMileage ? Number(maxMileage) : undefined,
    });
  };

  const handleClear = () => {
    setBrand("");
    setPrice("");
    setMinMileage("");
    setMaxMileage("");
    onSearch({});
  };

  return (
    <div className={css.filters}>
      <div className={css.filterGroup}>
        <label className={css.label}>Car brand</label>
        <select
          className={css.select}
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        >
          <option value="">Choose a brand</option>
          {filters?.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Price / hour</label>
        <select
          className={css.select}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        >
          <option value="">Choose a price</option>
          {[30, 40, 50, 60, 70, 80].map((price) => (
            <option key={price} value={price}>
              To ${price}
            </option>
          ))}
        </select>
      </div>

      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputs}>
          <input
            className={css.input}
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(event) => setMinMileage(event.target.value)}
          />
          <input
            className={css.input}
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(event) => setMaxMileage(event.target.value)}
          />
        </div>
      </div>

      <div className={css.buttons}>
        <button className={css.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button className={css.clearButton} onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </div>
  );
}
