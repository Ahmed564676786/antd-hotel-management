import React from 'react';
import { Card, Row, Col, Table, Statistic } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const occupancyData = [
  { month: 'Jan', occupancy: 80 },
  { month: 'Feb', occupancy: 75 },
  { month: 'Mar', occupancy: 90 },
  { month: 'Apr', occupancy: 85 },
  { month: 'May', occupancy: 95 },
];

const revenueData = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 16000 },
  { month: 'May', revenue: 20000 },
];

const recentBookings = [
  { key: '1', guest: 'John Doe', room: '101', checkin: '2026-01-20', checkout: '2026-01-23' },
  { key: '2', guest: 'Alice Smith', room: '102', checkin: '2026-01-21', checkout: '2026-01-24' },
  { key: '3', guest: 'Bob Johnson', room: '103', checkin: '2026-01-22', checkout: '2026-01-25' },
];

const columns = [
  { title: 'Guest Name', dataIndex: 'guest', key: 'guest' },
  { title: 'Room', dataIndex: 'room', key: 'room' },
  { title: 'Check-in', dataIndex: 'checkin', key: 'checkin' },
  { title: 'Check-out', dataIndex: 'checkout', key: 'checkout' },
];

const Dashboard = () => {
  return (
    <div>
      <h2>Hotel Management Dashboard</h2>

      {/* Top Stats */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Rooms" value={120} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Available Rooms" value={45} Style={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Booked Rooms" value={75} Style={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Card title="Occupancy Rate">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={occupancyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="occupancy" stroke="#1890ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Monthly Revenue">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings Table */}
      <Card title="Recent Bookings">
        <Table columns={columns} dataSource={recentBookings} pagination={false} />
      </Card>
    </div>
  );
};

export default Dashboard;
