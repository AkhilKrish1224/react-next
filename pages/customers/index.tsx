import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import axios from "axios";
import { ObjectId } from "mongodb";
//import clientPromise from "../../lib/mongodb";
import { getCustomers } from "../api/customers";
import { useQuery } from "@tanstack/react-query";

import CustomerComponent from "../../components/Customer";

export type Customer = {
  _id?: ObjectId;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCustomers();

  console.log("!!!", data);

  //   const result = await axios.get<{
  //     customers: Customer[];
  //   }>("http://localhost:8000/api/customers/");
  //   console.log(result.data.customers);

  return {
    props: {
      customers: data,
    },
    revalidate: 60,
  };
};

const Customers: NextPage = ({
  customers: c,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: { data: { customers = c } = {} } = {} } = useQuery({
    queryKey: ["customers"],
    queryFn: () => {
      return axios("/api/customers");
    },
    // initialData: {
    //   data: {
    //     customers: customers,
    //   },
    // },
  });

  console.log(customers, c);

  return (
    <>
      <h1>Customers</h1>
      {customers.map((customer: Customer) => {
        return <CustomerComponent customer={customer} />;
      })}
    </>
  );
};

export default Customers;
