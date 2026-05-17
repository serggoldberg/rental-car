interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;

  return (
    <main>
      <h1>Car ID: {carId}</h1>
    </main>
  );
}
