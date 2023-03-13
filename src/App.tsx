import {
  Input,
  Layout,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

import './App.css';
import { SearchResults } from './components/SearchResults';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Layout className="layout">
      <Layout.Header style={{
        position: 'sticky', top: 0, zIndex: 1, width: '100%',
      }}
      >
        <Input
          size="large"
          placeholder="Type to search..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: '24px' }}>
        <SearchResults searchQuery={search} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
