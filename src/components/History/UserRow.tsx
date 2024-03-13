import { Avatar, Table } from 'evergreen-ui';
import { UserObj } from '../../models/types';

function UserRow(props: UserObj) {
  return (
    <Table.Row key={props.result?.id} height="auto">
      <Table.TextCell>{props.query}</Table.TextCell>
      <Table.TextCell>
        <div className="user-card">
          <div className="user-img">
            <p className="label-txt">User Image</p>
            <Avatar src={props.result?.avatar_url} name={props.result?.login} size={40} />
          </div>
        </div>
      </Table.TextCell>
      <Table.TextCell>
        <div className="userName">
          <p className="label-txt">Github User Name</p>
          <p>{props.result?.login}</p>
        </div>
      </Table.TextCell>
    </Table.Row>
  );
}

export default UserRow;
