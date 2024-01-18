import withTitle from '@/components/withTitle';
import useAdminOrders from '@/pages/admin/hooks/useAdminOrders';
import { GetAdminOrderResponse } from '@/pages/api/admin/order.page';
import { noop, withGoogleAuth } from '@/utils/authUtils';
import { simpleNumber } from '@/utils/numberUtils';
import { Item } from '@/utils/tsUtils';
import type { TableColumnProps, TableColumnsType } from 'antd';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const Table = dynamic(() => import('antd').then((mod) => mod.Table), { ssr: false });

const init = (): TableColumnProps<Item<GetAdminOrderResponse>> => ({ ellipsis: true, showSorterTooltip: false, filterSearch: true });

const AdminPage = () => {
  const { data: orders = [] } = useAdminOrders();

  const dollarSorter = (a: Item<GetAdminOrderResponse>, b: Item<GetAdminOrderResponse>) => Number(a.dollar) - Number(b.dollar);
  const dollarRender = (dollar: number) => simpleNumber(dollar);

  const winList = orders.map((order) => order.win).filter((win, index, self) => self.findIndex((w) => w === win) === index);
  const winFilterList = winList.map((win) => ({ text: win ? 'win' : 'lose', value: win! }));
  const onWinFilter = <T extends unknown>(value: T, record: Item<GetAdminOrderResponse>) => record.win === value;
  const winRender = (win: boolean) => (win ? '🟢' : '🔴');

  const emailList = orders.map((order) => order.user.email).filter((email, index, self) => self.findIndex((e) => e === email) === index);
  const emailFilterList = emailList.map((email) => ({ text: email, value: email }));
  const onEmailFilter = <T extends unknown>(value: T, record: Item<GetAdminOrderResponse>) => record.user.email === value;

  const nickList = orders.map((order) => order.user.nick).filter((nick, index, self) => self.findIndex((n) => n === nick) === index);
  const nickFilterList = nickList.map((nick) => ({ text: nick, value: nick }));
  const onNickFilter = <T extends unknown>(value: T, record: Item<GetAdminOrderResponse>) => record.user.nick === value;

  const columns: TableColumnsType<Item<GetAdminOrderResponse>> = [
    { ...init(), title: 'id', width: 100, dataIndex: 'id' },
    { ...init(), title: 'nick', width: 150, dataIndex: ['user', 'nick'], filters: nickFilterList, onFilter: onNickFilter },
    { ...init(), title: 'email', width: 200, dataIndex: ['user', 'email'], filters: emailFilterList, onFilter: onEmailFilter },
    { ...init(), title: 'dollar', width: 100, dataIndex: 'dollar', sorter: dollarSorter, render: dollarRender },
    { ...init(), title: 'win', width: 80, dataIndex: 'win', filters: winFilterList, onFilter: onWinFilter, render: winRender },
    { ...init(), title: 'createdAt', width: 300, dataIndex: 'createdAt', sorter: (a, b) => Number(a.createdAt) - Number(b.createdAt) },
    { ...init(), title: 'User createdAt', width: 300, dataIndex: ['user', 'createdAt'], sorter: (a, b) => Number(a) - Number(b) },
    { ...init(), title: 'User updatedAt', width: 300, dataIndex: ['user', 'updatedAt'], sorter: (a, b) => Number(a) - Number(b) },
  ];

  return (
    <Wrapper>
      <Row>
        <ItemWrapper>
          <ItemTitle>Total</ItemTitle>
          <ItemValue>{orders.length}</ItemValue>
        </ItemWrapper>
        <ItemWrapper>
          <ItemTitle>Win probable</ItemTitle>
          <ItemValue>{((orders.filter((order) => order.win).length / orders.length) * 100).toFixed(1)}%</ItemValue>
        </ItemWrapper>
      </Row>
      <Table
        rowKey="id"
        dataSource={orders}
        columns={columns as any}
        pagination={{ defaultPageSize: 20, showTotal: (total) => `Total ${total} items` }}
        scroll={{ y: 800 }}
        //
      />
    </Wrapper>
  );
};

export default withTitle('Admin')(AdminPage);

export const getServerSideProps = withGoogleAuth(noop, { onlyAdmin: true });

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem;

  & > * + * {
    margin-top: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  padding: 1rem 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * + * {
    margin-top: 0.5rem;
  }
`;

const ItemTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ItemValue = styled.div`
  font-size: 1.5rem;
`;
