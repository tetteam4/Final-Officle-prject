// pages/services/[id].js
import { useRouter } from "next/router";
import { fetchServiceById } from "../../utils/api";

const ServiceDetails = ({ service }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const service = await fetchServiceById(params.id);
  return { props: { service } };
}

export default ServiceDetails;
