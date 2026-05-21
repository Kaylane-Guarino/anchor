import { HotelDetails } from "@/components/hotel/HotelDetails";

type HotelDetailsPageProps = {
  params: Promise<{
    hotelId: string;
  }>;
};

export default async function HotelDetailsPage({
  params,
}: HotelDetailsPageProps) {
  const { hotelId } = await params;

  return (
    <main className="min-h-screen bg-gray-100">
      <HotelDetails hotelId={hotelId} />
    </main>
  );
}