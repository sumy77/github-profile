import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../components/Home';

const mockFetch = jest.fn();
(globalThis as unknown as Window).fetch = mockFetch;

describe('Home Component', () => {
  it('renders the search input and button', () => {
    render(<Home selectedIndex={0} />);
    expect(screen.getByPlaceholderText('Enter a username...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('displays no results found when there are no search results', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total_count: 0,
        items: [],
      }),
    });
    render(<Home selectedIndex={0} />);
    const searchInput = screen.getByPlaceholderText('Enter a username...');
    fireEvent.change(searchInput, { target: { value: 's045s' } });
    fireEvent.click(screen.getByText('Search'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('displays search results when a valid username is entered', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        total_count: 1,
        items: [
          {
            login: 'sumit-sharma7',
            avatar_url: 'https://avatar.png',
          },
        ],
      }),
    });

    render(<Home selectedIndex={0} />);
    const searchInput = screen.getByPlaceholderText('Enter a username...');
    fireEvent.change(searchInput, { target: { value: 'sumit-sharma7' } });
    fireEvent.click(screen.getByText('Search'));
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Search Results')).toBeInTheDocument();
      expect(screen.getByText('sumit-sharma7')).toBeInTheDocument();
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
