import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Customer } from "./index";
//Error : Import 'Customer' conflicts with local value, so must be declared with a type-only import when 'isolatedModules' is enabled.
//Rename last default export to fix this
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

type Props = {
  customer: Customer;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await axios.get("http://localhost:8000/api/customers/");
  const paths = result.data.customers.map((customer: Customer) => {
    return {
      params: { id: customer.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;

  const result = await axios.get<{ customer: Customer }>(
    `http://localhost:8000/api/customers/${params.id}`
  );
  console.log(result);
  return {
    props: {
      customer: result.data.customer,
    },
  };
};

const Customer: NextPage<Props> = (props) => {
  return <h1>Customer {props.customer.name}</h1>;
};

export default Customer;
