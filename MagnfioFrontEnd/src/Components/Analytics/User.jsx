import React from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Meta } = Card;

export default function User() {
  return (
    <>
      <Card style={{ width: 300, marginTop: 16 }}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="baluram"
          description="10 times"
        />
      </Card>
    </>
  );
}
