"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarsParams, getCarFilters } from "@/lib/api/api";
import css from "./Filters.module.css";
import Select from "@/components/Select/Select";

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

  const brandOptions =
    filters?.brands.map((item) => ({
      value: item,
      label: item,
    })) ?? [];

  const priceOptions = [30, 40, 50, 60, 70, 80].map((price) => ({
    value: String(price),
    label: String(price),
  }));

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
      <Select
        label="Car brand"
        placeholder="Choose a brand"
        options={brandOptions}
        value={brand}
        onChange={setBrand}
      />

      <Select
        label="Price / hour"
        placeholder="Choose a price"
        options={priceOptions}
        value={price}
        onChange={setPrice}
      />

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
