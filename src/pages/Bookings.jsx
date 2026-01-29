// import { useState } from "react";
// import {
//   Button,
//   Table,
//   Space,
//   DatePicker,
//   Drawer,
//   Popconfirm,
//   Tag,
//   Tooltip,
//   Spin,
// } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import BookingForm from "../features/BookingForm";
// import dayjs from "dayjs";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getCabins } from "../services/apiCabins";
// import { getBookings,deleteBooking } from "../services/apiBookings";

// const { RangePicker } = DatePicker;

// function Bookings() {
//   const queryClient = useQueryClient();

//   // Fetch cabins
//   const { isLoading: loadingCabins, data: cabins } = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

//   // Fetch bookings
//   const { isLoading: loadingBookings, data: bookingsData } = useQuery({
//     queryKey: ["bookings"],
//     queryFn: getBookings,
//   });


//   const {isLoading:isDelete,mutate} = useMutation({

//         mutationKey:['bookings'],
//         mutationFn:deleteBooking

//   });


//   const [filtered, setFiltered] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [editingBooking, setEditingBooking] = useState(null);

//   const handleSave = (booking) => {
//     let updated = [];
//     if (editingBooking) {
//       updated = bookingsData.map((b) => (b.id === booking.id ? booking : b));
//     } else {
//       updated = [...(bookingsData || []), booking];
//     }

//     // Update React Query cache
//     queryClient.setQueryData(["bookings"], updated);

//     setFiltered([]);
//     setOpen(false);
//     setEditingBooking(null);
//   };

//   const handleDelete = (id) => {
//     // const updated = bookingsData.filter((b) => b.id !== id);

//     mutate(id);

//     alert('hi');
//     // queryClient.setQueryData(["bookings"], updated);
//   };

//   const handleFilter = (dates) => {
//     if (!dates || !bookingsData) {
//       setFiltered([]);
//       return;
//     }
//     const [start, end] = dates;

//     setFiltered(
//       bookingsData.filter(
//         (b) =>
//           dayjs(b.startDate).isAfter(start, "day") &&
//           dayjs(b.endDate).isBefore(end, "day")
//       )
//     );
//   };

//   const columns = [
//     {
//       title: "Cabin",
//       dataIndex: "cabinId",
//       render: (id) =>
//         cabins?.find((c) => c.id === id)?.name || "—",
//     },
//     {
//       title: "Dates",
//       dataIndex: "dates",
//       render: (_, record) =>
//         `${dayjs(record.startDate).format("DD MMM YYYY")} → ${dayjs(
//           record.endDate
//         ).format("DD MMM YYYY")}`,
//     },
//     { title: "Guests", dataIndex: "numGuests" },
//     { title: "Cabin Price", dataIndex: "cabinPrice", render: (v) => `$${v}` },
//     { title: "Extra Price", dataIndex: "extraPrice", render: (v) => `$${v}` },
//     {
//       title: "Total Price",
//       dataIndex: "totalPrice",
//       render: (v) => <b>${v}</b>,
//     },
//     {
//       title: "Breakfast",
//       dataIndex: "hasBreakfast",
//       render: (v) => (v ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>),
//     },
//     {
//       title: "Paid",
//       dataIndex: "isPaid",
//       render: (v) =>
//         v ? <Tag color="green">Paid</Tag> : <Tag color="red">Unpaid</Tag>,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       render: (s) => {
//         const color =
//           s === "checked-in"
//             ? "green"
//             : s === "checked-out"
//             ? "default"
//             : "blue";
//         return <Tag color={color}>{s}</Tag>;
//       },
//     },
//     {
//       title: "Observations",
//       dataIndex: "observations",
//       ellipsis: true,
//     },
//     {
//       title: "Actions",
//       fixed: "right",
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="Edit booking">
//             <Button
//               type="text"
//               icon={<EditOutlined />}
//               onClick={() => {
//                 setEditingBooking(record);
//                 setOpen(true);
//               }}
//             />
//           </Tooltip>

//           <Popconfirm
//             title="Delete booking?"
//             onConfirm={() => handleDelete(2)}
//           >
//             <Tooltip title="Delete booking">
//               <Button type="text" danger icon={<DeleteOutlined />} />
//             </Tooltip>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   if (loadingCabins || loadingBookings) return <Spin tip="Loading..." />;

//   return (
//     <>
//       <Space style={{ marginBottom: 16 }}>
//         <RangePicker onChange={handleFilter} />
//         <Button type="primary" onClick={() => setOpen(true)}>
//           New Booking
//         </Button>
//       </Space>

