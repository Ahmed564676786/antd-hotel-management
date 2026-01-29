// import {
//   Form,
//   Input,
//   InputNumber,
//   Button,
//   DatePicker,
//   Switch,
//   Select,
//   Spin,
// } from "antd";
// import { useEffect } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getCabins } from "../services/apiCabins";
// import { insertBooking } from "../services/apiBookings";

// const { RangePicker } = DatePicker;

// function BookingForm({ booking, onSave }) {
//   const [form] = Form.useForm();

//   const hasBreakfast = Form.useWatch("hasBreakfast", form);
//   const cabinId = Form.useWatch("cabinId", form);


//   const {isLoading:isBookingInserting,mutate:insertMutate} = useMutation({

//         mutationKey:['booking'],
//         mutationFn:insertBooking
//   })

//   // React Query to fetch cabins
//   const { isLoading, data: cabins } = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

//   // Auto update prices when cabin or breakfast changes
//   useEffect(() => {
//     if (!cabins || !cabinId) return;

//     const cabin = cabins.find((c) => c.id === cabinId);
//     if (!cabin) return;

//     const extraPrice = hasBreakfast ? cabin.breakfastPrice || 0 : 0;
//     const totalPrice = (cabin.price || 0) + extraPrice;

//     form.setFieldsValue({
//       cabinPrice: cabin.price,
//       extraPrice,
//       totalPrice,
//     });
//   }, [cabinId, hasBreakfast, cabins, form]);

//   const onFinish = (values) => {
//     const payload = {
//       ...values,
//       id: booking ? booking.id : Date.now(),
//       startDate: values.dates[0],
//       endDate: values.dates[1],
//     };

//     delete payload.dates;
//     onSave(payload);
//   };

//   if (isLoading) return <Spin />; // show loader while cabins load

//   return (
//     <Form
//       layout="vertical"
//       form={form}
//       onFinish={onFinish}
//       initialValues={
//         booking && {
//           ...booking,
//           dates: [booking.startDate, booking.endDate],
//         }
//       }
//     >
//       {/* CABIN COMBOBOX */}
//       <Form.Item
//         name="cabinId"
//         label="Cabin"
//         rules={[{ required: true }]}
//       >
//         <Select
//           showSearch
//           placeholder="Select cabin"
//           optionFilterProp="label"
//           options={cabins?.map((c) => ({
//             value: c.id,
//             label: `${c.name} ($${c.price})`,
//           })) || []} // fallback to empty array
//         />
//       </Form.Item>

//       <Form.Item name="dates" label="Dates" rules={[{ required: true }]}>
//         <RangePicker className="w-full" />
//       </Form.Item>

//       <Form.Item name="numGuests" label="Guests">
//         <InputNumber min={1} className="w-full" />
//       </Form.Item>

//       <Form.Item name="cabinPrice" label="Cabin Price">
//         <InputNumber disabled className="w-full" />
//       </Form.Item>

//       <Form.Item
//         name="hasBreakfast"
//         label="Breakfast"
//         valuePropName="checked"
//       >
//         <Switch />
//       </Form.Item>

//       <Form.Item name="extraPrice" label="Extra Price">
//         <InputNumber disabled className="w-full" />
//       </Form.Item>

//       <Form.Item name="totalPrice" label="Total Price">
//         <InputNumber disabled className="w-full" />
//       </Form.Item>

//       <Form.Item name="status" label="Status">
//         <Select
//           options={[
//             { value: "unconfirmed", label: "Unconfirmed" },
//             { value: "checked-in", label: "Checked In" },
//             { value: "checked-out", label: "Checked Out" },
//           ]}
//         />
//       </Form.Item>

//       <Form.Item name="isPaid" label="Paid" valuePropName="checked">
//         <Switch />
//       </Form.Item>

//       <Form.Item name="observations" label="Observations">
//         <Input.TextArea rows={3} />
//       </Form.Item>



//       <Button type="primary" htmlType="submit" block>
//         {booking ? "Update Booking" : "Create Booking"}
//       </Button>
//     </Form>
//   );
// }

// export default BookingForm;



import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Switch,
  Select,
  Spin,
} from "antd";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import { insertBooking } from "../services/apiBookings";

const { RangePicker } = DatePicker;

function BookingForm({ booking, onSave }) {
  const [form] = Form.useForm();

  const hasBreakfast = Form.useWatch("hasBreakfast", form);
  const cabinId = Form.useWatch("cabinId", form);

  /* =======================
     INSERT BOOKING
  ======================= */
  const { isLoading: isBookingInserting, mutate: insertMutate } =
    useMutation({
      mutationFn: insertBooking,
      onSuccess: (newBooking) => {
        onSave(newBooking);
      },
    });

  /* =======================
     FETCH CABINS
  ======================= */
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
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
     SUBMIT HANDLER
  ======================= */
  const onFinish = (values) => {
    const payload = {
      ...values,
      startDate: values.dates[0],
      endDate: values.dates[1],
    };

    delete payload.dates;

    // ✅ CREATE
    if (!booking) {
      insertMutate(payload);
      // alert('Hi');
      return;
    }

    // ✅ UPDATE (local)
    onSave({ ...payload, id: booking.id });
  };

  if (isLoading) return <Spin />;

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
      {/* CABIN */}
      <Form.Item
        name="cabinId"
        label="Cabin"
        rules={[{ required: true }]}
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

      <Form.Item name="dates" label="Dates" rules={[{ required: true }]}>
        <RangePicker className="w-full" />
      </Form.Item>

      <Form.Item name="numGuests" label="Guests">
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      <Form.Item name="cabinPrice" label="Cabin Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      <Form.Item
        name="hasBreakfast"
        label="Breakfast"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item name="extraPrice" label="Extra Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      <Form.Item name="totalPrice" label="Total Price">
        <InputNumber disabled className="w-full" />
      </Form.Item>

      <Form.Item name="status" label="Status">
        <Select
          options={[
            { value: "unconfirmed", label: "Unconfirmed" },
            { value: "checked-in", label: "Checked In" },
            { value: "checked-out", label: "Checked Out" },
          ]}
        />
      </Form.Item>

      <Form.Item name="isPaid" label="Paid" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="observations" label="Observations">
        <Input.TextArea rows={3} />
      </Form.Item>

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
