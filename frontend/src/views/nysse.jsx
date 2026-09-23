import '../css/nysse.css'

const NysseView = () => {
  return (
    <div className="nysse-root">
      <div className="nysse-embed">
        <iframe
          src="https://tremonitori.digitransit.fi/view?cont=aCeKLtgcSJOOGwCdqsR6jw%3D%3D"
          title="Nysse"

        />
      </div>
    </div>
  );

}

export default NysseView;