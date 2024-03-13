import { Avatar, Button, SearchInput } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { GitResult, GitUser, TabProps } from '../../models/types';
import { getItem, setItem } from '../../utils/storage';

function Home({ selectedIndex }: TabProps) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GitResult | null>(null);
  const [profile, setProfile] = useState<GitUser | null>(null);

  const searchProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (username.trim() === '') {
        return false;
      }
      const res = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await res?.json();
      setData(data);
      if (data?.total_count > 0) {
        setProfile(data?.items[0]);
      } else {
        setProfile(null);
      }
      const users = getItem('users');
      users.push({
        query: username,
        result: data?.items[0] || {},
      });
      setItem('users', users);
      setUsername('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(null);
    setProfile(null);
  }, [selectedIndex]);

  return (
    <>
      <div className="git-form">
        <legend className="text-center mb-15">Search Github Profile</legend>
        <form onSubmit={searchProfile}>
          <SearchInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter a username..."
            required
            width={'100%'}
          />
          <Button
            marginTop={25}
            appearance="primary"
            intent="success"
            isLoading={loading}
            disabled={loading}
            className="full-width"
          >
            <strong>Search</strong>
          </Button>
        </form>
      </div>
      {data?.total_count === 0 && <p className="label-txt">No results found</p>}
      {profile?.login && (
        <>
          <p className="label-txt mb-5">Search Results</p>
          <div className="user-results">
            <div className="user-img">
              <p className="label-txt">User Image</p>
              <Avatar src={profile?.avatar_url} name={profile?.login} size={40} />
            </div>
            <div className="userName">
              <p className="label-txt">Github User Name</p>
              <p>{profile.login}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