//       <Table
//         rowKey="id"
//         columns={columns}
//         dataSource={filtered.length ? filtered : bookingsData || []}
//         scroll={{ x: 1400 }}
//       />

//       <Drawer
//         title={editingBooking ? "Edit Booking" : "New Booking"}
//         open={open}
//         onClose={() => {
//           setOpen(false);
//           setEditingBooking(null);
//         }}
//         width={450}
//         destroyOnClose
//       >
//         <BookingForm booking={editingBooking} onSave={handleSave} />
//       </Drawer>
//     </>
//   );
// }

// export default Bookings;




import { useState } from "react";
import {
  Button,
  Table,
  Space,
  DatePicker,
  Drawer,
  Popconfirm,
  Tag,
  Tooltip,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import BookingForm from "../features/BookingForm";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import { getBookings, deleteBooking } from "../services/apiBookings";

const { RangePicker } = DatePicker;

function Bookings() {
  const queryClient = useQueryClient();

  /* =======================
     FETCH CABINS
  ======================= */
  const { isLoading: loadingCabins, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  /* =======================
     FETCH BOOKINGS
  ======================= */
  const { isLoading: loadingBookings, data: bookingsData } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  /* =======================
     DELETE BOOKING
  ======================= */
  const { isLoading: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });

  /* =======================
     LOCAL STATE
  ======================= */
  const [filtered, setFiltered] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  /* =======================
     SAVE (CREATE / EDIT)
  ======================= */
  const handleSave = (booking) => {
    let updated;

    if (editingBooking) {
      updated = bookingsData.map((b) =>
        b.id === booking.id ? booking : b
      );
    } else {
      updated = [...(bookingsData || []), booking];
    }

    queryClient.setQueryData(["bookings"], updated);

    setFiltered([]);
    setOpen(false);
    setEditingBooking(null);
  };

  /* =======================
     DELETE HANDLER
  ======================= */
  const handleDelete = (id) => {
    deleteMutate(id);
  };

  /* =======================
     DATE FILTER
  ======================= */
  const handleFilter = (dates) => {
    if (!dates || !bookingsData) {
      setFiltered([]);
      return;
    }

    const [start, end] = dates;

    setFiltered(
      bookingsData.filter(
        (b) =>
          dayjs(b.startDate).isAfter(start, "day") &&
          dayjs(b.endDate).isBefore(end, "day")
      )
    );
  };

  /* =======================
     TABLE COLUMNS
  ======================= */
  const columns = [
    {
      title: "Cabin",
      dataIndex: "cabinId",
      render: (id) =>
        cabins?.find((c) => c.id === id)?.name || "—",
    },
    {
      title: "Dates",
      render: (_, record) =>
        `${dayjs(record.startDate).format("DD MMM YYYY")} → ${dayjs(
          record.endDate
        ).format("DD MMM YYYY")}`,
    },
    { title: "Guests", dataIndex: "numGuests" },
    {
      title: "Cabin Price",
      dataIndex: "cabinPrice",
      render: (v) => `$${v}`,
    },
    {
      title: "Extra Price",
      dataIndex: "extraPrice",
      render: (v) => `$${v}`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (v) => <b>${v}</b>,
    },
    {
      title: "Breakfast",
      dataIndex: "hasBreakfast",
      render: (v) =>
        v ? <Tag color="green">Yes</Tag> : <Tag>No</Tag>,
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      render: (v) =>
        v ? (
          <Tag color="green">Paid</Tag>
        ) : (
          <Tag color="red">Unpaid</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => {
        const color =
          s === "checked-in"
            ? "green"
            : s === "checked-out"
            ? "default"
            : "blue";

        return <Tag color={color}>{s}</Tag>;
      },
    },
    {
      title: "Observations",
      dataIndex: "observations",
      ellipsis: true,
    },
    {
      title: "Actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit booking">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingBooking(record);
                setOpen(true);
              }}
            />
          </Tooltip>

          <Popconfirm
            title="Delete booking?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Tooltip title="Delete booking">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                loading={isDeleting}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /* =======================
     LOADING STATE
  ======================= */
  if (loadingCabins || loadingBookings) {
    return <Spin tip="Loading..." />;
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <RangePicker onChange={handleFilter} />
        <Button type="primary" onClick={() => setOpen(true)}>
          New Booking
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filtered.length ? filtered : bookingsData || []}
        scroll={{ x: 1400 }}
      />

      <Drawer
        title={editingBooking ? "Edit Booking" : "New Booking"}
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingBooking(null);
        }}
        width={450}
        destroyOnClose
      >
        <BookingForm booking={editingBooking} onSave={handleSave} />
      </Drawer>
    </>
  );
}

export default Bookings;
