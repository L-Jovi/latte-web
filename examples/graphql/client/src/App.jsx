import { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
const FEED = gql`
  query Feed($filter: String!, $skip: Int!) {
    feed(filter: $filter, skip: $skip, take: 3) {
      count
      links {
        id
        url
        description
        votes {
          id
        }
        postedBy {
          name
        }
      }
    }
  }
`;
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        name
      }
    }
  }
`;
const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        name
      }
    }
  }
`;
const POST = gql`
  mutation Post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
    }
  }
`;
const VOTE = gql`
  mutation Vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }
`;
const NEW_LINK = gql`
  subscription {
    newLink {
      id
      description
    }
  }
`;
const NEW_VOTE = gql`
  subscription {
    newVote {
      id
      link {
        id
        description
      }
    }
  }
`;
export function App({ session, onSession }) {
  const [filter, setFilter] = useState('');
  const [skip, setSkip] = useState(0);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const { data, loading, error, refetch } = useQuery(FEED, {
    variables: { filter, skip },
    fetchPolicy: 'cache-and-network',
  });
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);
  const [post] = useMutation(POST);
  const [vote] = useMutation(VOTE);
  useSubscription(NEW_LINK, {
    skip: !session,
    onData({ data: result }) {
      setNotice('New link: ' + result.data.newLink.description);
      refetch();
    },
    onError(error) {
      setMessage(error.message);
    },
  });
  useSubscription(NEW_VOTE, {
    skip: !session,
    onData({ data: result }) {
      setNotice('New vote: ' + result.data.newVote.link.description);
      refetch();
    },
    onError(error) {
      setMessage(error.message);
    },
  });
  async function run(action) {
    try {
      await action();
    } catch (error) {
      setMessage(error.message);
    }
  }
  return (
    <main>
      <h1>Local GraphQL feed</h1>
      <p>Fictional account: reader@example.test / Learning-only-123!</p>
      {session ? (
        <p>
          Signed in as {session.user.name}{' '}
          <button onClick={() => onSession(null)}>Log out</button>
        </p>
      ) : (
        <form
          aria-label="Account"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const mode = event.nativeEvent.submitter?.value;
            run(async () => {
              const result = await (mode === 'signup' ? signup : login)({
                variables: Object.fromEntries(form),
              });
              onSession(result.data[mode === 'signup' ? 'signup' : 'login']);
            });
          }}
        >
          <label>
            Name <input name="name" defaultValue="Demo Reader" />
          </label>
          <label>
            Email{' '}
            <input
              name="email"
              type="email"
              defaultValue="reader@example.test"
              required
            />
          </label>
          <label>
            Password{' '}
            <input
              name="password"
              type="password"
              defaultValue="Learning-only-123!"
              required
            />
          </label>
          <button value="login">Log in</button>
          <button value="signup">Sign up</button>
        </form>
      )}
      <label>
        Search{' '}
        <input
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setSkip(0);
          }}
        />
      </label>
      {session && (
        <form
          aria-label="Publish link"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const variables = Object.fromEntries(new FormData(form));
            run(async () => {
              await post({ variables });
              form.reset();
              setMessage('Published');
              await refetch();
            });
          }}
        >
          <label>
            URL <input name="url" type="url" required />
          </label>
          <label>
            Description <input name="description" required maxLength={200} />
          </label>
          <button>Publish</button>
        </form>
      )}
      {loading && <p>Loading…</p>}
      {error && (
        <p role="alert">
          {error.message} <button onClick={() => refetch()}>Retry</button>
        </p>
      )}
      <ol>
        {data?.feed.links.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.description}</a> by {link.postedBy.name} ·{' '}
            <span>{link.votes.length} votes</span>{' '}
            <button
              disabled={!session}
              onClick={() =>
                run(async () => {
                  await vote({ variables: { linkId: link.id } });
                  setMessage('Voted');
                  await refetch();
                })
              }
            >
              Vote
            </button>
          </li>
        ))}
      </ol>
      <p>{data?.feed.count ?? 0} links</p>
      <button
        disabled={skip === 0}
        onClick={() => setSkip(Math.max(0, skip - 3))}
      >
        Previous
      </button>
      <button
        disabled={!data || skip + 3 >= data.feed.count}
        onClick={() => setSkip(skip + 3)}
      >
        Next
      </button>
      <p role="status">{message}</p>
      <p aria-label="Live updates">{notice}</p>
    </main>
  );
}
