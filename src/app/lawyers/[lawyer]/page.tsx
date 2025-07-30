import ClientReviews from "@/components/lawyers/ClientReviews";
import ContactLawyer from "@/components/lawyers/ContactLawyer";
import Expertise from "@/components/lawyers/Expertise";
import LawyerOverview from "@/components/lawyers/LawyerOverview";
import Container from "@/utils/Container";

const LawyerDetailsPage = () => {
  return (
    <div>
      <LawyerOverview></LawyerOverview>
      <Container>
        <div className="grid grid-cols-3 gap-6 my-8">
          <div className="col-span-2">
            <Expertise></Expertise>
            <ClientReviews></ClientReviews>
            <ClientReviews></ClientReviews>
            <ClientReviews></ClientReviews>
            <ClientReviews></ClientReviews>
          </div>
          <div className="col-span-1">
            <div className="sticky top-8">
              <ContactLawyer></ContactLawyer>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyerDetailsPage;
