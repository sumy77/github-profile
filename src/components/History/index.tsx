import { Button, Table } from 'evergreen-ui';
import { getItem, removeItem } from '../../utils/storage';
import { useEffect, useState } from 'react';
import { TabProps, UserObj } from '../../models/types';
import UserRow from './UserRow';

function History({ selectedIndex }: TabProps) {
  const [users, setUsers] = useState<UserObj[] | null>(null);

  useEffect(() => {
    const results = getItem('users');
    setUsers(results);
  }, [selectedIndex]);

  const handleClearHistory = () => {
    removeItem('users');
    setUsers(null);
  };

  let userRow;
  if (users?.length) {
    {
      userRow = users?.map((profile, index) => {
        if (profile.result?.id) {
          return <UserRow {...profile} key={profile.result.id + index} />;
        } else {
          return (
            <Table.Row key={index} height="auto">
              <Table.TextCell>{profile.query}</Table.TextCell>
              <Table.TextCell>
                <p className="label-txt">Search result not found</p>
              </Table.TextCell>
              <Table.TextCell></Table.TextCell>
            </Table.Row>
          );
        }
      });
    }
  } else {
    userRow = (
      <Table.Row key={0} height="auto">
        <Table.TextCell padding={10}>No records found</Table.TextCell>
      </Table.Row>
    );
  }
  return (
    <div className="history-container">
      <legend className="text-center mb-15">Your Search History</legend>
      <section className="history-wrapper">
        <Table>
          <Table.Head>
            <Table.TextHeaderCell>Search Term</Table.TextHeaderCell>
            <Table.TextHeaderCell>Search Results</Table.TextHeaderCell>
            <Table.TextHeaderCell></Table.TextHeaderCell>
          </Table.Head>
          <Table.Body height={240}>{userRow}</Table.Body>
        </Table>
      </section>
      <div className="clear-history text-center">
        <Button appearance="primary" intent="success" onClick={handleClearHistory}>
          Clear Search History
        </Button>
      </div>
    </div>
  );
}

export default History;
