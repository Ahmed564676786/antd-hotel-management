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

const { RangePicker } = DatePicker;

function BookingForm({ booking, onSave }) {
  const [form] = Form.useForm();

  // Watch these for auto price calculation
  const hasBreakfast = Form.useWatch("hasBreakfast", form);
  const cabinId = Form.useWatch("cabinId", form);

  /* =======================
     FETCH CABINS
  ======================= */
  const { isLoading: isCabinsLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  /* =======================
     INSERT BOOKING MUTATION
  ======================= */
  const { isLoading: isBookingInserting, mutate: insertMutate } = useMutation({
    mutationFn: insertBooking,
    onSuccess: (newBooking) => {
      message.success("Booking saved successfully!");
      onSave(newBooking); // pass inserted data to parent
    },
    onError: (error) => {
      console.error("Booking insert failed:", error);
      message.error(error.message || "Failed to save booking");
    },
  });

  /* =======================
     AUTO PRICE CALCULATION
  ======================= */
  useEffect(() => {
    if (!cabins || !cabinId) return;

    const cabin = cabins.find((c) => c.id === cabinId);
    if (!cabin) return;

    const extraPrice = hasBreakfast ? cabin.breakfastPrice || 0 : 0;
    const totalPrice = (cabin.price || 0) + extraPrice;

    form.setFieldsValue({
      cabinPrice: cabin.price,
      extraPrice,
      totalPrice,
    });
  }, [cabinId, hasBreakfast, cabins, form]);

  /* =======================
     FORM SUBMIT HANDLER
  ======================= */
  const onFinish = (values) => {
    if (!values.dates || values.dates.length !== 2) {
      message.error("Please select start and end dates");
      return;
    }

    const payload = {
      ...values,
      startDate: values.dates[0].format("YYYY-MM-DD"),
      endDate: values.dates[1].format("YYYY-MM-DD"),
    };

    delete payload.dates;

    // If creating a new booking
    if (!booking) {
      insertMutate(payload);
      return;
    }

    // If updating an existing booking locally
    onSave({ ...payload, id: booking.id });
  };

  if (isCabinsLoading) return <Spin size="large" />;

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={
        booking && {
          ...booking,
          dates: [booking.startDate, booking.endDate],
        }
      }
    >
      {/* CABIN SELECT */}
      <Form.Item
        name="cabinId"
        label="Cabin"
        rules={[{ required: true, message: "Please select a cabin" }]}
      >
        <Select
          showSearch
          placeholder="Select cabin"
          optionFilterProp="label"
          options={
            cabins?.map((c) => ({
              value: c.id,
              label: `${c.name} ($${c.price})`,
            })) || []
          }
        />
      </Form.Item>

      {/* DATE RANGE */}
      <Form.Item
        name="dates"
        label="Dates"
        rules={[{ required: true, message: "Please select booking dates" }]}
      >
        <RangePicker className="w-full" />
      </Form.Item>

      {/* NUMBER OF GUESTS */}
      <Form.Item name="numGuests" label="Guests" rules={[{ required: true }]}>
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

      {/* EXTRA PRICE */}
      <Form.Item name="extraPrice" label="Extra Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      {/* TOTAL PRICE */}
      <Form.Item name="totalPrice" label="Total Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      {/* STATUS */}
      <Form.Item name="status" label="Status" rules={[{ required: true }]}>
        <Select
          options={[
            { value: "unconfirmed", label: "Unconfirmed" },
            { value: "checked-in", label: "Checked In" },
            { value: "checked-out", label: "Checked Out" },
          ]}
        />
      </Form.Item>

      {/* PAID */}
      <Form.Item name="isPaid" label="Paid" valuePropName="checked">
        <Switch />
      </Form.Item>

      {/* OBSERVATIONS */}
      <Form.Item name="observations" label="Observations">
        <Input.TextArea rows={3} />
      </Form.Item>

      {/* SUBMIT BUTTON */}
      <Button
        type="primary"
        htmlType="submit"
        block
        loading={isBookingInserting}
      >
        {booking ? "Update Booking" : "Create Booking"}
      </Button>
    </Form>
  );
}

export default BookingForm;
