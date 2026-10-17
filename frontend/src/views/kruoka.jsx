import '../css/kruoka.css'

const KRuokaView = () => {
  return (
    <div className='kruoka-root'>
      <div className='kruoka-embed'>
        <iframe
        src='https://ksm-lehdet.k-ruoka.fi/Pirkanmaa?kauppa=k-supermarket-herkkuduo'
        title='kruoka'
        style={{
            width: '100%',
            height: '700px',
            border: 'none',
          }}
        />
      </div>
    </div>
  );

}

export default KRuokaView;