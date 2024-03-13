import { Pane, Tab, Tablist } from 'evergreen-ui';
import { useState } from 'react';
import Home from '../Home';
import History from '../History';

function Header() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [tabs] = useState(['Home', 'History']);
  return (
    <Pane display="flex" justifyContent="center" flexDirection="column">
      <Tablist
        marginBottom={16}
        paddingTop={10}
        paddingRight={10}
        background="white"
        display="flex"
        justifyContent="end"
      >
        {tabs.map((tab, index) => (
          <Tab
            aria-controls={`panel-${tab}`}
            isSelected={index === selectedIndex}
            className={index === selectedIndex ? 'active tab' : 'tab'}
            key={tab}
            onSelect={() => setSelectedIndex(index)}
            fontWeight="500"
            paddingBottom={20}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <div className="container">
        <Pane padding={16} flex="1" marginTop="6rem">
          {tabs.map((tab, index) => (
            <Pane
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
              key={tab}
              role="tabpanel"
            >
              {tab === 'Home' ? <Home selectedIndex={selectedIndex} /> : <History selectedIndex={selectedIndex} />}
            </Pane>
          ))}
        </Pane>
      </div>
    </Pane>
  );
}

export default Header;
