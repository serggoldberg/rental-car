import Image from "next/image";
import Link from "next/link";
import { Car } from "@/types/cars";
import css from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={244}
          height={268}
          className={css.image}
          priority
        />
      </div>

      <div className={css.info}>
        <div className={css.titleRow}>
          <h3 className={css.title}>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>

        <div className={css.details}>
          <span>{car.location.city}</span>
          <span>{car.location.country}</span>
          <span>{car.rentalCompany}</span>
          <span>{car.type}</span>
          <span>{car.mileage} km</span>
        </div>
      </div>

      <Link href={`/catalog/${car.id}`} target="_blank" className={css.button}>
        Read more
      </Link>
    </div>
  );
}
