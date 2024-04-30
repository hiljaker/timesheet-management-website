"use client";

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { LabelInput, TextInput } from "@src/components/TextInput";
import { saveSuccess } from "@src/redux/slices/employee";
import { useDispatch, useSelector } from "@src/redux/store";
import axios from "@src/utils/axios";
import { useFormik } from "formik";
import React from "react";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
import * as Yup from "yup";
import _ from "lodash";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  rate: Yup.number().required("Rate wajib diisi"),
});

const SettingView = () => {
  const dispatch = useDispatch();
  const { employee, tokenChecked } = useSelector((state) => state.employee);

  const {
    values,
    getFieldProps,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      id: employee.id || 0,
      name: employee.name || "",
      rate: employee.rate || 0,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const { id, ...payload } = values;

        const { data } = await axios.post("/employee", payload);

        dispatch(saveSuccess(data.result.employee));
        localStorage.setItem("access-token", data.result.accessToken);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: data.message || "Berhasil menyimpan profil karyawan",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const sameValues = _.isEqual(employee, values);

  return (
    <Stack alignItems="center" justifyContent="start" pt={8}>
      <Stack
        width="400px"
        minHeight="285px"
        bgcolor="white"
        borderRadius="18px"
        boxShadow="0px 0px 4px 0px rgba(0,0,0,0.1)"
        justifyContent="center"
        px={6}
        spacing={2}
      >
        {!tokenChecked ? (
          <CircularProgress sx={{ alignSelf: "center" }} />
        ) : (
          <>
            <Stack>
              <LabelInput>Nama Karyawan</LabelInput>
              <TextInput
                {...getFieldProps("name")}
                size="small"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Stack>

            <Stack>
              <LabelInput>Rate</LabelInput>
              <NumericFormat
                {...getFieldProps("rate")}
                size="small"
                InputProps={{
                  startAdornment: (
                    <Typography
                      typography="caption1bold"
                      color="neutral400.main"
                    >
                      Rp
                    </Typography>
                  ),
                  endAdornment: (
                    <Typography
                      typography="caption2bold"
                      color="neutral400.main"
                    >
                      /Jam
                    </Typography>
                  ),
                }}
                customInput={TextInput}
                type="number"
                error={touched.rate && Boolean(errors.rate)}
                helperText={touched.rate && errors.rate}
              />
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                fullWidth
                variant="text"
                onClick={() => {
                  setFieldValue("name", employee.name);
                  setFieldValue("rate", employee.rate);
                }}
              >
                Batalkan
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                disabled={sameValues || isSubmitting}
              >
                Simpan
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default SettingView;
