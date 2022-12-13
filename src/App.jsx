import Select from 'react-select';
import { useEffect, useState } from 'react';

function App() {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState('');
  const [show, setShow] = useState(false);

  const getBerries = async () => {
    const berries = await fetch(`https://pokeapi.co/api/v2/berry/`);
    const value = await berries.json();
    const result = value.results.map((data) => {
      return {
        label: data.name,
        value: data.name,
      };
    });
    setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  useEffect(() => {
   getBerries() 
  },[]);

  const handleSubmit = () => setShow((state) => !state);

  const handleChange = (value) => setUserSelect(value);

  return (
    <main className="mt-20">
      <h2 className="text-center text-gray-500 text-lg">
        {show ? userSelect : 'Select Data'}
      </h2>
      <Select
        className="mx-96 relative"
        options={datas}
        onChange={(e) => handleChange(e.value)}
      />
      <button
        className={`focus:outline-none focus:outline-blue-500 focus:ring-0  border text-gray-500 px-[5px] py-[5px] absolute right-[275px] top-[109px] rounded ${
          !userSelect ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={() => handleSubmit()}
        disabled={!userSelect}
      >
        {show ? 'Hide Button' : 'Show Values'}
      </button>
    </main>
  );
}

export default App;
