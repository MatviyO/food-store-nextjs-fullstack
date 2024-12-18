import { InfoBlock } from "@/shared/components/shared/text/info-block";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Page not found"
        text="Please check the entered address or try again later"
        imageUrl="/assets/images/not-found.png"
      />
    </div>
  );
}
