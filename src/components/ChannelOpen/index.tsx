/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Formik, Form, Field, useFormikContext, FieldProps } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Slider as MuiSlider,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import Currency from "../../utils/Currency";
import api from "../../services/api";
import { openSnackbar } from "../../actions/snackbarActions";
import { IForm, IChannelResponse, ISliderProps, IProps } from "./interfaces";

const initialValues: IForm = {
  publicKey: "",
  socket: "",
  tokens: 0,
  private: false,
};

const validationSchema = Yup.object().shape({
  publicKey: Yup.string().defined("You need to fill you node's public id"),
  socket: Yup.string().defined(
    "You need to fill your node's IP or onion address"
  ),
  tokens: Yup.number()
    .max(500000, "The maximum amount is 500,000 sats")
    .min(10000, "The minimum amount is 10,000 sats"),
  private: Yup.boolean(),
});

const Slider: React.FunctionComponent<ISliderProps & FieldProps> = ({
  field: { name, value },
  label,
  valueLabel,
  error,
  helperText,
  ...rest
}) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number | number[]
  ) => {
    if (name) {
      setFieldValue(name, newValue, true);
    }
  };

  return (
    <Grid container spacing={1}>
      {label && (
        <Grid item xs={12}>
          <Typography>{label}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <MuiSlider name={name} onChange={handleChange} {...rest} />
        {error && (
          <Typography
            color="error"
            style={{ fontSize: "0.75rem", lineHeight: 1.66 }}
          >
            {helperText}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography align="right">
          {Currency(value, { precision: 0 }).format()} {valueLabel}
        </Typography>
      </Grid>
    </Grid>
  );
};

export const ChannelOpen: React.FC<IProps> = ({ walletBalance }) => {
  const dispatch = useDispatch();

  const handleOpenChannel = async ({
    values,
  }: {
    values: IForm;
  }): Promise<void> => {
    try {
      const { data } = await api.post<IChannelResponse>(
        "/lightning/openchannel",
        {
          tokens: values.tokens,
          is_private: values.private,
          public_key: values.publicKey,
          socket: values.socket,
        }
      );
      dispatch(
        openSnackbar({
          message: `Channel opened! Funding TXID: ${data.transactionId}`,
          status: "success",
        })
      );
    } catch (e) {
      dispatch(
        openSnackbar({ message: "Failed to open the channel", status: "error" })
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await handleOpenChannel({ values });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="publicKey"
                label="Your node's public key"
                as={TextField}
                fullWidth
                placeholder="02a4ee943caeb847398960230bccc19937dd04834e768472b711a4ce0e2c77cd98"
                error={!!(touched.publicKey && errors.publicKey)}
                helperText={touched.publicKey && errors.publicKey}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="socket"
                label="Your IP and port or onion and port"
                as={TextField}
                fullWidth
                placeholder="g4xc7yl2shtllx564dv7wqelnqh2gjco6k5vd77upz3rgzozugpkmkad.onion:9735"
                error={!!(touched.socket && errors.socket)}
                helperText={touched.socket && errors.socket}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="tokens"
                label="Amount"
                component={Slider}
                min={10000}
                max={walletBalance > 500000 ? 500000 : walletBalance}
                step={10000}
                valueLabel="sats"
                error={!!(touched.tokens && errors.tokens)}
                helperText={touched.tokens && errors.tokens}
              />
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Typography>Make this channel private</Typography>
              </Grid>
              <Grid item xs={6} container justify="flex-end">
                <Field name="private" as={Switch} color="primary" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                disabled={isSubmitting}
              >
                Open channel
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
