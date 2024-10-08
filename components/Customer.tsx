import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import PersonIcon from "@mui/icons-material/Person";
import { Customer } from "../pages/customers";
import { Grid } from "@mui/material";
import Link from "next/link";

const CustomerComponent = ({ customer }: { customer: Customer }) => {
  return (
    <Grid item style={{ marginBottom: 40 }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Tooltip title={customer._id?.toString()}>
          <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
        </Tooltip>
        {customer.name}
      </span>
      <p>{customer.industry}</p>
      <Link
        href={{
          pathname: "/orders",
          query: {
            customerId: customer._id?.toString(),
          },
        }}
      >
        <Button variant="contained">View Orders</Button>
      </Link>
    </Grid>
  );
};

export default CustomerComponent;
