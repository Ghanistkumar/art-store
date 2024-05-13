"use client";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField";
import Image from "next/image";

interface FormField<T> {
  value: T;
}

interface FormData {
  name: FormField<string>;
  phone: FormField<string>;
  email: FormField<string>;
  description: FormField<string>;
  date: FormField<string>;
}

const DEFAULT_FORM_STATE: FormData = {
  name: { value: "" },
  phone: { value: "" },
  email: { value: "" },
  description: { value: "" },
  date: { value: "" },
};

export default function Page() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_STATE);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: { value: value.trim() },
    });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setFormData({
      ...formData,
      date: {
        value: date ? date.format("DD/MM/YYYY") : "",
      },
    });
  };

  return (
    <div className="bg-[#F1F9F9] min-h-screen">
      <span className="flex justify-center pt-5 text-4xl font-bold text-[#FFA5A5] drop-shadow-md">
        Wall Art Appointment Form
      </span>
      <div className="flex flex-col md:flex-row justify-center items-stretch m-4 md:m-16">
        <div className="flex-1 bg-[#AAC4FF] rounded-l-3xl md:rounded-bl-3xl md:rounded-l-3xl">
          <h1 className="text-center p-8 text-xl font-semibold text-[#3a3d41]">
            Book an Appointment with us!
          </h1>
          <Image
            src="/image/appointment.svg"
            height={550}
            width={550}
            alt="app"
            className="object-contain"
          />
        </div>
        <div className="flex-1 p-6 flex flex-col bg-[#EEF1FF] rounded-r-3xl md:rounded-br-3xl rounded-b-3xl md:rounded-b-none gap-4">
          <TextField
            autoFocus
            label="Name"
            type="text"
            variant="outlined"
            value={formData.name.value}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Email Address"
            type="email"
            variant="outlined"
            value={formData.email.value}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            value={formData.phone.value}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mb-4"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(formData.date.value, "DD/MM/YYYY")}
              onChange={handleDateChange}
              renderInput={(
                params: React.JSX.IntrinsicAttributes & {
                  variant?: TextFieldVariants | undefined;
                } & Omit<
                    | FilledTextFieldProps
                    | OutlinedTextFieldProps
                    | StandardTextFieldProps,
                    "variant"
                  >
              ) => (
                <TextField {...params} label="Select Date" className="mb-4" />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Description"
            type="text"
            multiline
            maxRows={4}
            variant="outlined"
            value={formData.description.value}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="mb-4"
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#D2DAFF",
            }}
            onClick={() => console.log("Form Data", formData)}
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}
