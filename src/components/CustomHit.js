import React from 'react';

const CustomHit = ({ hit }) => {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <a href={hit.url} style={{ textDecoration: 'none', color: '#0045BE' }}>
        <h3 style={{ margin: '0 0 10px' }}>{hit.title}</h3>
      </a>
      <p style={{ margin: '0' }}>{hit.excerpt}</p>
    </div>
  );
};

export default CustomHit;
