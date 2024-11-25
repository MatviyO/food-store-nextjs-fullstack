import { Container } from "@/shared/components/shared/layout";
import { Title } from "@/shared/components/shared/text/title";

export default async function DashboardPage() {

  return (
    <>
      <Container className="mt-10">
        <Title
          text="Dashboard"
          size="lg"
          className="font-extrabold"
        />
      </Container>


      <Container className="pb-14 mt-[30px]">
        <div className="flex gap-[80px]">
        </div>
      </Container>
    </>
  );
}
