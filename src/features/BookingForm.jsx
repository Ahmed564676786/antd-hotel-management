import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Switch,
  Select,
  Spin,
  message,
} from "antd";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import { insertBooking } from "../services/apiBookings";
import dayjs from "dayjs";
import { useGetCabinPrice } from "./useGetCabinPrice";

const { RangePicker } = DatePicker;

function BookingForm({ booking, onSave }) {
  
  const [form] = Form.useForm();

  const cabinId = Form.useWatch("cabinId", form);

  const { data: cabinPrice, isLoading } = useGetCabinPrice(cabinId);



  /* =======================
     WATCHED FIELDS
  ======================= */
  const hasBreakfast = Form.useWatch("hasBreakfast", form);


  /* =======================
     FETCH CABINS
  ======================= */
  const { isLoading: cabinsLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  /* =======================
     INSERT BOOKING
  ======================= */
  const { isLoading: saving, mutate } = useMutation({
    mutationFn: insertBooking,
    onSuccess: () => {
      message.success("Booking saved successfully");
      onSave(); // invalidate + close drawer
    },
    onError: (err) => {
      message.error(err.message || "Failed to save booking");
    },
  });

  /* =======================
     SET FORM VALUES (EDIT)
  ======================= */
  useEffect(() => {
    if (!booking) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      ...booking,
      dates: [
        dayjs(booking.startDate),
        dayjs(booking.endDate),
      ],
    });
  }, [booking, form]);

  /* =======================
     AUTO PRICE CALCULATION
  ======================= */
  // useEffect(() => {
  

  //   if (!price) return;

  //   const extraPrice = hasBreakfast ? price || 0 : 0;
  //   const totalPrice = (price || 0) + extraPrice;

  //   form.setFieldsValue({
  //     cabinPrice: price,
  //     extraPrice,
  //     totalPrice,
  //   });
  // }, [cabins, cabinId, hasBreakfast, form]);



  useEffect(() => {
  if (!cabinPrice) return;

  const extraPrice = hasBreakfast ? 50 : 0;

  form.setFieldsValue({
    cabinPrice,
    extraPrice,
    totalPrice: cabinPrice + extraPrice,
  });
}, [cabinPrice, hasBreakfast, form]);

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const onFinish = (values) => {


    const { dates, ...bookingData } = values;

     const payload = {
      ...bookingData,
      startDate: values.dates[0].format("YYYY-MM-DD"),
      endDate: values.dates[1].format("YYYY-MM-DD"),
    };


    onSave(payload);


   
    // delete payload.dates;

    // // CREATE
    // if (!booking) {
    //   mutate(payload);
    //   return;
    // }

    // // EDIT (local update only for now)
    // onSave({ ...payload, id: booking.id });
  };

  if (cabinsLoading) return <Spin />;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
    >
      {/* CABIN */}
      <Form.Item
        name="cabinId"
        label="Cabin"
        rules={[{ required: true }]}
      >
        <Select
          placeholder="Select cabin"
          options={cabins.map((c) => ({
            value: c.id,
            label: `${c.name} ($${c.price})`,
          }))}

         
        />


      </Form.Item>

      {/* DATES */}
      <Form.Item
        name="dates"
        label="Dates"
        rules={[{ required: true }]}
      >
        <RangePicker className="w-full" />
      </Form.Item>

      {/* GUESTS */}
      <Form.Item
        name="numGuests"
        label="Guests"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      {/* CABIN PRICE */}
      <Form.Item name="cabinPrice" label="Cabin Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      {/* BREAKFAST */}
      <Form.Item
        name="hasBreakFast"
        label="Breakfast"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* EXTRA */}
      <Form.Item name="extraPrice" label="Extra Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      {/* TOTAL */}
      <Form.Item name="totalPrice" label="Total Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      {/* STATUS */}
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: "unconfirmed", label: "Unconfirmed" },
            { value: "checked-in", label: "Checked In" },
            { value: "checked-out", label: "Checked Out" },
          ]}
        />
      </Form.Item>

      {/* PAID */}
      <Form.Item
        name="isPaid"
        label="Paid"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {/* NOTES */}
      <Form.Item name="observations" label="Observations">
        <Input.TextArea rows={3} />
      </Form.Item>

      {/* SUBMIT */}
      <Button
        type="primary"
        htmlType="submit"
        loading={saving}
        block
      >
        {booking ? "Update Booking" : "Create Booking"}
      </Button>
    </Form>
  );
}

export default BookingForm;
