"use client"
import ClientReviews from "@/components/lawyers/ClientReviews";
import ContactLawyer from "@/components/lawyers/ContactLawyer";
import Expertise from "@/components/lawyers/Expertise";
import LawyerOverview from "@/components/lawyers/LawyerOverview";
import { useLawyerDetailsQuery } from "@/redux/features/auth/authApi";
import Container from "@/utils/Container";
import { useParams } from "next/navigation";

const LawyerDetailsPage = () => {
  const {lawyer} = useParams()
  const {data:lawyerDetails} = useLawyerDetailsQuery(lawyer)

  return (
    <div>
      <LawyerOverview lawyer={lawyerDetails?.data?.lawyer}></LawyerOverview>
      <Container>
        <div className="grid grid-cols-3 gap-6 my-8">
          <div className="col-span-2">
            <Expertise lawyer={lawyerDetails?.data?.lawyer}></Expertise>
            <ClientReviews></ClientReviews>
            <ClientReviews></ClientReviews>
          
          </div>
          <div className="col-span-1">
            <div className="sticky top-8">
              <ContactLawyer lawyer={lawyerDetails?.data?.lawyer}></ContactLawyer>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LawyerDetailsPage;
