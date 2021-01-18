/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useMemo, useState } from "react";
import pDebounce from "p-debounce";
import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { FieldProps, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { openSnackbar } from "../../actions/snackbarActions";

interface IProps {
  url: string;
  param: string;
  label?: string;
}

interface IApiResponse {
  value: string;
  label: string;
}

export const Autocomplete: React.FC<IProps & FieldProps> = ({
  url,
  param,
  label,
  field: { value, name },
  form: { errors, touched },
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<IApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { setFieldValue } = useFormikContext();

  const handleChange = (event: any, newValue: IApiResponse) => {
    setOptions(newValue ? [newValue, ...options] : options);
    setFieldValue(name, newValue, true);
  };

  const throttledRequest = useMemo(
    () =>
      pDebounce(async ({ input, active }) => {
        try {
          setLoading(true);
          const response = await api.get<IApiResponse[]>(
            `${url}?${param}=${input}`
          );
          if (active) {
            let newOptions = [] as IApiResponse[];
            if (value) {
              newOptions = [value];
            }
            if (response.data.length > 0) {
              newOptions = [...newOptions, ...response.data];
            }
            setOptions(newOptions);
          }
          setLoading(false);
        } catch (e) {
          setLoading(false);
          dispatch(openSnackbar({ message: "Error loading", status: "error" }));
        }
      }, 500),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    throttledRequest({ input: inputValue, active });

    return () => {
      active = false;
    };
  }, [value, inputValue]);

  return (
    <MuiAutocomplete
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          error={!!(touched[name] && errors[name])}
          helperText={touched[name] && errors[name]}
        />
      )}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      options={options}
      value={value}
      onChange={handleChange}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      loading={loading}
    />
  );
};
