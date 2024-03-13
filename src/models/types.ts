export type GitUser = {
  login: string;
  node_id: string;
  id: number;
  avatar_url: string;
  url: string;
};

export type UserObj = {
  query: string;
  result: GitUser | null;
};

export type GitResult = {
  total_count: number;
  incomplete_results: boolean;
  items: GitUser[];
};

export type TabProps = {
  selectedIndex: number;
};
