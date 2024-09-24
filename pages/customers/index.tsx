import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import axios from "axios";

type Customer = {
  id: number;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const result = await axios.get<{
    customers: Customer[];
  }>("http://localhost:8000/api/customers/");
  console.log(result.data.customers);

  return {
    props: {
      customers: result.data.customers,
    },
  };
};

const Customers: NextPage = ({
  customers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Customers</h1>
      {customers.map((customer: Customer) => {
        return (
          <div key={customer.id}>
            <p>{customer.name}</p>
            <p>{customer.industry}</p>
            <p>{customer.id}</p>
          </div>
        );
      })}
    </>
  );
};

export default Customers;
