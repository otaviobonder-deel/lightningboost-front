/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, useFormikContext, FieldProps } from "formik";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import * as Yup from "yup";
import { useQuery } from "../../hooks/useQuery";
import { IChartFormProps, IChartState } from "./interfaces";
import { Autocomplete } from "../Autocomplete";

const periodicity = [
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
];

const validationSchema = Yup.object().shape({
  periodicity: Yup.string()
    .oneOf(["daily", "monthly", "weekly", "once"], "Invalid periodicity")
    .defined("You must select a periodicity"),
  stock: Yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return Yup.object()
          .shape({
            value: Yup.string().defined(),
            label: Yup.string().defined(),
          })
          .typeError("You must select a stock")
          .defined();
      case "string":
        return Yup.string()
          .typeError("You must select a stock")
          .defined("You must select a stock");
      default:
        return Yup.mixed();
    }
  }),
  date: Yup.date()
    .min("2011-09-13", "Invalid minimum date")
    .max(dayjs().format("YYYY-MM-DD"), "Invalid maximum date")
    .defined("You must select a date"),
  investment: Yup.string().defined("You must select an amount"),
});

const DateField: React.FunctionComponent<FieldProps> = ({
  field: { name, value },
  ...rest
}) => {
  const { setFieldValue } = useFormikContext();
  const handleChange = (date: MaterialUiPickersDate) => {
    setFieldValue(name, date, true);
  };

  return (
    <KeyboardDatePicker
      onChange={(date) => handleChange(date)}
      value={value}
      {...rest}
    />
  );
};

export const ChartForm: React.FC<IChartFormProps> = ({ handleSimulate }) => {
  const qs = useQuery();

  const queryDate = (): Date => {
    const date = qs.get("date");
    if (date) {
      return dayjs(date).toDate();
    }
    return dayjs().subtract(1, "y").toDate();
  };

  const initialState: IChartState = {
    periodicity:
      (qs.get("periodicity") as "daily" | "weekly" | "monthly") || "monthly",
    stock: qs.get("stock") || "",
    date: queryDate(),
    investment: qs.get("investment") || "",
  };

  return (
    <Formik
      initialValues={initialState}
      onSubmit={async (values, { setSubmitting }) => {
        await handleSimulate(values);
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Field
                fullWidth
                name="periodicity"
                as={TextField}
                select
                label="Periodicity"
                error={!!(touched.periodicity && errors.periodicity)}
                helperText={touched.periodicity && errors.periodicity}
              >
                {periodicity.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                fullWidth
                name="date"
                component={DateField}
                label="Starting date"
                animateYearScrolling
                disableFuture
                format="MM/DD/YYYY"
                minDate={new Date("2011-09-13")}
                openTo="year"
                maxDate={dayjs().subtract(1, "d").toDate()}
                placeholder="MM/DD/YYYY"
                error={!!(touched.date && errors.date)}
                helperText={touched.date && errors.date}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                fullWidth
                name="stock"
                component={Autocomplete}
                url="/finance/stocksearch"
                param="keywords"
                label="Select the stock to compare"
                error={!!(touched.stock && errors.stock)}
                helperText={touched.stock && errors.stock}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Field
                fullWidth
                name="investment"
                as={TextField}
                label="Investment"
                type="number"
                error={!!(touched.investment && errors.investment)}
                helperText={touched.investment && errors.investment}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                color="primary"
                variant="outlined"
                type="submit"
                disabled={isSubmitting}
              >
                Simulate
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
