"use client"

import { useParams } from "next/navigation";

const ServiceDetailsPage = () => {
     const {serviceId} = useParams()
     console.log(serviceId);
    return (
        <div>
            <h1>{serviceId}</h1>
        </div>
    );
};

export default ServiceDetailsPage;