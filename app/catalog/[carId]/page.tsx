import Image from "next/image";
import { getCarById } from "@/lib/api/api";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./CarDetails.module.css";
import { FaCheckCircle } from "react-icons/fa";

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;
  const car = await getCarById(carId);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={528}
              height={448}
              className={styles.image}
              priority
            />
          </div>
          <BookingForm carId={car.id} />
        </div>

        <div className={styles.right}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
              {car.year}
            </h1>
            <span className={styles.article}>Article: {car.stockNumber}</span>
          </div>

          <div className={styles.location}>
            <span>
              📍 {car.location.city}, {car.location.country}
            </span>
          </div>

          <p className={styles.price}>${car.rentalPrice}</p>

          <p className={styles.description}>{car.description}</p>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
            <ul className={styles.list}>
              {car.rentalConditions.map((condition) => (
                <li key={condition} className={styles.listItem}>
                  <FaCheckCircle className={styles.icon} />
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Car Specifications:</h2>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <FaCheckCircle className={styles.icon} />
                Year: {car.year}
              </li>
              <li className={styles.listItem}>
                <FaCheckCircle className={styles.icon} />
                Type: {car.type}
              </li>
              <li className={styles.listItem}>
                <FaCheckCircle className={styles.icon} />
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={styles.listItem}>
                <FaCheckCircle className={styles.icon} />
                Engine: {car.engine}
              </li>
              <li className={styles.listItem}>
                <FaCheckCircle className={styles.icon} />
                Mileage: {car.mileage} km
              </li>
            </ul>
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Features</h2>
            <ul className={styles.list}>
              {car.features.map((feature) => (
                <li key={feature} className={styles.listItem}>
                  <FaCheckCircle className={styles.icon} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
