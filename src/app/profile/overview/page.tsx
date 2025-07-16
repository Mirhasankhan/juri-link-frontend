import Sidebar from "@/components/profile/Sidebar";
import Container from "@/utils/Container";
import ProfileUpdate from "@/components/profile/ProfileIUpdate";
import UpdateImage from "@/components/profile/UpdateImage";

const OverViewPage = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-6">
        <div className="hidden md:block md:col-span-1 border-r-2">
          <Sidebar></Sidebar>
        </div>
        <div className="col-span-4 md:col-span-3 my-6">
          <div className="grid grid-cols-5 gap-10">
            <div className="col-span-5 md:col-span-2">
              <UpdateImage></UpdateImage>
            </div>
            <div className="col-span-5 md:col-span-3">
              <div>
                <h1 className="font-medium">Profile Information</h1>
                <ProfileUpdate></ProfileUpdate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OverViewPage;
