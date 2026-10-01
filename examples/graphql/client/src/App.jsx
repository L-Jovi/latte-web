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
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. say() picks the words for the one shown;
// links, names and the server's own messages are data and stay as they are.
const say = (en, zh) =>
  document.documentElement.dataset.language === 'zh' ? zh : en;
// The app keeps its own status lines and notices in English, as it writes
// them. These are the words the Chinese page shows for them.
const chinese = new Map([
  ['Published', '已发布'],
  ['Voted', '已投票'],
]);
const toChinese = (english) =>
  chinese.get(english) ??
  english.replace(/^New link: /, '新链接：').replace(/^New vote: /, '新投票：');
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
      <h1>{say('Local GraphQL feed', '本地 GraphQL 信息流')}</h1>
      <p>
        {say(
          'Fictional account: reader@example.test / Learning-only-123!',
          '虚构账号：reader@example.test / Learning-only-123!',
        )}
      </p>
      {session ? (
        <p>
          {say(
            `Signed in as ${session.user.name}`,
            `已登录：${session.user.name}`,
          )}{' '}
          <button onClick={() => onSession(null)}>
            {say('Log out', '退出登录')}
          </button>
        </p>
      ) : (
        <form
          aria-label={say('Account', '账号')}
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
            {say('Name', '名字')}{' '}
            <input name="name" defaultValue="Demo Reader" />
          </label>
          <label>
            {say('Email', '邮箱')}{' '}
            <input
              name="email"
              type="email"
              defaultValue="reader@example.test"
              required
            />
          </label>
          <label>
            {say('Password', '密码')}{' '}
            <input
              name="password"
              type="password"
              defaultValue="Learning-only-123!"
              required
            />
          </label>
          <button value="login">{say('Log in', '登录')}</button>
          <button value="signup">{say('Sign up', '注册')}</button>
        </form>
      )}
      <label>
        {say('Search', '搜索')}{' '}
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
          aria-label={say('Publish link', '发布链接')}
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
            {say('URL', '网址')} <input name="url" type="url" required />
          </label>
          <label>
            {say('Description', '描述')}{' '}
            <input name="description" required maxLength={200} />
          </label>
          <button>{say('Publish', '发布')}</button>
        </form>
      )}
      {loading && <p>{say('Loading…', '加载中…')}</p>}
      {error && (
        <p role="alert">
          <samp>{error.message}</samp>{' '}
          <button onClick={() => refetch()}>{say('Retry', '重试')}</button>
        </p>
      )}
      <ol>
        {data?.feed.links.map((link) => (
          <li key={link.id}>
            <a href={link.url}>{link.description}</a>{' '}
            {say(`by ${link.postedBy.name}`, `由 ${link.postedBy.name} 发布`)} ·{' '}
            <span>
              {say(`${link.votes.length} votes`, `${link.votes.length} 票`)}
            </span>{' '}
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
              {say('Vote', '投票')}
            </button>
          </li>
        ))}
      </ol>
      <p>
        {say(
          `${data?.feed.count ?? 0} links`,
          `共 ${data?.feed.count ?? 0} 个链接`,
        )}
      </p>
      <button
        disabled={skip === 0}
        onClick={() => setSkip(Math.max(0, skip - 3))}
      >
        {say('Previous', '上一页')}
      </button>
      <button
        disabled={!data || skip + 3 >= data.feed.count}
        onClick={() => setSkip(skip + 3)}
      >
        {say('Next', '下一页')}
      </button>
      {/* Apart from its own two words, a status is the server's message,
          quoted as it was sent. */}
      <p role="status">
        {chinese.has(message)
          ? say(message, chinese.get(message))
          : message && <samp>{message}</samp>}
      </p>
      <p aria-label={say('Live updates', '实时更新')}>
        {say(notice, toChinese(notice))}
      </p>
    </main>
  );
}
